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
import RoundBox from './RoundBox';
import { Plane } from '@react-three/drei';
import { Lightformer, Environment, RandomizedLight, AccumulativeShadows } from '@react-three/drei'
import BoxGrid from '../components/BoxGrid'
import RoundedCube2 from './RoundedBox2';

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
      

        <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} color={'red'}/>
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          intensity={0.7}
        />
        {/* <BoxGrid 
          rows={3} 
          cols={2} 
          spacing={0.5} 
          boxSize={[1, 1, 1]} 
        /> */}
        <RoundedCube2/>

        <OrbitControls/>
      </Canvas>
      </div>
    );
  };
  
  export default R3fCanvas;

//   <Canvas shadows >
//   {/* Lights */}
//   <ambientLight intensity={1} /> {/* Ambient light */}
//   <spotLight position={[-10, 10, 10]} angle={1.15} penumbra={1} /> Spot light
//     <pointLight intensity={10} position={[.1,.1,3]} color='red'/>
//   {/* 3D Object */}
//   <RoundBox/>

//     {/* <TextComponent scrollYRef={scrollY}/> */}
//     {/* <Plane scale={[20,20,20]} position={[0,0,-1]} receiveShadow castShadow>
//         <meshBasicMaterial color={'lightgrey'}></meshBasicMaterial>
//     </Plane> */}
//     <AccumulativeShadows 
//         temporal 
//         frames={100} 
//         color="lightblue" 
//         colorBlend={2} 
//         opacity={0.7} 
//         scale={60} 
//         position={[0, 0, -1]} 
//         rotation={[0, Math.PI/2, Math.PI/2]}
//         >
//         <RandomizedLight amount={8} radius={15} ambient={0.5} intensity={1} position={[-5, 10, -5]} size={20} />
//     </AccumulativeShadows>
//   <OrbitControls/>
// </Canvas>