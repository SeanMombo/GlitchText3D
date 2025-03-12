"use client"
import { Canvas } from '@react-three/fiber'; // Import Canvas from R3F
import { Center, OrbitControls } from '@react-three/drei'; // Optional: Adds camera controls
import { Text3D } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import { Vector2, Vector3 } from 'three';
import { useLoader } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { FrontSide } from 'three';
const TextComponent = ({ scrollYRef }) => {
    const textRef = useRef();

    // Create the wave shader material
    const waveShader = new ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_scroll: { value: 0 }, // Pass scroll value here
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        uniform float u_scroll; // Scroll-based distortion amount
        uniform vec2 u_resolution; // Screen resolution, useful if needed for further effects

        varying vec2 vUv; // UV coordinates for the fragment shader

        void main() {
        vUv = uv;
        
        // Apply wave distortion based on scroll and position
        float wave = sin(position.x * 10.0 + u_scroll * 2.0) * 0.25; // Distort based on x-position and scroll
        
        // Apply the scroll offset to the overall position
        vec3 newPosition = position + vec3(wave/4.0, wave, 0.0); // Apply wave distortion to y-axis

        // Add scroll-based vertical shift
        newPosition.y += -u_scroll * (u_scroll * (1.0 - 2.0 * u_scroll)); // Quadratic ease-in-out
        
        // Output the final position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
        }
      `,
      // Enable transparent background for the text
      transparent: true,
    });
  
    useFrame(() => {
      const normalizedScroll = scrollYRef.current / window.innerHeight; // Normalize scroll value (0 to 1)
      
      // Update the shader's u_scroll value based on scroll position
      waveShader.uniforms.u_scroll.value = normalizedScroll * 0.5 - 1.4;
      
      // Optionally, update time to animate the wave effect
      waveShader.uniforms.u_time.value += 0.05; // Animate wave based on time
    });
  
    return (
      <Text 
      ref={textRef} 
      font={'/pinkyshow.otf'} 
      fontSize={1} 
      position={[0, 0, 0]} 
      material={waveShader} 
      maxWidth={7} 
      textAlign='center'
      lineHeight={2}
      >
        How are you feeling?
      </Text>
    );
  };


const R3fCanvas = () => {
    const scrollY = useRef(0);
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
            <TextComponent scrollYRef={scrollY}/>

          {/* OrbitControls for interactive camera */}
        </Canvas>
      </div>
    );
  };
  
  export default R3fCanvas;