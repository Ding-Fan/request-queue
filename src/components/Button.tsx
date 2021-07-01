import React, { MouseEventHandler } from "react";
interface IProps {
  text?: string;
  handleClick?: MouseEventHandler<HTMLDivElement>;
}
export default function Button({ text = "Button", handleClick }: IProps) {
  return (
    <div
      onClick={handleClick}
      className="flex-1 cursor-pointer border-4 rounded-full p-2 text-center">
      {text}
    </div>
  );
}
