import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const AirPods = () => {
  const model = useGLTF("./air_pods.glb");
  const groupRef = useRef();

  const parts = {};
  model.scene.traverse((e) => {
    parts[e.name] = e;
  });

  if (parts.top_) parts.top_.rotation.x = 0;
  if (parts.earbuds001) parts.earbuds001.position.z = 0;
  if (parts.earbuds002) parts.earbuds002.position.z = 0;

  const scrollData = useScroll();

  useFrame(() => {
    const offset = scrollData.offset;

    if (parts.top_) {
      if (offset <= 0.3) {
        parts.top_.rotation.x = THREE.MathUtils.lerp(
          parts.top_.rotation.x,
          (-Math.PI / 2) * (offset / 0.3),
          0.1
        );
      }
      else if (offset >= 0.7) {
        parts.top_.rotation.x = THREE.MathUtils.lerp(
          parts.top_.rotation.x,
          ((-Math.PI / 2) * (1 - offset)) / 0.3,
          0.1
        );
      }
    }

    const earOffset = Math.min(Math.max((offset - 0.3) / 0.4, 0), 1);
    if (parts.earbuds001) {
      parts.earbuds001.position.z = THREE.MathUtils.lerp(
        parts.earbuds001.position.z,
        0.2 * earOffset,
        0.1
      );
    }
    if (parts.earbuds002) {
      parts.earbuds002.position.z = THREE.MathUtils.lerp(
        parts.earbuds002.position.z,
        0.2 * earOffset,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default AirPods;
