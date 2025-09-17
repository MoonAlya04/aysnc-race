import { useCallback, useEffect, useState } from 'react';
import useWinnerStore from '../../Garage/Store/Use-winner-store';
import useWinners from './Use-winners';

export default function useWinnersTable() {
  const { getWinners } = useWinners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const { setWinners, winners } = useWinnerStore(state => ({
    setWinners: state.setWinners,
    winners: state.winners,
    setActivePage: state.setActivePage,
    winnersCount: state.winnersCount,
    activePage: state.activePage,
  }));

  const getWinnersRsp = useCallback(async () => {
    const response = await getWinners({
      requestParams: { limit: 1000, page: 1 },
      callbacks: {
        beforeAPICall: () => setLoading(true),
        afterAPICall: () => setLoading(false),
      },
    });
    if (response.error) {
      setError(response.error.message);
      return;
    }
    const winnersWithCarId = response.data!.items.map(winner => ({ ...winner, carId: winner.id }));
    setWinners(winnersWithCarId);
  }, [getWinners, setWinners, setLoading]);

  useEffect(() => {
    if (!hasInitializedStore && typeof window !== 'undefined') {
      setHasInitializedStore(true);
    }
    if (hasInitializedStore && !winners.length) {
      getWinnersRsp();
    }
  }, [getWinnersRsp, winners, hasInitializedStore]);

  return {
    loading,
    error,
    winners,
  };
}
