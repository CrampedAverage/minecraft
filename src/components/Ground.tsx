import { usePlane } from "@react-three/cannon";
import textures from "../images/textures";
import { NearestFilter, RepeatWrapping } from "three";
import { useStore } from "../hooks/useStore";

const Ground = () => {
  const [ref] = usePlane<any>(() => ({
    rotation: [-(Math.PI / 2), 0, 0],
    position: [0, -0.5, 0],
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  const { groundTexture } = textures;

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        if ((e as any).which === 3) return;
        const [x, y, z] = Object.values(e.point).map((val, i) =>
          i == 1 ? Math.ceil(val) : Math.round(val)
        );
        addCube(x, y, z);
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
