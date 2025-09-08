import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const MacBookPro = () => {
  const model = useGLTF("./macbook_pro_2021.glb");
  const groupref = useRef();

  let meshes = {};
  model.scene.traverse((e) => {
    meshes[e.name] = e;
  });
  meshes.Ecran_6.rotation.z = THREE.MathUtils.degToRad(-90);

  let data = useScroll();

  useFrame((state, delta) => {
    groupref.current.rotation.x += delta * 0.05;
    groupref.current.rotation.y += delta * 0.1;
    groupref.current.rotation.z += delta * 0.03;
    meshes.Ecran_6.rotation.z = THREE.MathUtils.degToRad(
      90 - data.offset * 180
    );
  });

  return (
    <group ref={groupref} position={[0, 0, 0]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default MacBookPro;
