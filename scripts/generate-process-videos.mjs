/**
 * ProcessSection — генерация 4 видео-фонов через Higgsfield.ai
 *
 * Пайплайн (2 этапа):
 *   1. text-to-image  → higgsfield-ai/soul/standard
 *   2. image-to-video → higgsfield-ai/dop/standard
 *
 * Запуск: node scripts/generate-process-videos.mjs
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '../public/videos/process')

const KEY_ID     = '0a8a997b-1a2b-44bb-aa23-659a57ef1f9f'
const API_SECRET = '8a858b6528120032f810acc3fcae168bad6cdfdd2248683efdf9f5cfab2c37ec'
const AUTH       = `Key ${KEY_ID}:${API_SECRET}`
const BASE       = 'https://platform.higgsfield.ai'

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

// ─── Шаги и промты ────────────────────────────────────────────────────────────
const STEPS = [
  {
    id:       'brief',
    filename: 'step-01-brief.mp4',
    imgPrompt: `Abstract organic shapes floating in deep forest green darkness.
Soft sage green light (#8fa36c) gently pulsing from center.
Misty atmospheric depth. Quiet, meditative, premium.
No people, no text, no logos. 16:9, cinematic, high quality.`,
    vidPrompt: `Slow gentle breathing pulse. Soft sage light ebbs and flows.
Misty organic shapes drift slowly. Calm, meditative ambient loop.`,
  },
  {
    id:       'strategy',
    filename: 'step-02-strategy.mp4',
    imgPrompt: `Geometric grid and blueprint lines forming in deep forest green void.
Sage green structural lines connecting nodes.
Warm caramel amber light points at intersections.
Precise, architectural, premium minimal. No people, no text. 16:9, cinematic.`,
    vidPrompt: `Geometric lines slowly draw themselves and connect.
Caramel light points pulse at nodes. Structural assembly in motion.`,
  },
  {
    id:       'dev',
    filename: 'step-03-dev.mp4',
    imgPrompt: `Dynamic sage green particle streams flowing diagonally
across deep forest green background.
Luminous data threads, caramel gold sparks at intersections.
High energy, forward motion, tech visualization. No people, no text. 16:9, cinematic.`,
    vidPrompt: `Particle streams flow forward with momentum.
Caramel sparks flare at intersections. Dynamic, kinetic, forward energy.`,
  },
  {
    id:       'launch',
    filename: 'step-04-launch.mp4',
    imgPrompt: `Caramel amber radial burst of light from deep forest green center.
Golden particles expanding outward in all directions.
Triumphant light explosion, warm glow rays pierce the darkness.
No people, no text, no logos. 16:9, cinematic, premium.`,
    vidPrompt: `Radial burst of caramel light expands outward.
Golden particles stream away from center. Triumphant, expansive energy.`,
  },
]

// ─── API helpers ──────────────────────────────────────────────────────────────
async function post(model, body) {
  const res = await fetch(`${BASE}/${model}`, {
    method:  'POST',
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function poll(request_id, label, maxMs = 8 * 60 * 1000) {
  const deadline = Date.now() + maxMs
  let tick = 0

  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 6000))
    const res = await fetch(`${BASE}/requests/${request_id}/status`, {
      headers: { 'Authorization': AUTH },
    })
    const data = await res.json()
    tick++
    process.stdout.write(`\r  ⏳ ${label}: ${data.status} ${'·'.repeat(tick % 4 + 1)}   `)

    if (data.status === 'completed') {
      const url = data.video?.url ?? data.images?.[0]?.url
      console.log(`\n  ✅ ${label} → ${url}`)
      return { ...data, result_url: url }
    }
    if (['failed', 'nsfw'].includes(data.status)) {
      throw new Error(`${label} ошибка: ${data.status}`)
    }
  }
  throw new Error(`${label} таймаут`)
}

async function download(url, filename) {
  const outPath = path.join(OUTPUT_DIR, filename)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download ${res.status}`)
  const writer = createWriteStream(outPath)
  await pipeline(res.body, writer)
  console.log(`  💾 ${filename}`)
  return outPath
}

// ─── Этап 1: text → image ────────────────────────────────────────────────────
async function generateImage(step) {
  console.log(`\n🖼  [1/2] Изображение: "${step.id}"`)
  const { request_id } = await post('higgsfield-ai/soul/standard', {
    prompt:       step.imgPrompt,
    aspect_ratio: '16:9',
    resolution:   '1080p',
  })
  console.log(`     request_id: ${request_id}`)
  const result = await poll(request_id, `img:${step.id}`)
  return result.result_url
}

// ─── Этап 2: image → video ────────────────────────────────────────────────────
async function animateImage(step, image_url) {
  console.log(`\n🎬  [2/2] Анимация: "${step.id}"`)
  const { request_id } = await post('higgsfield-ai/dop/standard', {
    image_url,
    prompt:   step.vidPrompt,
    duration: 5,
  })
  console.log(`     request_id: ${request_id}`)
  const result = await poll(request_id, `vid:${step.id}`)
  return result.result_url
}

// ─── Главный поток ────────────────────────────────────────────────────────────
async function processStep(step) {
  const imageUrl = await generateImage(step)
  const videoUrl = await animateImage(step, imageUrl)
  await download(videoUrl, step.filename)
  return step.filename
}

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  ProcessSection — Higgsfield.ai генерация')
  console.log('  Пайплайн: text→image → image→video (×4)')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Выходная папка: public/videos/process/\n`)

  // Проверка API
  console.log('🔑 Проверяем соединение...')
  try {
    const r = await fetch(`${BASE}/requests/test-ping/status`, {
      headers: { 'Authorization': AUTH },
    })
    // 404 = ключ работает, путь просто не существует
    if (r.status === 404 || r.status === 200) {
      console.log('  ✓ Авторизация OK\n')
    } else if (r.status === 401 || r.status === 403) {
      throw new Error(`Auth failed: ${r.status}`)
    } else {
      console.log(`  ✓ Сервер ответил: ${r.status}\n`)
    }
  } catch (e) {
    if (e.message.includes('Auth')) { console.error('❌', e.message); process.exit(1) }
    console.log('  ✓ Сервер доступен\n')
  }

  // Обрабатываем шаги последовательно (экономим rate-limit)
  const results = []
  for (const step of STEPS) {
    try {
      const filename = await processStep(step)
      results.push({ step: step.id, file: filename, ok: true })
    } catch (e) {
      console.error(`\n  ❌ ${step.id}: ${e.message}`)
      results.push({ step: step.id, file: step.filename, ok: false, error: e.message })
    }
  }

  console.log('\n═══════════════════════════════════════════════════')
  console.log('  Итог:')
  for (const r of results) {
    console.log(`  ${r.ok ? '✅' : '❌'} ${r.file}${r.error ? ' — ' + r.error : ''}`)
  }
  const ok = results.filter(r => r.ok).length
  console.log(`\n  ${ok}/${STEPS.length} видео готово`)
  console.log('  📁 public/videos/process/')
  console.log('\n  Следующий шаг: запустить обновление ProcessSection')
  console.log('═══════════════════════════════════════════════════\n')
}

main()
