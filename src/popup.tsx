import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { LevelColorSelect } from "./components/level-color-select";

const Popup = () => {
  const [levelColor, setLevelColor] = useState(["", "", "", ""]);
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
            setLevelColor(["#9be9a8", "#40c463", "#30a14e", "#216e39"]);
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
            level={0}
            color={levelColor[0].toUpperCase()}
            left="40"
            paletteToggle={paletteToggle == 0}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={1}
            color={levelColor[1].toUpperCase()}
            left="125"
            paletteToggle={paletteToggle == 1}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={2}
            color={levelColor[2].toUpperCase()}
            left="208"
            paletteToggle={paletteToggle == 2}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
          ></LevelColorSelect>
          <LevelColorSelect
            level={3}
            color={levelColor[3].toUpperCase()}
            left="291"
            paletteToggle={paletteToggle == 3}
            setPaletteToggle={setPaletteToggle}
            setLevelColor={setLevelColor}
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
