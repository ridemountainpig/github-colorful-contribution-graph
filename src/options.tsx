import React from "react";
import { createRoot } from "react-dom/client";
import "./options.css";

const Options = () => {
  return (
    <div className="flex h-screen w-screen justify-center p-12">
      <div className="flex w-full max-w-4xl flex-col gap-y-8">
        <h1 className="border-b border-black pb-2 text-4xl font-semibold">
          Options Page
        </h1>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
