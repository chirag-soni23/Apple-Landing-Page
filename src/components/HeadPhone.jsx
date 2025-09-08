import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

const HeadPhone = () => {
    const model = useGLTF("./headphone.glb");
    const groupref = useRef();
    useFrame((state, delta) => {
      groupref.current.rotation.x += delta * 0.05;
      groupref.current.rotation.y += delta * 0.1;
      groupref.current.rotation.z += delta * 0.03;
    });
    return (
      <group ref={groupref} position={[0, 0, 0]}>
        <primitive object={model.scene} />
      </group>
    );
}

export default HeadPhone