import { useGLTF } from "@react-three/drei";
import React from "react";

const IPhone = () => {
  const model = useGLTF("./iphone.glb");
  return (
    <group position={[0, 0, 0]}>
      <primitive object={model.scene} />
    </group>
  )
};

export default IPhone;
