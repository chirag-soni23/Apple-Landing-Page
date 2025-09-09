import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const HeadPhone = () => {
  const model = useGLTF("./headphone.glb");
  const groupref = useRef();

  let meshes = {};
  model.scene.traverse((e) => {
    if (e.isMesh) meshes[e.name] = e;
  });

  const scroll = useScroll();

  const colors = [
    new THREE.Color("#1C1C1E"), // Space Gray
    new THREE.Color("#A0A0A5"), // Silver
    new THREE.Color("#0D0D0D"), // Matte Black
    new THREE.Color("#4B5563"), // Graphite
    new THREE.Color("#FFD700"), // Champagne Gold
    new THREE.Color("#0F52BA"), // Midnight Blue
  ];

  useFrame((state, delta) => {
    if (groupref.current) groupref.current.rotation.y += delta * 0.2;

    if (meshes["Object_5"]) {
      const t = scroll.offset;
      const index = Math.floor(t * (colors.length - 1));
      const nextIndex = Math.min(index + 1, colors.length - 1);
      const progress = (t * (colors.length - 1)) % 1;

      const currentColor = new THREE.Color().lerpColors(
        colors[index],
        colors[nextIndex],
        progress
      );

      meshes["Object_5"].material.color.lerp(currentColor, 0.1);
    }
  });

  return (
    <group ref={groupref}>
      <primitive object={model.scene} />
    </group>
  );
};

export default HeadPhone;
