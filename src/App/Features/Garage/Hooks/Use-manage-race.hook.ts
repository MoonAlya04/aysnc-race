import { useCallback, useRef } from 'react';
import useGarageStore from '../Store/Usa-garage-store';
import useWinnerStore from '../Store/Use-winner-store';
import { EngineStatus } from '../../../../api/Slices/engine/types';
import { useEngineActions } from './Use-engine.hook';

export default function useManageRace() {
  const { cars, resetCarsInStore } = useGarageStore(state => ({
    cars: state.cars[String(state.activePage)],
    resetCarsInStore: state.resetCars,
  }));

  const onGoingRace = useRef<boolean>(false);

  const { raceWinnerId, setRaceWinnerId, setRaceType, raceType, setRaceInProgress } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId,
    setRaceType: state.setRaceType,
    raceType: state.raceType,
    setRaceInProgress: state.setRaceInProgress,
  }));

  const { updateCarEngine } = useEngineActions();

  const handleAllCarsEngineActions = useCallback(async () => {
    if (!cars || cars.length === 0) return;

    setRaceType('multi');
    setRaceInProgress(true);

    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.started }));

    await Promise.all(actions);
    onGoingRace.current = true;
  }, [cars, updateCarEngine, setRaceType, setRaceInProgress]);

  const resetCars = useCallback(async () => {
    if (!cars || cars.length === 0) return;

    setRaceType(null);
    setRaceInProgress(false);

    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.stopped }));

    resetCarsInStore();
    await Promise.all(actions);

    onGoingRace.current = false;

    if (raceWinnerId) {
      setRaceWinnerId(null);
    }
  }, [cars, updateCarEngine, resetCarsInStore, raceWinnerId, setRaceWinnerId, setRaceType, setRaceInProgress]);

  const canReset = !!cars?.some(car => car.position > 0) && onGoingRace.current;

  return { handleAllCarsEngineActions, resetCars, canReset, raceType };
}
