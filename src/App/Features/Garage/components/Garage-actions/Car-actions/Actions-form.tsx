import React from "react";

interface Props {
  values: { name: string; color: string };
  setValues: React.Dispatch<React.SetStateAction<{ name: string; color: string }>>;
}
function ActionsForm({ values, setValues }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-[12px]">
          Name
        </label>
        <input
          className="border border-gray-300 p-1 rounded-lg"
          required
          type="text"
          placeholder="Car Name"
          name="name"
          value={values.name}
          onChange={e => setValues({ ...values, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="head" className="text-[12px]">
          Color
        </label>
        <input
          required
          type="color"
          id="color"
          name="car-color"
          value={values.color}
          onChange={e =>
            setValues({
              ...values,
              color: e.target.value
            })
          }
        />
      </div>
    </div>
  );
}

export default ActionsForm;
