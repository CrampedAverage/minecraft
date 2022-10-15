import React, { useEffect, useState } from "react";
import useKeyboard from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { debounce } from "lodash";
import * as images from "../images/images";

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log };
    Object.entries(textures).forEach(([textureKey, textureValue]) => {
      if (textureValue) setTexture(textureKey);
    });
  }, [dirt, grass, glass, wood, log]);

  useEffect(() => {
    console.log(activeTexture);
    const visibilityTimeout = debounce(() => {
      setVisible(false);
    }, 3000);
    visibilityTimeout();
    setVisible(true);
  }, [activeTexture]);
  console.log(images);
  // if (!visible) return null;
  return (
    <div className="absolute left-1/2 bottom-4 text-2xl bg-red-400 flex -translate-x-1/2">
      {Object.entries(images).map(([key, src]) => {
        console.log(activeTexture, key);
        return (
          <img
            key={key}
            src={src}
            className={`w-12  ${activeTexture + "Img" === key ? "p-1" : "p-2"}`}
          />
        );
      })}
    </div>
  );
};

export default TextureSelector;
