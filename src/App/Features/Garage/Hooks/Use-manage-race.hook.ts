
import { useCallback, useRef } from "react";
import useGarageStore from "../Store/Usa-garage-store.ts";
import useWinnerStore from "../Store/Use-winner-store.ts";
import { EngineStatus } from "../../../../api/slices/engine/types.ts";
import { useEngineActions } from "./Use-engine.hook.ts";

export default function useManageRace() {
  const { cars, resetCarsInStore } = useGarageStore(state => ({
    cars: state.cars[String(state.activePage)],
    resetCarsInStore: state.resetCars
  }));

  const onGoingRace = useRef(true);
  const canReset = cars?.some(car => car.position > 0) && onGoingRace.current;
  const { raceWinnerId, setRaceWinnerId, setRaceType, raceType } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId,
    setRaceType: state.setRaceType,
    raceType: state.raceType
  }));
  const { updateCarEngine } = useEngineActions();

  const handleAllCarsEngineActions = useCallback(async () => {
    setRaceType("multi");
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.started }));
    await Promise.all(actions);
    onGoingRace.current = true;
  }, [cars, updateCarEngine, setRaceType]);

  const resetCars = useCallback(async () => {
    setRaceType(null);
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.stopped }));
    resetCarsInStore();
    await Promise.all(actions);
    onGoingRace.current = false;
    if (raceWinnerId) {
      setRaceWinnerId(null);
    }
  }, [cars, updateCarEngine, resetCarsInStore, raceWinnerId, setRaceWinnerId, setRaceType]);

  return { handleAllCarsEngineActions, resetCars, canReset, raceType };
}
