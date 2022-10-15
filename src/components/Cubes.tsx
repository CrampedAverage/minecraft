import { TCube, useStore } from "../hooks/useStore";
import Cube from "./Cube";

const Cubes: Function = (): React.ReactElement[] => {
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(({ position, key, texture }) => (
    <Cube key={key} position={position} texture={texture} />
  ));
};

export default Cubes;
