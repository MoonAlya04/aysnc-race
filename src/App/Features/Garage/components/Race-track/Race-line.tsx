import { CarCondition } from "../../../../../api/Slices/garage/types";
import React, { PropsWithChildren } from "react";

interface Props {
  condition: CarCondition;
  name: string;
}

const RaceLine = ({ condition, name, children }: PropsWithChildren<Props>) => {
  return (
    <div className="relative w-full h-full items-center flex">
      <div
        className={`absolute top-1 left-1 p-1 text-[8px] text-white rounded-md ${
          condition === "running" ? "bg-green-500" : "bg-red-500 animate-blink"
        }`}
      >
        {condition}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center">
        <h1 className="text-white font-bold text-6xl opacity-30 text-shadow-custom">{name}</h1>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default RaceLine;

