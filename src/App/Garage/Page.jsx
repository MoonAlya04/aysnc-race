import React from "react";
import RaceControlPanel from "../Features/Garage/components/Race-control-panel/Race-control-panel.tsx";
import RaceTrack from "../Features/Garage/components/Race-track/Race-track.tsx";


const Garage = () => {
  return (
    <div>
      <RaceControlPanel />
      <RaceTrack />
    </div>
  );
};

export default Garage;
