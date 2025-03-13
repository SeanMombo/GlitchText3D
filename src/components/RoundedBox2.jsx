
import React, {useRef, useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Box, OrbitControls, Plane, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { MeshPortalMaterial } from '@react-three/drei';
import { Environment } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { CSG } from 'three-csg-ts'; // Import CSG from three-csg-ts
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
function RoundedCube2() {
  const planeRef = useRef();
  const { scene } = useThree();
  const [pos, setPos] = useState([0, 0, 0]);
  // useFrame(() => {
  //   setPos([pos[0]+0.001, 0, 0]);
  // });
  useEffect(() => {
    
  // Make a box mesh
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
  );
  // make a sphere mesh
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.2, 30, 30));
  box.position.set(pos[0], pos[1], pos[2]);
  // Make sure the .matrix of each mesh is current
  box.updateMatrix();
  sphere.updateMatrix();

  // // perform operations on the meshes
  // const subRes = CSG.subtract(box, sphere);
  // const unionRes = CSG.union(box, sphere);
  // const interRes = CSG.intersect(box, sphere);

  // // space the meshes out so they don't overlap
  // unionRes.position.add(new THREE.Vector3(0, 0, 5));
  // interRes.position.add(new THREE.Vector3(0, 0, -5));
  const plane = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 0.001),
    new THREE.MeshNormalMaterial()
  );
  plane.updateMatrix();



  const clippedPlane = CSG.subtract(plane, box);
  // add the meshes to the scene
  scene.add(clippedPlane);
  return () => {
    scene.remove(clippedPlane);
  };
  }, [pos]);

    return (
      <>
      {/* <Plane position={[0, 0, 0]} scale={[10, 10, 10]} castShadow receiveShadow>
        <meshBasicMaterial color={'lightgrey'} clipPlane={clippingPlane}/>
      </Plane>
        <Plane position={[0, 0, 0]} scale={[2, 2, 2]} castShadow receiveShadow ref={clip}>
            <MeshPortalMaterial worldUnits={false}>
                <ambientLight intensity={0.5} />
                <Environment preset="city" />
                <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} rotation={[0, -Math.PI/2, 0]} scale={0.3}>
                    <meshStandardMaterial aoMapIntensity={1} color="white"  />
                    <spotLight castShadow  color="white" intensity={2} position={[0, 0, 0]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
                </mesh>
                <mesh castShadow receiveShadow >
                    <Sphere scale={0.1} position={[0, 0, -.25]}> <meshLambertMaterial color="red" /></Sphere>
                    
                </mesh>
            </MeshPortalMaterial>
        </Plane> */}


{/* <mesh ref={planeRef} position={[0, 0, 0]}>
      <meshStandardMaterial color="skyblue" />
    </mesh> */}

      </>
    );
  }

  export default RoundedCube2;