"use client"
import { Canvas } from '@react-three/fiber'; // Import Canvas from R3F
import { Center, OrbitControls } from '@react-three/drei'; // Optional: Adds camera controls
import { Text3D } from '@react-three/drei';
import customFont from './Nau_Sea_Regular.json'
import { Text } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

const R3fCanvas = () => {
    const scrollY = useRef();
    useEffect(() => {

        const onScroll = () => {
            scrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[])

    return (
      <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, pointerEvents: 'none' }}>
        {/* Canvas element where the 3D scene will be rendered */}
        <Canvas >
          {/* Lights */}
          <ambientLight intensity={0.5} /> {/* Ambient light */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Spot light */}
  
          {/* 3D Object */}
          <Text color="white">How are you feeling?</Text>  

          {/* OrbitControls for interactive camera */}
        </Canvas>
      </div>
    );
  };
  
  export default R3fCanvas;