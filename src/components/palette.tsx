import React, { useState } from "react";
import { ColorSelect } from "./color-select";
import { Check, RefreshCcw } from "lucide-react";

type PaletteProps = {
  left: string;
};

const isValidHexColor = (hexColor: string) => {
  // This regex matches #RGB, #RRGGBB, #RGBA, and #RRGGBBAA formats
  const regex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
  return regex.test(hexColor);
};

export const Palette: React.FC<PaletteProps> = ({ left }) => {
  const [color, setColor] = useState("#ebedf0");
  const [isColorValid, setIsColorValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    setIsColorValid(isValidHexColor(newColor));
  };

  const randomHexColor = () => {
    const color = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    setColor(`#${color}`);
  };

  return (
    <div className="relative w-[22rem] rounded-md border-2 border-solid border-shark-200 bg-white p-4">
      <div className="flex h-fit items-center justify-center gap-x-2 pb-2">
        <div
          className="h-8 w-8 rounded-md"
          style={{ backgroundColor: color }}
        ></div>
        <div>
          <input
            type="text"
            className={`h-8 w-32 rounded-md border border-solid border-shark-200 bg-[#f6f8fa] font-mono text-sm ${
              isColorValid ? "" : "text-[#d1242f]"
            }`}
            value={color}
            onChange={handleChange}
          />
        </div>
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-shark-200"
          onClick={randomHexColor}
        >
          <RefreshCcw size="16" />
        </button>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-shark-200">
          <Check size="16" />
        </button>
      </div>
      <div className="flex justify-around">
        <ColorSelect color="#B60205" setColor={setColor}></ColorSelect>
        <ColorSelect color="#D93F0B" setColor={setColor}></ColorSelect>
        <ColorSelect color="#FBCA04" setColor={setColor}></ColorSelect>
        <ColorSelect color="#0E8A16" setColor={setColor}></ColorSelect>
        <ColorSelect color="#006B75" setColor={setColor}></ColorSelect>
        <ColorSelect color="#1D76DB" setColor={setColor}></ColorSelect>
        <ColorSelect color="#0052CC" setColor={setColor}></ColorSelect>
        <ColorSelect color="#5319E7" setColor={setColor}></ColorSelect>
      </div>
      <div className="mt-2 flex justify-around">
        <ColorSelect color="#E99695" setColor={setColor}></ColorSelect>
        <ColorSelect color="#F9D0C4" setColor={setColor}></ColorSelect>
        <ColorSelect color="#FEF2C0" setColor={setColor}></ColorSelect>
        <ColorSelect color="#C2E0C6" setColor={setColor}></ColorSelect>
        <ColorSelect color="#BFDADC" setColor={setColor}></ColorSelect>
        <ColorSelect color="#C5DEF5" setColor={setColor}></ColorSelect>
        <ColorSelect color="#BFD4F2" setColor={setColor}></ColorSelect>
        <ColorSelect color="#D4C5F9" setColor={setColor}></ColorSelect>
      </div>
      <div
        className="absolute h-4 w-4 rotate-45 border-l-2 border-t-2 border-solid border-shark-200 bg-white"
        style={{ top: "-10px", left: `${left}px` }}
      ></div>
    </div>
  );
};
