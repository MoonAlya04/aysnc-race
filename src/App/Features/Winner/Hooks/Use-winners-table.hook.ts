
import { useCallback, useEffect, useState } from "react";
import useWinners from "./Use-winners.ts";
import useWinnerStore from "../../Garage/Store/Use-winner-store.ts";

export default function useWinnersTable() {
  const { getWinners } = useWinners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const { setWinners, winners, setActivePage, winnersCount, activePage } = useWinnerStore(state => ({
    setWinners: state.setWinners,
    winners: state.winners,
    setActivePage: state.setActivePage,
    winnersCount: state.winnersCount,
    activePage: state.activePage
  }));

  const getWinnersRsp = useCallback(
    async (page: number) => {
      const response = await getWinners({
        requestParams: { limit: 10, page },
        callbacks: {
          beforeAPICall: () => setLoading(true),
          afterAPICall: () => setLoading(false)
        }
      });
      if (response.error) {
        setError(response.error.message);
        return;
      }
      const winnersWithCarId = response.data!.items.map(winner => ({ ...winner, carId: winner.id }));
      setWinners({ [page]: winnersWithCarId });
      setActivePage(page);
    },
    [getWinners, setWinners, setActivePage, setLoading]
  );

  useEffect(() => {
    if (!hasInitializedStore && typeof window !== "undefined") {
      setHasInitializedStore(true);
    }
    if (hasInitializedStore && !winners[activePage]?.length) {
      getWinnersRsp(activePage);
    }
  }, [getWinnersRsp, winners, hasInitializedStore, activePage]);

  return {
    loading,
    error,
    winners: winners[activePage],
    page: activePage,
    setPage: setActivePage,
    winnersCount
  };
}
