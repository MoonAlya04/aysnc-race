import { useCallback, useState } from "react";
import useManageGarageActions from "../../../Hooks/Use-manage-garage-actions.hook.ts";
import ActionsForm from "./Actions-form.tsx";
import Button from "../../../../../../common/components/Button/Button.tsx";
interface Props {
  onClose: () => void;
}

function CreateCar({ onClose }: Props) {
  const { createCarAction, loading } = useManageGarageActions();
  const [updateValues, setUpdateValues] = useState({
    name: "",
    color: "#000000"
  });

  const isFieldsFilled = updateValues.name && updateValues.color;

  const submit = useCallback(async () => {
    if (isFieldsFilled) {
      await createCarAction({
        name: updateValues.name!,
        color: updateValues.color!
      });
    }
    onClose();
  }, [isFieldsFilled, onClose, createCarAction, updateValues.color, updateValues.name]);

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

export default CreateCar;
