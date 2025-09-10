import Api from "../../../../api/index";
import { useCallback } from "react";
import { Callbacks } from "../../../../common/types";
import { GetWinnersParams } from "../../../../api/Slices/winners/types";
import { Winner } from "../../../../api/Slices/winners/entity";

export default function useWinners() {
  const getWinners = useCallback(
    async ({ requestParams, callbacks }: { requestParams: GetWinnersParams; callbacks: Callbacks }) => {
      callbacks.beforeAPICall?.();
      const rsp = await Api.winners.GetWinners(requestParams);
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

  const getWinner = useCallback(async ({ id, callbacks }: { id: number; callbacks: Callbacks }) => {
    callbacks.beforeAPICall?.();
    const rsp = await Api.winners.GetWinner({ id });
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

  const createWinner = useCallback(async ({ winner, callbacks }: { winner: Omit<Winner, "id">; callbacks: Callbacks }) => {
    callbacks.beforeAPICall?.();
    const rsp = await Api.winners.CreateWinner(winner);
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

  const deleteWinner = useCallback(async ({ id, callbacks }: { id: number; callbacks: Callbacks }) => {
    callbacks.beforeAPICall?.();
    const rsp = await Api.winners.DeleteWinner({ id });
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

  const updateWinner = useCallback(
    async ({ id, wins, time, callbacks }: { id: number; wins: number; time: number; callbacks: Callbacks }) => {
      callbacks.beforeAPICall?.();
      const rsp = await Api.winners.UpdateWinner({ id, wins, time });
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

  return { getWinners, getWinner, createWinner, deleteWinner, updateWinner };
}
