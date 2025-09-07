import { CarCondition } from "../../../../../api/slices/garage/types.ts";
import { RaceType } from "../../Store/Use-winner-store.ts";
import CarIcon from "./Car-icon.tsx";
import useCarAnimation from "../../Hooks/Use-car-animation.ts";
import { Car as CarEntity } from "../../../../../api/slices/garage/entity.ts";
import { useManageCar } from "../../Hooks/Use-manage-car.hook.ts";
import { EngineStatus } from "../../../../../api/slices/engine/types.ts";

interface Props {
  car: CarEntity;
  winnerId: number | null;
  announceWinner: (id: number) => void;
  raceType: RaceType | null;
}

export default function Car({ car, winnerId, announceWinner, raceType }: Props) {
  const { carCondition, carReachTheEnd, handlePosition } = useManageCar({
    id: car.id,
    winnerId,
    announceWinner,
    raceType
  });

  const { carRef } = useCarAnimation({
    initialPosition: car.position ?? 0,
    speed: car.engine?.velocity ?? 0,
    status: car.engine?.status ?? EngineStatus.stopped,
    condition: carCondition || CarCondition.running,
    onReachTheEnd: carReachTheEnd,
    handlePosition
  });

  return (
    <div ref={carRef} className="w-fit">
      <CarIcon color={car.color} />
    </div>
  );
}
