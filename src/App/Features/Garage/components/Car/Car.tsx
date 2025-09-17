import { CarCondition } from '../../../../../api/Slices/garage/types';
import { RaceType } from '../../Store/Use-winner-store';
import useCarAnimation from '../../Hooks/Use-car-animation';
import { Car as CarEntity } from '../../../../../api/Slices/garage/entity';
import { useManageCar } from '../../Hooks/Use-manage-car.hook';
import { EngineStatus } from '../../../../../api/Slices/engine/types';
import CarWithWindows from './Car-icon';

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
    raceType,
  });

  const { carRef } = useCarAnimation({
    id: car.id,
    initialPosition: car.position ?? 0,
    speed: car.engine?.velocity ?? 0,
    status: car.engine?.status ?? EngineStatus.stopped,
    condition: carCondition || CarCondition.running,
    onReachTheEnd: carReachTheEnd,
    handlePosition,
  });

  return (
    <div ref={carRef} className="w-fit">
      <CarWithWindows color={car.color} />
    </div>
  );
}
