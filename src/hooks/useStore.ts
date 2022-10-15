import { Triplet } from "@react-three/cannon";
import { nanoid } from "nanoid";
import create from "zustand";

export interface TStoreState {
  cubes: TCube[];
  texture: string;
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}
export interface TCube {
  key: string;
  position: Triplet;
  texture: string;
}

export interface TVector3 {
  x: number;
  y: number;
  z: number;
}

export const useStore = create<TStoreState>((set) => ({
  texture: "dirt",
  cubes: [
    { key: nanoid(), position: [1, 0, 1], texture: "dirt" },
    { key: nanoid(), position: [1, 0, 2], texture: "glass" },
    { key: nanoid(), position: [2, 0, 2], texture: "wood" },
    { key: nanoid(), position: [2, 0, 1], texture: "log" },
  ],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid(), position: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.position;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {},
  resetWorld: () => {},
}));
