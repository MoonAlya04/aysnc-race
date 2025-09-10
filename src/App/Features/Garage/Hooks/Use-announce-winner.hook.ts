import { useCallback, useState } from "react";
import useWinnerStore from "../Store/Use-winner-store";

export default function useAnnounceWinner() {
  const [showWinner, setShowWinner] = useState(false);
  const { setRaceWinnerId, raceType, raceWinnerId, getWinner } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId,
    raceType: state.raceType,
    getWinner: state.getWinner
  }));

  const announceWinner = useCallback(
    (id: number) => {
      setRaceWinnerId(id);
      setShowWinner(true);
    },
    [setRaceWinnerId, setShowWinner]
  );

  return { showWinner, setShowWinner, raceType, raceWinnerId, announceWinner, getWinner };
}
