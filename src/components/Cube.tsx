import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import React from "react";
import { NearestFilter } from "three";
import { TCube, useStore } from "../hooks/useStore";
import textures from "../images/textures";

const Cube = ({ position, texture }: TCube) => {
  const [ref] = useBox<any>(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[texture + "Texture"];
  activeTexture.magFilter = NearestFilter;

  return (
    <mesh
      ref={ref}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const { x, y, z } = ref.current.position;
        const clickedFace = Math.floor((e.faceIndex as number) / 2);

        console.log((e as any).which);
        if ((e as any).which === 3) return removeCube(x, y, z);
        if (clickedFace === 0) {
          addCube(x + 1, y, z);
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z);
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z);
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z);
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1);
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial map={activeTexture} />
    </mesh>
  );
};

export default Cube;
