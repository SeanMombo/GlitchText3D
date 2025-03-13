import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BackSide, FrontSide } from 'three'

interface HollowBoxProps {
  position?: [number, number, number]
  size?: [number, number, number]
  color?: string
  radius?: number
}

export default function HollowBox({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = '#ffffff',
  radius = 0.05,
}: HollowBoxProps) {
  return (
    <group position={position}>
      {/* Outer box with BackSide material to create hollow effect */}
      <RoundedBox args={size} radius={radius} smoothness={4}>
        <meshStandardMaterial
          color={color}
          side={BackSide}
          metalness={0.2}
          roughness={0.8}
        />
      </RoundedBox>
      
      {/* Inner box slightly smaller to create depth effect */}
      <RoundedBox 
        args={[
          size[0] - 0.02, 
          size[1] - 0.02, 
          size[2] - 0.02
        ]} 
        radius={radius - 0.01}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          side={FrontSide}
          metalness={0.2}
          roughness={0.8}
        />
      </RoundedBox>
    </group>
  )
}