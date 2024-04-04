import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { LevelColorSelect } from "./components/level-color-select";

const Popup = () => {
  const [levelColor, setLevelColor] = useState([
    "#ebedf0",
    "#ebedf0",
    "#ebedf0",
    "#ebedf0",
  ]);
  const [paletteToggle, setPaletteToggle] = useState("L0");

  return (
    <div
      className="bg-travertine-400"
      style={{ width: "400px", height: "350px" }}
    >
      <div className="flex h-fit items-center justify-center gap-x-4 py-4">
        <div className="text-2xl font-bold tracking-widest text-shark-500">
          Github Colorful
        </div>
        <img
          src="github-graph-icon.png"
          alt="github graph icon"
          height={50}
          width={50}
          className="rounded-md border-2 border-solid border-[#d0d7de] border-opacity-80"
        />
      </div>
      <div className="mx-4 rounded-md border-2 border-solid border-[#d0d7de] bg-white p-4">
        <div className="relative flex w-full justify-around">
          <LevelColorSelect
            level="L1"
            color={levelColor[0]}
            left="40"
            paletteToggle={paletteToggle == "L1"}
            setPaletteToggle={setPaletteToggle}
          ></LevelColorSelect>
          <LevelColorSelect
            level="L2"
            color={levelColor[1]}
            left="125"
            paletteToggle={paletteToggle == "L2"}
            setPaletteToggle={setPaletteToggle}
          ></LevelColorSelect>
          <LevelColorSelect
            level="L3"
            color={levelColor[2]}
            left="208"
            paletteToggle={paletteToggle == "L3"}
            setPaletteToggle={setPaletteToggle}
          ></LevelColorSelect>
          <LevelColorSelect
            level="L4"
            color={levelColor[3]}
            left="291"
            paletteToggle={paletteToggle == "L4"}
            setPaletteToggle={setPaletteToggle}
          ></LevelColorSelect>
        </div>
      </div>
      <div className="flex h-fit items-center justify-center gap-x-4 py-4">
        <img
          src="colorful-graph.png"
          alt="colorful graph icon"
          height={150}
          width={210}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
