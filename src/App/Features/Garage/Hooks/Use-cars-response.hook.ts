import { useCallback } from "react";
import { Callbacks } from "../../../../common/types";
import Api from "../../../../api/index.ts";

export function useCarsResponse() {
  const getCarsResponse = useCallback(
    async ({ page, limit, callbacks }: { page?: number; limit?: number; callbacks: Callbacks }) => {
      callbacks.beforeAPICall?.();
      const rsp = await Api.garage.GetCars(page, limit);
      callbacks.afterAPICall?.();
      if (rsp.meta.error) {
        return {
          error: rsp.meta.error,
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

  const getCarResponse = useCallback(async ({ id, callbacks }: { id: number; callbacks: Callbacks }) => {
    callbacks.beforeAPICall?.();
    const rsp = await Api.garage.GetCar({ id });
    callbacks.afterAPICall?.();
    if (rsp.meta.error) {
      return {
        error: rsp.meta.error,
        data: null
      };
    }

    return {
      error: null,
      data: rsp.data
    };
  }, []);

  return { getCarsResponse, getCarResponse };
}
