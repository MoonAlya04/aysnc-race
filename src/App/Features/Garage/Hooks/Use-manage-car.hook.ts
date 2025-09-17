import { useCallback } from 'react';
import useGarageStore from '../Store/Usa-garage-store';
import { EngineStatus } from '../../../../api/Slices/engine/types';
import { RaceType } from '../Store/Use-winner-store';
import useWinnerAction from '../../Winner/Hooks/use-winner-action';
import useWinnerStore from '../Store/Use-winner-store';

interface Props {
  id: number;
  raceType: RaceType | null;
  winnerId: number | null;
  announceWinner: (id: number) => void;
}

export function useManageCar({ id, winnerId, announceWinner, raceType }: Props) {
  const { updateCarPosition, updateCarStatus, carCondition } = useGarageStore(store => ({
    updateCarPosition: store.updateCar,
    updateCarStatus: store.updateCarStatus,
    carCondition: store.getCar(id)?.condition,
  }));

  const { handleWinnerAction } = useWinnerAction();
  const { setRaceInProgress } = useWinnerStore(state => ({
    setRaceInProgress: state.setRaceInProgress,
  }));

  const carReachTheEnd = async (position: number, time: number) => {
    // Stop car visually
    updateCarPosition({ id, car: { position } });
    updateCarStatus({ id, status: EngineStatus.stopped });

    if (!winnerId) {
      await handleWinnerAction({ id, time });

      if (raceType === 'multi') {
        announceWinner(id);
      } else {
        setRaceInProgress(false);
      }
    }
  };

  const handlePosition = useCallback(
    (position: number) => {
      updateCarPosition({ id, car: { position } });
    },
    [updateCarPosition, id],
  );

  return { carReachTheEnd, handlePosition, carCondition };
}
