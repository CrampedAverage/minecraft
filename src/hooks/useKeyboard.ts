import { useCallback, useEffect, useState } from "react";

interface IKeyActionMap {
  [key: string]: string;
}
const actionByKey = (key: string): string | undefined => {
  const keyActionMap: IKeyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "glass",
    Digit3: "grass",
    Digit4: "log",
    Digit5: "wood",
  };

  return keyActionMap[key];
};

const useKeyboard = () => {
  const [action, setAction] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setAction((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setAction((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return action;
};

export default useKeyboard;
