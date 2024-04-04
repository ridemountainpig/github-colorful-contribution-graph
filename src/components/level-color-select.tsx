import React from "react";
import { Palette } from "./palette";

type LevelColorSelectProps = {
  level: string;
  color: string;
  left: string;
  paletteToggle: boolean;
  setPaletteToggle: (value: string | ((prevVar: string) => string)) => void;
};

export const LevelColorSelect: React.FC<LevelColorSelectProps> = ({
  level,
  color,
  left,
  paletteToggle,
  setPaletteToggle,
}) => {
  return (
    <div>
      <div className="flex h-fit items-center">
        <div className="h-2 w-2 rounded-full border-2 border-solid border-[#d0d7de] bg-shark-50"></div>
        <span className="ml-1 text-sm font-bold tracking-wider text-shark-400">
          {level}
        </span>
      </div>
      <button
        className="h-11 w-11 rounded-md border-2 border-solid border-[#d0d7de] bg-[#ebedf0]"
        onClick={() => {
          if (paletteToggle) {
            setPaletteToggle("");
            return;
          }
          setPaletteToggle(level);
        }}
      ></button>
      <div className="text-center text-[8px] font-bold tracking-wider text-shark-400">
        {color}
      </div>
      <div className="absolute -left-2.5 top-[6.2rem]">
        {paletteToggle && <Palette left={left}></Palette>}
      </div>
    </div>
  );
};
