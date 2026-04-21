'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function toCube(vx: number, vy: number, vz: number, size = 0.88) {
  const m = Math.max(Math.abs(vx), Math.abs(vy), Math.abs(vz))
  if (m === 0) return [0, 0, 0]
  const s = size / m
  return [vx * s, vy * s, vz * s]
}

function toTorus(vx: number, vy: number, vz: number, R = 0.7, r = 0.32) {
  const xy    = Math.sqrt(vx * vx + vy * vy)
  const angle = Math.atan2(vy, vx)
  const phi   = Math.atan2(vz, xy - R)
  return [
    (R + r * Math.cos(phi)) * Math.cos(angle),
    (R + r * Math.cos(phi)) * Math.sin(angle),
    r * Math.sin(phi),
  ]
}

function toDiamond(vx: number, vy: number, vz: number, size = 0.9) {
  const m = Math.abs(vx) + Math.abs(vy) + Math.abs(vz)
  if (m === 0) return [0, 0, 0]
  const s = size / m
  return [vx * s, vy * s, vz * s]
}

// ─── 3D Mesh ──────────────────────────────────────────────────────────────────

function MorphMesh({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const { geo, targets } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3)
    const pos = geo.attributes.position
    const n   = pos.count

    const sphere  = new Float32Array(pos.array as Float32Array)
    const cube    = new Float32Array(n * 3)
    const torus   = new Float32Array(n * 3)
    const diamond = new Float32Array(n * 3)

    for (let i = 0; i < n; i++) {
      const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i)

      const [cx, cy, cz] = toCube(vx, vy, vz)
      cube[i*3] = cx; cube[i*3+1] = cy; cube[i*3+2] = cz

      const [tx, ty, tz] = toTorus(vx, vy, vz)
      torus[i*3] = tx; torus[i*3+1] = ty; torus[i*3+2] = tz

      const [dx, dy, dz] = toDiamond(vx, vy, vz)
      diamond[i*3] = dx; diamond[i*3+1] = dy; diamond[i*3+2] = dz
    }

    return { geo, targets: [sphere, cube, torus, diamond] }
  }, [])

  const state   = useRef({ from: 0, to: 1, progress: 0, holding: false, holdTime: 0 })
  const workBuf = useRef(new Float32Array(geo.attributes.position.count * 3))

  const TRANSITION = 1.8
  const HOLD       = 1.4

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const s = state.current

    if (s.holding) {
      s.holdTime += delta
      if (s.holdTime >= HOLD) {
        s.holding  = false
        s.holdTime = 0
        s.from     = s.to
        s.to       = (s.to + 1) % targets.length
        s.progress = 0
      }
    } else {
      s.progress += delta / TRANSITION
      if (s.progress >= 1) { s.progress = 1; s.holding = true; s.holdTime = 0 }
    }

    const t    = easeInOut(Math.min(s.progress, 1))
    const from = targets[s.from]
    const to   = targets[s.to]
    const buf  = workBuf.current

    for (let i = 0; i < buf.length; i++) {
      buf[i] = from[i] + (to[i] - from[i]) * t
    }

    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    ;(posAttr.array as Float32Array).set(buf)
    posAttr.needsUpdate = true

    // Авто-вращение + мышь
    meshRef.current.rotation.y += delta * 0.22 + mouseRef.current.x * 0.006
    meshRef.current.rotation.x  = Math.sin(Date.now() * 0.00025) * 0.18
  })

  return (
    <mesh ref={meshRef} geometry={geo}>
      {/* Тонкая заливка — объём */}
      <meshBasicMaterial
        color="#2e3a1f"
        transparent
        opacity={0.04}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function WireframeMesh({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const wireRef = useRef<THREE.Mesh>(null)

  const { geo, targets } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3)
    const pos = geo.attributes.position
    const n   = pos.count

    const sphere  = new Float32Array(pos.array as Float32Array)
    const cube    = new Float32Array(n * 3)
    const torus   = new Float32Array(n * 3)
    const diamond = new Float32Array(n * 3)

    for (let i = 0; i < n; i++) {
      const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i)
      const [cx,cy,cz] = toCube(vx,vy,vz); cube[i*3]=cx; cube[i*3+1]=cy; cube[i*3+2]=cz
      const [tx,ty,tz] = toTorus(vx,vy,vz); torus[i*3]=tx; torus[i*3+1]=ty; torus[i*3+2]=tz
      const [dx,dy,dz] = toDiamond(vx,vy,vz); diamond[i*3]=dx; diamond[i*3+1]=dy; diamond[i*3+2]=dz
    }

    return { geo, targets: [sphere, cube, torus, diamond] }
  }, [])

  const state   = useRef({ from: 0, to: 1, progress: 0, holding: false, holdTime: 0 })
  const workBuf = useRef(new Float32Array(geo.attributes.position.count * 3))

  useFrame((_, delta) => {
    if (!wireRef.current) return
    const s = state.current

    if (s.holding) {
      s.holdTime += delta
      if (s.holdTime >= 1.4) {
        s.holding = false; s.holdTime = 0
        s.from = s.to; s.to = (s.to + 1) % targets.length; s.progress = 0
      }
    } else {
      s.progress += delta / 1.8
      if (s.progress >= 1) { s.progress = 1; s.holding = true; s.holdTime = 0 }
    }

    const t    = easeInOut(Math.min(s.progress, 1))
    const from = targets[s.from], to = targets[s.to], buf = workBuf.current
    for (let i = 0; i < buf.length; i++) buf[i] = from[i] + (to[i] - from[i]) * t

    const posAttr = wireRef.current.geometry.attributes.position as THREE.BufferAttribute
    ;(posAttr.array as Float32Array).set(buf)
    posAttr.needsUpdate = true

    wireRef.current.rotation.y += delta * 0.22 + mouseRef.current.x * 0.006
    wireRef.current.rotation.x  = Math.sin(Date.now() * 0.00025) * 0.18
  })

  return (
    <mesh ref={wireRef} geometry={geo}>
      <meshBasicMaterial
        color="#8fa36c"
        wireframe
        transparent
        opacity={0.65}
      />
    </mesh>
  )
}

// ─── Главный экспорт ─────────────────────────────────────────────────────────

export default function MorphingGeometry() {
  const mouseRef = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 52 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <MorphMesh mouseRef={mouseRef} />
      <WireframeMesh mouseRef={mouseRef} />
    </Canvas>
  )
}
