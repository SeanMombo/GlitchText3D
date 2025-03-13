"use client"
import { Suspense, useRef, useState, useLayoutEffect } from 'react'
import { View, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import HollowBox from './HollowBox'
import { Bowlby_One } from 'next/font/google'


interface BoxViewProps {
    index: number
  }
  
  function BoxView({ index }: BoxViewProps) {
    const viewRef = useRef<HTMLDivElement>(null)
    const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  
    useLayoutEffect(() => {
      if (!viewRef.current) return
  
      const updateSize = () => {
        const rect = viewRef.current?.getBoundingClientRect()
        if (rect) {
          setViewportSize({
            width: rect.width,
            height: rect.height
          })
        }
      }
  
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }, [])
  
    // Calculate box size based on viewport size
    // We'll make the box take up about 80% of the container's smallest dimension
    const boxSize = Math.min(viewportSize.width, viewportSize.height) * 0.8
  
    return (
      <View
        ref={viewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        track={`box-container-${index}`}
      >
        <scene>
          <OrthographicCamera 
            makeDefault 
            position={[0, 0, 5]}
            zoom={100} // Adjusted zoom for better scaling
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <HollowBox 
            size={[boxSize / 100, boxSize / 100, boxSize / 100]} // Scale down the size to match Three.js units
          />
        </scene>
      </View>
    )
  }

  
interface ResponsiveBoxGridProps {
  rows?: number
  cols?: number
}

export default function ResponsiveBoxGrid({
  rows = 3,
  cols = 2
}: ResponsiveBoxGridProps) {
  return (
    <>
      {/* Container for the grid layout */}
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '2rem',
          padding: '2rem',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              aspectRatio: '1',
              background: '#f0f0f0',
              borderRadius: '12px'
            }}
            id={`box-container-${index}`}
          >
            {/* View component that will contain our 3D element */}
            <BoxView index={index}/>
          </div>
        ))}
      </div>

      {/* Main canvas that will handle all the views */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}

      >
        <View.Port/>
      </Canvas>
    </>
  )
}