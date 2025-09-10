import React, { useCallback, useMemo, useState } from "react";
import UpdateCar from "./Update-car";
import RemoveCar from "./Remove-car";
import useGarageStore from "../../../Store/Usa-garage-store";
import Modal from "../../../../../../common/components/Modal/Modal";
import { EngineStatus } from "../../../../../../api/Slices/engine/types";
import IconButton from "../../../../../../common/components/Button/Icon-Button";

type Modal = "update" | "delete";

interface Props {
  id: number;
}
function CarActions({ id }: Props) {
  const [modalType, setModalType] = useState<Modal | null>(null);
  const car = useGarageStore(state => state.getCar(id));
  const disableActions =
    !car ||
    (car.engine?.status ?? EngineStatus.stopped) !== EngineStatus.stopped || // null -> stopped
    (car.position ?? 0) !== 0; // null -> 0

  const handleAction = useCallback(
    (type: Modal) => {
      if (id) {
        setModalType(type);
      }
    },
    [id, setModalType]
  );

  const modals = useMemo(
    () => ({
      update: <UpdateCar id={id} onClose={() => setModalType(null)} />,
      delete: <RemoveCar id={id} onClose={() => setModalType(null)} />
    }),
    [id, setModalType]
  );

  return (
    <div>
      <div className="flex flex-col space-y-2 items-center">
        <IconButton disabled={disableActions} iconSize={16} icon="edit" onClick={() => handleAction("update")} />
        <IconButton disabled={disableActions} iconSize={16} icon="delete" onClick={() => handleAction("delete")} />
      </div>
      <Modal isOpen={!!modalType}>{modals[modalType!]}</Modal>
    </div>
  );
}

export default CarActions;
