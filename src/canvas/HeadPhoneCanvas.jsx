import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import HeadPhone from "../components/HeadPhone";

const HeadPhoneCanvas = () => {
  return (
    <Canvas
      className="absolute inset-0 z-10"
      camera={{ fov: 3, position: [3, 2, 6] }}
    >
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/brown_photostudio_02_4k.exr" />
      <ScrollControls pages={2}>
        <group scale={1}>
          <HeadPhone />
        </group>
      </ScrollControls>
    </Canvas>
  );
};

export default HeadPhoneCanvas;
