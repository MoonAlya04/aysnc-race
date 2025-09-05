import { useCallback, useState } from "react";
import useGarageStore from "../../../Store/Usa-garage-store.ts";
import Button from "../../../../../../common/components/Button/Button.tsx";
import useManageGarageActions from "../../../Hooks/Use-manage-garage-actions.hook.ts";
import ActionsForm from "./Actions-form.tsx";


interface Props {
  id: number;
  onClose: () => void;
}
function UpdateCar({ id, onClose }: Props) {
  const car = useGarageStore(state => state.getCar(id));
  const { updateCarAction, loading } = useManageGarageActions();
  const [updateValues, setUpdateValues] = useState({
    name: car?.name || "",
    color: car?.color || "#000000"
  });

  const isFieldsFilled = updateValues.name && updateValues.color;
  const fieldsAreChanged = updateValues.name !== car?.name || updateValues.color !== car?.color;

  const submit = useCallback(async () => {
    if (isFieldsFilled && fieldsAreChanged) {
      await updateCarAction({
        id,
        name: updateValues.name!,
        color: updateValues.color!
      });
    }
    onClose();
  }, [id, isFieldsFilled, onClose, updateCarAction, updateValues.color, updateValues.name, fieldsAreChanged]);

  return (
    <div className="bg-white p-6 flex-flex-col space-y-4 rounded-2xl">
      <div>
        <ActionsForm values={updateValues} setValues={setUpdateValues} />
      </div>
      <div className="flex flex-row justify-between">
        <Button disabled={!isFieldsFilled} onClick={submit}>
          {loading ? "Loading..." : "Update"}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
}

export default UpdateCar;
