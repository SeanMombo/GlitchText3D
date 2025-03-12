"use client"
import { Canvas } from '@react-three/fiber'; // Import Canvas from R3F
import { OrbitControls } from '@react-three/drei'; // Optional: Adds camera controls


const R3fCanvas = () => {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        {/* Canvas element where the 3D scene will be rendered */}
        <Canvas>
          {/* Lights */}
          <ambientLight intensity={0.5} /> {/* Ambient light */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Spot light */}
  
          {/* 3D Object */}
          <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
  
          {/* OrbitControls for interactive camera */}
          <OrbitControls />
        </Canvas>
      </div>
    );
  };
  
  export default R3fCanvas;