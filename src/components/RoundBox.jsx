import React from "react";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei"; // To create a cube with rounded corners
import { useControls } from 'leva'


// Component for the Diffuse Glass Cube with a Red Sphere inside
const RoundBox = () => {
  const config = useControls({
    backside: false,
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 256, min: 64, max: 2048, step: 64 },
    transmission: { value: 0.95, min: 0, max: 1 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 200, min: 0, max: 200, step: 0.01 },
    backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 1, min: 0, max: 1 },
    anisotropy: { value: 1, min: 0, max: 10, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#ffffff',
  })

  return (
    <>
      {/* Rounded Box (Cube) */}
      <RoundedBox args={[2, 2, 1]} radius={0.2} smoothness={4} castShadow receiveShadow>
        {/* Diffuse Glass Material */}
        {/* <MeshTransmissionMaterial backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}/> */}

          <MeshTransmissionMaterial 
          {...config}/>
      </RoundedBox>
      
      {/* Red Sphere inside the cube */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>

      
    </>
  );
};

export default RoundBox;