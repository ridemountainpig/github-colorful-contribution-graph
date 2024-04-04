import React from "react";

type ColorSelectProps = {
  color: string;
  setColor: (value: string | ((prevVar: string) => string)) => void;
};

export const ColorSelect: React.FC<ColorSelectProps> = ({
  color,
  setColor,
}) => {
  return (
    <div
      className="h-7 w-7 cursor-pointer rounded-md"
      style={{ backgroundColor: color }}
      onClick={() => setColor(color)}
    ></div>
  );
};
