import React, { useState } from "react";
import { ColorSelect } from "./color-select";
import { Check, Palette as PaletteIcon, RefreshCcw } from "lucide-react";
import { HexColorPicker } from "react-colorful";

type PaletteProps = {
  colorProps: string;
  level: number;
  left: string;
  setLevelColor: (value: string[] | ((prevVar: string[]) => string[])) => void;
  setPaletteToggle: (value: number | ((prevVar: number) => number)) => void;
};

const isValidHexColor = (hexColor: string) => {
  // This regex matches #RGB, #RRGGBB, #RGBA, and #RRGGBBAA formats
  const regex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
  return regex.test(hexColor);
};

const quickColors = [
  "#B60205",
  "#D93F0B",
  "#FBCA04",
  "#0E8A16",
  "#006B75",
  "#1D76DB",
  "#0052CC",
  "#5319E7",
  "#E99695",
  "#F9D0C4",
  "#FEF2C0",
  "#C2E0C6",
  "#BFDADC",
  "#C5DEF5",
  "#BFD4F2",
  "#D4C5F9",
  "#F6F8FA",
  "#D0D7DE",
  "#8C959F",
  "#57606A",
  "#24292F",
  "#0969DA",
  "#1A7F37",
  "#9A6700",
  "#CF222E",
  "#8250DF",
  "#FF7B72",
  "#FFA657",
  "#F2CC60",
  "#7EE787",
  "#79C0FF",
  "#D2A8FF",
  "#FFB3C7",
  "#B7F7D0",
  "#9BE9A8",
  "#40C463",
  "#30A14E",
  "#216E39",
  "#54AEFF",
  "#0A3069",
];

export const Palette: React.FC<PaletteProps> = ({
  colorProps,
  level,
  left,
  setLevelColor,
  setPaletteToggle,
}) => {
  const [color, setColor] = useState(colorProps);
  const [isColorValid, setIsColorValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    setIsColorValid(isValidHexColor(newColor));
  };

  const handleCheck = () => {
    if (isColorValid) {
      setLevelColor((prevColors) => {
        const newColors = [...prevColors];
        newColors[level] = color;
        return newColors;
      });

      setPaletteToggle(-1);
    }
  };

  const [colorPalette, setColorPalette] = useState(false);

  const randomHexColor = () => {
    const color = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();
    setColor(`#${color}`);
  };

  return (
    <div className="relative h-36 w-[23rem] rounded-md border-2 border-solid border-shark-200 bg-white p-2">
      <div className="flex h-fit items-center justify-center gap-x-2 py-2">
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
            value={color.toUpperCase()}
            onChange={handleChange}
          />
        </div>
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-shark-200"
          onClick={() => setColorPalette(!colorPalette)}
        >
          <PaletteIcon size="16" />
        </button>
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-shark-200"
          onClick={randomHexColor}
        >
          <RefreshCcw size="16" />
        </button>
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-shark-200"
          onClick={handleCheck}
        >
          <Check size="16" />
        </button>
      </div>
      {colorPalette ? (
        <div className="react-palette flex justify-center">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      ) : (
        <div className="mt-2 grid max-h-[4.8rem] grid-cols-8 gap-2 overflow-y-auto px-1">
          {quickColors.map((quickColor) => (
            <ColorSelect
              key={quickColor}
              color={quickColor}
              setColor={setColor}
            ></ColorSelect>
          ))}
        </div>
      )}
      <div
        className="absolute h-4 w-4 rotate-45 border-l-2 border-t-2 border-solid border-shark-200 bg-white"
        style={{ top: "-10px", left: `${left}px` }}
      ></div>
    </div>
  );
};
