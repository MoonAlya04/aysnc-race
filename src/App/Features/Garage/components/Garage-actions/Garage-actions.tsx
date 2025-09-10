import React, { PropsWithChildren } from "react";
import CarActions from "./Car-actions/Car-actions";
import RaceActions from "./Race-actions/Race-actions";

interface Props {
  id: number;
  engineStatus: string;
}

function GarageActions({ id, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row space-x-4 items-center w-full h-[100px] rounded-xl overflow-hidden">
      <div>
        <CarActions id={id} />
      </div>
      <div>
        <RaceActions id={id} />
      </div>
      <div className=" relative w-full h-full flex items-center bg-[#52504f]">
        <div className="absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-white transform -translate-y-1/2" />
        {children}
      </div>
    </div>
  );
}

export default GarageActions;
