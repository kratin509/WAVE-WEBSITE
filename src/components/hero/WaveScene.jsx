import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import './waveMaterial'

function WaveMesh({ motion, segments, intensity }) {
  const materialRef = useRef(null)
  const meshRef = useRef(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    const mat = materialRef.current
    if (!mat) return

    mat.uTime += delta
    mat.uMouse.x += (motion.mouseX - mat.uMouse.x) * 0.06
    mat.uMouse.y += (motion.mouseY - mat.uMouse.y) * 0.06

    if (meshRef.current) {
      const p = motion.progress
      meshRef.current.position.z = 0.4 + p * 2.4
      meshRef.current.rotation.x = -0.18 + p * 0.16
      meshRef.current.position.y = -0.15 - p * 0.35
    }
  })

  const scale = 1.85

  return (
    <mesh ref={meshRef} rotation={[-0.18, 0, 0]}>
      <planeGeometry
        args={[viewport.width * scale, viewport.height * scale, segments, Math.round(segments * 0.55)]}
      />
      <waveMaterial ref={materialRef} uIntensity={intensity} />
    </mesh>
  )
}

export function WaveScene({ motion, quality = 'high' }) {
  const dpr = quality === 'low' ? [1, 1.3] : [1, 2]
  const segments = quality === 'low' ? 48 : quality === 'medium' ? 90 : 150
  const intensity = quality === 'low' ? 0.7 : 1

  const gl = useMemo(
    () => ({ antialias: true, powerPreference: 'high-performance' }),
    [],
  )

  return (
    <Canvas
      dpr={dpr}
      gl={gl}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      className="!absolute !inset-0"
    >
      <color attach="background" args={['#170d08']} />
      <WaveMesh motion={motion} segments={segments} intensity={intensity} />
    </Canvas>
  )
}
