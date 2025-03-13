import { useThree } from '@react-three/fiber'
import HollowBox from './HollowBox'

interface BoxGridProps {
  rows?: number
  cols?: number
  spacing?: number
  boxSize?: [number, number, number]
}

export default function BoxGrid({
  rows = 3,
  cols = 2,
  spacing = 1.2,
  boxSize = [1, 1, 1],
}: BoxGridProps) {
  const { viewport } = useThree()
  
  // Calculate total width and height of grid
  const totalWidth = cols * (boxSize[0] + spacing) - spacing
  const totalHeight = rows * (boxSize[1] + spacing) - spacing
  
  // Calculate starting position to center the grid
  const startX = -totalWidth / 2 + boxSize[0] / 2
  const startY = totalHeight / 2 - boxSize[1] / 2

  return (
    <group>
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        
        const x = startX + col * (boxSize[0] + spacing)
        const y = startY - row * (boxSize[1] + spacing)
        
        return (
          <HollowBox
            key={index}
            position={[x, y, 0]}
            size={boxSize}
            color="#ffffff"
          />
        )
      })}
    </group>
  )
} 