import React from "react";
import { Palette } from "./palette";

type LevelColorSelectProps = {
  level: number;
  color: string;
  left: string;
  paletteToggle: boolean;
  setPaletteToggle: (value: number | ((prevVar: number) => number)) => void;
  setLevelColor: (value: string[] | ((prevVar: string[]) => string[])) => void;
};

export const LevelColorSelect: React.FC<LevelColorSelectProps> = ({
  level,
  color,
  left,
  paletteToggle,
  setPaletteToggle,
  setLevelColor,
}) => {
  return (
    <div>
      <div className="flex h-fit items-center">
        <div className="h-2 w-2 rounded-full border-2 border-solid border-[#d0d7de] bg-shark-50"></div>
        <span className="ml-1 text-sm font-bold tracking-wider text-shark-400">
          L{level}
        </span>
      </div>
      <button
        className="h-11 w-11 rounded-md border-2 border-solid border-[#d0d7de]"
        style={{ backgroundColor: color }}
        onClick={() => {
          if (paletteToggle) {
            setPaletteToggle(-1);
            return;
          }
          setPaletteToggle(level);
        }}
      ></button>
      <div className="text-center text-[8px] font-bold tracking-wider text-shark-400">
        {color}
      </div>
      <div className="absolute -left-[18px] top-[6.2rem] z-10">
        {paletteToggle && (
          <Palette
            colorProps={color}
            level={level}
            left={left}
            setLevelColor={setLevelColor}
            setPaletteToggle={setPaletteToggle}
          ></Palette>
        )}
      </div>
    </div>
  );
};
