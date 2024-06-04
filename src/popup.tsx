import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { LevelColorSelect } from "./components/level-color-select";
import { Blocks, CopyPlus, Paintbrush } from "lucide-react";
import { themes } from "./data/themes";

const Popup = () => {
  const [levelColor, setLevelColor] = useState(["", "", "", "", ""]);
  const [paletteToggle, setPaletteToggle] = useState(-1);

  const setColor = () => {
    const data = { levelColor: levelColor };
    chrome.runtime.sendMessage({ type: "setColor", data: data }, () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error sending setColor message:",
          JSON.stringify(chrome.runtime.lastError, null, 2),
        );
      } else {
        console.log("Data sent to the background script.");
      }
    });
    chrome.runtime.sendMessage({ type: "updatePageGraphColor" }, () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error sending updateColor message:",
          JSON.stringify(chrome.runtime.lastError, null, 2),
        );
      } else {
        console.log("Data sent to the background script.");
      }
    });
  };

  const getColor = () => {
    chrome.runtime.sendMessage(
      { type: "getColor", data: "levelColor" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error receiving getColor message:",
            JSON.stringify(chrome.runtime.lastError, null, 2),
          );
        } else {
          console.log("Data received from the background:", response);
          if (Array.isArray(response) && response.length > 0) {
            setLevelColor(response);
          } else {
            setLevelColor([
              "#ebedf0",
              "#9be9a8",
              "#40c463",
              "#30a14e",
              "#216e39",
            ]);
          }
        }
      },
    );
  };

  // useEffect for getColor, runs only once when the component mounts
  useEffect(() => {
    getColor();
  }, []);

  // useEffect for setColor, runs every time levelColor changes
  useEffect(() => {
    setColor();
  }, [levelColor]);

  // Select the theme script
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const handleMouseEnter = (themeName: string) => {
    setHoverText(themeName);
    setHoverShow(true);
  };

  const handleMouseLeave = () => {
    setHoverShow(false);
  };

  return (
    <div
      className="bg-travertine-400"
      style={{ width: "400px", height: "360px" }}
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
            level={0}
            color={levelColor[0].toUpperCase()}
            left="42"
            paletteToggle={paletteToggle == 0}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={1}
            color={levelColor[1].toUpperCase()}
            left="108"
            paletteToggle={paletteToggle == 1}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={2}
            color={levelColor[2].toUpperCase()}
            left="176"
            paletteToggle={paletteToggle == 2}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={3}
            color={levelColor[3].toUpperCase()}
            left="242"
            paletteToggle={paletteToggle == 3}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={4}
            color={levelColor[4].toUpperCase()}
            left="308"
            paletteToggle={paletteToggle == 4}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
        </div>
      </div>
      <div className="mx-4 mt-2 flex gap-x-2">
        <div className="w-fit rounded-[6px] border-2 border-solid border-[#d0d7de] bg-white px-2 py-1">
          <div className="flex h-fit items-center py-1">
            <Blocks size={16} className="text-shark-400" />
            <div className="px-1 text-[10px] font-bold tracking-wider text-shark-400">
              SELECT THE THEME
            </div>
          </div>
        </div>
        <div className="w-fit rounded-[6px] border-2 border-solid border-[#d0d7de] bg-white px-2 py-1">
          <div className="flex h-fit items-center py-1">
            <Paintbrush size={16} className="text-shark-400" />
            <div className="px-1 text-[10px] font-bold tracking-wider text-shark-400">
              PAINT THE GRAPH
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-4 mt-1">
        <div className="z-0 h-[110px] w-full overflow-scroll py-1 no-scrollbar">
          <div className="flex flex-wrap gap-[0.3rem]">
            {themes.map((theme, index) => (
              <div
                key={index}
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-[6px] border-4 border-solid border-white"
                onClick={() =>
                  setLevelColor([
                    theme.level0,
                    theme.level1,
                    theme.level2,
                    theme.level3,
                    theme.level4,
                  ])
                }
                onMouseEnter={() => handleMouseEnter(theme.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex">
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.level1 }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.level2 }}
                  ></div>
                </div>
                <div className="flex">
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.level3 }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.level4 }}
                  ></div>
                </div>
              </div>
            ))}
            <a
              className="flex h-12 w-12 items-center justify-center rounded-[6px] border-4 border-solid border-white bg-white"
              href="https://github.com/ridemountainpig/github-colorful-contribution-graph?tab=readme-ov-file#contribute-themes-to-the-extension"
              target="_blank"
              onMouseEnter={() => handleMouseEnter("Add Theme")}
              onMouseLeave={handleMouseLeave}
            >
              <CopyPlus size={30} className="text-shark-400" />
            </a>
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-1/2 h-fit w-fit -translate-x-1/2 transform rounded-md bg-shark-400 px-2 py-1 text-sm text-white ${hoverShow ? "block" : "hidden"}`}
        >
          {hoverText}
        </div>
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
