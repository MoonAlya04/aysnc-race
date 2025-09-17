import { EngineStatus } from '../../../../../../api/Slices/engine/types';
import IconButton from '../../../../../../common/components/Button/Icon-Button';
import { useEngineActions } from '../../../Hooks/Use-engine.hook';
import useGarageStore from '../../../Store/Usa-garage-store';
import useWinnerStore, { RaceType } from '../../../Store/Use-winner-store';
import { useCallback } from 'react';

interface Props {
  id: number;
}

function RaceActions({ id }: Props) {
  const { updateRaceCondition, startEnable } = useSingleRage({ id });

  return (
    <div className="flex flex-col space-y-2 items-center">
      <IconButton
        iconSize={16}
        icon="start"
        disabled={!startEnable}
        onClick={() =>
          updateRaceCondition({
            type: 'single',
            status: EngineStatus.started,
            reset: false,
          })
        }
      />
      <IconButton
        iconSize={16}
        icon="stop"
        disabled={startEnable}
        onClick={() =>
          updateRaceCondition({
            type: null,
            status: EngineStatus.stopped,
            reset: true,
          })
        }
      />
    </div>
  );
}

export default RaceActions;

function useSingleRage({ id }: { id: number }) {
  const { updateCarEngine } = useEngineActions();
  const { car } = useGarageStore(state => ({
    updateCar: state.updateCar,
    car: state.getCar(id),
  }));

  const { setRaceType, setRaceInProgress } = useWinnerStore(state => ({
    setRaceType: state.setRaceType,
    setRaceInProgress: state.setRaceInProgress,
  }));

  const updateRaceCondition = useCallback(
    async ({
      type,
      status,
      reset,
    }: {
      type: RaceType | null;
      status: EngineStatus.started | EngineStatus.stopped;
      reset: boolean;
    }) => {
      setRaceType(type);
      setRaceInProgress(status === EngineStatus.started); // <-- ensure raceInProgress is set
      await updateCarEngine({
        id,
        status,
        reset,
      });
    },
    [setRaceType, setRaceInProgress, updateCarEngine, id],
  );
  const startEnable = car?.position === 0;
  return { updateRaceCondition, startEnable };
}
