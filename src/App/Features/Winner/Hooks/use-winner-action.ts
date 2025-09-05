
import { useCallback, useState } from "react";
import useWinners from "./Use-winners.ts";
import useWinnerStore from "../../Garage/Store/Use-winner-store.ts";

export default function useWinnerAction() {
  const { createWinner, updateWinner } = useWinners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getWinner, updateWinnerInStore, createWinnerInStore } = useWinnerStore(state => ({
    getWinner: state.getWinner,
    updateWinnerInStore: state.updateWinner,
    createWinnerInStore: state.createWinner
  }));

  const handleWinnerAction = useCallback(
    async ({ id, time }: { id: number; time: number }) => {
      const winner = getWinner(id);
      if (winner) {
        const rsp = await updateWinner({
          id: winner.id,
          wins: winner.wins + 1,
          time,
          callbacks: {
            beforeAPICall: () => setLoading(true),
            afterAPICall: () => setLoading(false)
          }
        });
        if (rsp.error) {
          setError(rsp.error.message);
        } else {
          updateWinnerInStore(id, rsp.data!);
        }
      } else {
        const rsp = await createWinner({
          winner: { wins: 1, time },
          callbacks: {
            beforeAPICall: () => setLoading(true),
            afterAPICall: () => setLoading(false)
          }
        });
        if (rsp.error) {
          setError(rsp.error.message);
        } else {
          createWinnerInStore({ ...rsp.data!, carId: id });
        }
      }
    },
    [getWinner, updateWinner, setLoading, setError, updateWinnerInStore, createWinnerInStore, createWinner]
  );

  return { handleWinnerAction, loading, error };
}
