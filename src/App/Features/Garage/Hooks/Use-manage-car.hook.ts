import { CarCondition } from "../../../../api/slices/garage/types.ts";
import { useCallback } from "react";
import useGarageStore from "../Store/Usa-garage-store.ts";
import { EngineStatus } from "../../../../api/slices/engine/types.ts";
import { RaceType } from "../Store/Use-winner-store.ts";
import useWinnerAction from "../../Winner/Hooks/use-winner-action.ts";


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
    updateCarCondition: (condition: CarCondition) => store.updateCar({ id, car: { condition } })
  }));

  const { handleWinnerAction } = useWinnerAction();

  const carReachTheEnd = async (position: number, time: number) => {
    updateCarPosition({
      id,
      car: { position }
    });
    updateCarStatus({
      id,
      status: EngineStatus.stopped
    });
    if (!winnerId) {
      await handleWinnerAction({ id, time });
      if (raceType === "multi") {
        announceWinner(id);
      }
    }
  };

  const handlePosition = useCallback(
    (position: number) => {
      updateCarPosition({
        id,
        car: { position }
      });
    },
    [updateCarPosition, id]
  );

  return { carReachTheEnd, handlePosition, carCondition };
}
