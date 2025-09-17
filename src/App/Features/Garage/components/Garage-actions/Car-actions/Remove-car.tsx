import Button from '../../../../../../common/components/Button/Buttons';
import React, { useCallback } from 'react';
import useGarageStore from '../../../Store/Usa-garage-store';
import useManageGarageActions from '../../../Hooks/Use-manage-garage-actions.hook';

interface Props {
  id: number;
  onClose: () => void;
}
function RemoveCar({ id, onClose }: Props) {
  const { removeCarAction } = useManageGarageActions();
  const { car } = useGarageStore(state => ({
    car: state.getCar(id),
  }));

  const handleRemoveCar = useCallback(async () => {
    await removeCarAction({ id });
    onClose();
  }, [id, onClose, removeCarAction]);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-xl">
      <div>
        <p>Do you want to remove ``{car?.name}`` ?</p>
      </div>
      <div className="flex flex-row justify-between">
        <Button onClick={handleRemoveCar}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </div>
    </div>
  );
}

export default RemoveCar;
