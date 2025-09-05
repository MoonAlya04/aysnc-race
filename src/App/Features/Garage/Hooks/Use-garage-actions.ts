import Api from "../../../../api/index.ts";
import { Callbacks } from "../../../../common/types";
import { useCallback } from "react";

export default function useGarageActions() {
  const createCar = useCallback(async ({ name, color, callbacks }: { name: string; color: string; callbacks?: Callbacks }) => {
    callbacks?.beforeAPICall?.();
    const rsp = await Api.garage.CreateCar({ name, color });
    callbacks?.afterAPICall?.();
    if (rsp.meta.error) {
      return {
        error: rsp.meta.error.message,
        data: null
      };
    }
    return {
      error: null,
      data: rsp.data
    };
  }, []);

  const deleteCar = useCallback(async ({ id, callbacks }: { id: number; callbacks: Callbacks }) => {
    callbacks.beforeAPICall?.();
    const rsp = await Api.garage.DeleteCar({ id });
    callbacks.afterAPICall?.();
    if (rsp.meta.error) {
      return {
        error: rsp.meta.error.message,
        data: null
      };
    }
    return {
      error: null,
      data: rsp.data
    };
  }, []);

  const updateCar = useCallback(
    async ({ id, name, color, callbacks }: { id: number; name: string; color: string; callbacks: Callbacks }) => {
      callbacks.beforeAPICall?.();
      const rsp = await Api.garage.UpdateCar({ id, name, color });
      callbacks.afterAPICall?.();
      if (rsp.meta.error) {
        return {
          error: rsp.meta.error.message,
          data: null
        };
      }
      return {
        error: null,
        data: rsp.data
      };
    },
    []
  );
  return {
    createCar,
    deleteCar,
    updateCar
  };
}
