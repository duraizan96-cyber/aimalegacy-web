import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 2.2
const MOUSE_INFLUENCE = 0.3

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      velocities[i * 3] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004
    }
    return { positions, velocities }
  }, [])

  const linePositions = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
  }, [])

  const lineColors = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
  }, [])

  useFrame(({ pointer }) => {
    if (!meshRef.current || !linesRef.current) return

    mouse.current.lerp(
      new THREE.Vector2(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5),
      0.05
    )

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      posArray[ix] += velocities[ix]
      posArray[iy] += velocities[iy]
      posArray[iz] += velocities[iz]

      // Mouse influence
      const dx = mouse.current.x - posArray[ix]
      const dy = mouse.current.y - posArray[iy]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3) {
        posArray[ix] += dx * MOUSE_INFLUENCE * 0.01
        posArray[iy] += dy * MOUSE_INFLUENCE * 0.01
      }

      // Boundary bounce
      if (Math.abs(posArray[ix]) > 6) velocities[ix] *= -1
      if (Math.abs(posArray[iy]) > 4) velocities[iy] *= -1
      if (Math.abs(posArray[iz]) > 3) velocities[iz] *= -1
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true

    // Update connections
    const lineGeo = linesRef.current.geometry
    const linePosAttr = lineGeo.attributes.position.array as Float32Array
    const lineColAttr = lineGeo.attributes.color.array as Float32Array
    let lineIdx = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posArray[i * 3] - posArray[j * 3]
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1]
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE

          linePosAttr[lineIdx * 6] = posArray[i * 3]
          linePosAttr[lineIdx * 6 + 1] = posArray[i * 3 + 1]
          linePosAttr[lineIdx * 6 + 2] = posArray[i * 3 + 2]
          linePosAttr[lineIdx * 6 + 3] = posArray[j * 3]
          linePosAttr[lineIdx * 6 + 4] = posArray[j * 3 + 1]
          linePosAttr[lineIdx * 6 + 5] = posArray[j * 3 + 2]

          // Cyan color with fade
          const r = 0.02 * alpha
          const g = 0.71 * alpha
          const b = 0.83 * alpha
          lineColAttr[lineIdx * 6] = r
          lineColAttr[lineIdx * 6 + 1] = g
          lineColAttr[lineIdx * 6 + 2] = b
          lineColAttr[lineIdx * 6 + 3] = r
          lineColAttr[lineIdx * 6 + 4] = g
          lineColAttr[lineIdx * 6 + 5] = b

          lineIdx++
        }
      }
    }

    // Clear remaining lines
    for (let i = lineIdx; i < linePosAttr.length / 6; i++) {
      linePosAttr[i * 6] = 0
      linePosAttr[i * 6 + 1] = 0
      linePosAttr[i * 6 + 2] = 0
      linePosAttr[i * 6 + 3] = 0
      linePosAttr[i * 6 + 4] = 0
      linePosAttr[i * 6 + 5] = 0
    }

    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)
  })

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#D4AF37"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} depthWrite={false} />
      </lineSegments>
    </>
  )
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #04040f 70%)',
        }}
      />
    </div>
  )
}
