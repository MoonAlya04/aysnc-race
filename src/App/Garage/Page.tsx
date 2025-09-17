import React from 'react';
import RaceControlPanel from '../Features/Garage/components/Race-control-panel/Race-control-panel';
import RaceTrack from '../Features/Garage/components/Race-track/Race-track';

const Garage = () => {
  return (
    <div>
      <h1 className="bg-green-300 text-center text-[38px] text-green-800">GARAGE</h1>
      <RaceControlPanel />
      <RaceTrack />
    </div>
  );
};

export default Garage;
