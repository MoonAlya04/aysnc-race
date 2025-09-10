import React from "react";
import RaceControlPanel from "../Features/Garage/components/Race-control-panel/Race-control-panel";
import RaceTrack from "../Features/Garage/components/Race-track/Race-track";

const Garage = () => {
  return (
    <div>
      <RaceControlPanel />
      <RaceTrack />
    </div>
  );
};

export default Garage;
