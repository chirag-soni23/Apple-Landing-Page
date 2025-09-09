import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const IPhone = () => {
  const model = useGLTF("./i phone 14 2.glb");
  const groupRef = useRef();

  let backMaterial;
  let appleLogo;

  model.scene.traverse((e) => {
    if (e.isMesh) {
      if (e.material.name === "Material.009") {
        backMaterial = e.material;
      } else if (e.material.name === "Material.013") {
        appleLogo = e;
        // Render on top
        appleLogo.renderOrder = 10;
        appleLogo.material.depthWrite = false;
        appleLogo.position.z -= 0.02;
      }
    }
  });

  const scroll = useScroll();

  useFrame(() => {
    if (backMaterial) {
      const scrollValue = scroll.range(0, 1);
      backMaterial.color.setHSL(scrollValue, 0.7, 0.5);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default IPhone;
