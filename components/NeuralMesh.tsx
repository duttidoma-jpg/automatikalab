'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Цвета бренда ─────────────────────────────────────────────────────────────
const SAGE     = new THREE.Color('#8fa36c')   // зелёный акцент
const CARAMEL  = new THREE.Color('#C49050')   // карамельный акцент
const FOREST   = new THREE.Color('#2e3a1f')   // тёмно-зелёный фон
const SAGE_PAL = new THREE.Color('#a7bf85')   // светлее sage

// ─── Параметры сцены ──────────────────────────────────────────────────────────
const PARTICLE_COUNT = 220
const CONNECTION_DIST = 0.9   // дистанция для рисования линий
const MOUSE_RADIUS   = 1.4    // радиус влияния курсора
const MOUSE_FORCE    = 0.018  // сила отталкивания
const SPEED          = 0.0014 // скорость частиц

// ─── Вспомогательная: lerp ────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// ─── Частицы + линии ─────────────────────────────────────────────────────────
function Particles({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const { size } = useThree()

  // Начальные позиции и скорости частиц
  const { positions, velocities, colors } = useMemo(() => {
    const positions  = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = [] as { vx: number; vy: number }[]
    const colors     = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2

      const angle = Math.random() * Math.PI * 2
      velocities.push({
        vx: Math.cos(angle) * SPEED * (0.5 + Math.random()),
        vy: Math.sin(angle) * SPEED * (0.5 + Math.random()),
      })

      // Цвет — mix sage / caramel / sage-light по random
      const t = Math.random()
      const col = t < 0.55
        ? SAGE.clone().lerp(SAGE_PAL, Math.random())
        : CARAMEL.clone().lerp(SAGE, Math.random() * 0.4)

      colors[i * 3]     = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }
    return { positions, velocities, colors }
  }, [])

  const pointsRef  = useRef<THREE.Points>(null)
  const posArr     = useRef(positions.slice())  // рабочий буфер
  const linesRef   = useRef<THREE.LineSegments>(null)
  const lineGeoRef = useRef<THREE.BufferGeometry>(null)

  // Геометрия для линий — максимально возможный буфер
  const maxLines   = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2
  const linePos    = useMemo(() => new Float32Array(maxLines * 6), [maxLines])
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines])

  useFrame(() => {
    const pts = posArr.current
    const aspect = size.width / size.height
    const mx =  mouseRef.current.x * 4 * aspect
    const my =  mouseRef.current.y * 2.5

    // Двигаем частицы + отталкиваем от курсора
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      pts[ix]     += velocities[i].vx
      pts[ix + 1] += velocities[i].vy

      // Мягкие границы — возвращаем в поле
      const bx = 4.5, by = 3
      if (pts[ix]     >  bx) velocities[i].vx -= 0.0008
      if (pts[ix]     < -bx) velocities[i].vx += 0.0008
      if (pts[ix + 1] >  by) velocities[i].vy -= 0.0008
      if (pts[ix + 1] < -by) velocities[i].vy += 0.0008

      // Отталкивание от курсора
      const dx = pts[ix]     - mx
      const dy = pts[ix + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
        velocities[i].vx += (dx / dist) * force * MOUSE_FORCE
        velocities[i].vy += (dy / dist) * force * MOUSE_FORCE
      }

      // Ограничиваем скорость
      const speed = Math.sqrt(velocities[i].vx ** 2 + velocities[i].vy ** 2)
      const maxSpd = SPEED * 4
      if (speed > maxSpd) {
        velocities[i].vx = (velocities[i].vx / speed) * maxSpd
        velocities[i].vy = (velocities[i].vy / speed) * maxSpd
      }
    }

    // Обновляем позиции точек
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        attr.setXYZ(i, pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2])
      }
      attr.needsUpdate = true
    }

    // Строим линии между близкими частицами
    if (!lineGeoRef.current) return
    let lineIdx = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pts[i * 3] - pts[j * 3]
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1]
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2]
        const d  = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (d < CONNECTION_DIST) {
          const alpha = 1 - d / CONNECTION_DIST  // ближе = ярче
          const base  = lineIdx * 6

          // Начало линии
          linePos[base]     = pts[i * 3]
          linePos[base + 1] = pts[i * 3 + 1]
          linePos[base + 2] = pts[i * 3 + 2]
          // Конец линии
          linePos[base + 3] = pts[j * 3]
          linePos[base + 4] = pts[j * 3 + 1]
          linePos[base + 5] = pts[j * 3 + 2]

          // Цвет линии = смешение цветов двух точек, с затуханием по дистанции
          const ci = i * 3, cj = j * 3
          lineColors[base]     = lerp(colors[ci],     colors[cj],     0.5) * alpha
          lineColors[base + 1] = lerp(colors[ci + 1], colors[cj + 1], 0.5) * alpha
          lineColors[base + 2] = lerp(colors[ci + 2], colors[cj + 2], 0.5) * alpha
          lineColors[base + 3] = lineColors[base]
          lineColors[base + 4] = lineColors[base + 1]
          lineColors[base + 5] = lineColors[base + 2]

          lineIdx++
        }
      }
    }

    // Обновляем геометрию линий
    const geo = lineGeoRef.current
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const colAttr = geo.attributes.color as THREE.BufferAttribute

    for (let k = 0; k < lineIdx * 6; k++) {
      posAttr.array[k] = linePos[k]
      colAttr.array[k] = lineColors[k]
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
    geo.setDrawRange(0, lineIdx * 2)
  })

  return (
    <>
      {/* Точки */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* Линии */}
      <lineSegments ref={linesRef}>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(maxLines * 6), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[new Float32Array(maxLines * 6), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function NeuralMesh() {
  const mouseRef = useRef(new THREE.Vector2(0, 0))

  // Конвертируем mouse coords в NDC (-1..1)
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
    >
      {/* Тёмно-зелёный фон как у --forest */}
      <color attach="background" args={[FOREST]} />
      <Particles mouseRef={mouseRef} />
    </Canvas>
  )
}
