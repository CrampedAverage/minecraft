import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";
import TextureSelector from "./components/TextureSelector";

function App() {
  return (
    <div className="h-screen">
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.6} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute -translate-x-1/2 left-1/2 top-1/2 text-2xl -translate-y-1/2 text-slate-400 font-extrabold">
        +
      </div>
      <div onClick={(e) => e.altKey}></div>
      <TextureSelector />
    </div>
  );
}

export default App;
