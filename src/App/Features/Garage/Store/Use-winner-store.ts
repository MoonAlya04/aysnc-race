import { Winner } from "../../../../api/Slices/winners/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RaceType = "single" | "multi";

export interface WinnerWithCarId extends Winner {
  carId: number;
}

interface WinnerStore {
  winners: Record<number, WinnerWithCarId[]>;
  activePage: number;
  raceWinnerId: number | null;
  raceType: RaceType | null;
  winnersCount: number;
  raceInProgress: boolean;
}

interface WinnerStoreAction {
  setActivePage: (page: number) => void;
  setWinners: (winners: Record<number, WinnerWithCarId[]>) => void;
  setRaceWinnerId: (id: number | null) => void;
  setRaceType: (raceType: RaceType | null) => void;
  updateWinner: (id: number, winner: Partial<Winner>) => void;
  createWinner: (winner: WinnerWithCarId) => void;
  getWinner: (id: number) => WinnerWithCarId | undefined;
  setRaceInProgress: (inProgress: boolean) => void;
}

const useWinnerStore = create<WinnerStore & WinnerStoreAction>()(
  persist(
    (set, get) => ({
      winners: { 1: [] },
      winnersCount: 0,
      activePage: 1,
      raceInProgress: false,

      setRaceInProgress(inProgress) {
        set(() => ({ raceInProgress: inProgress }));
      },

      raceWinnerId: null,
      raceType: null,

      setWinners(winners) {
        set(() => ({
          winners,
          winnersCount: Object.values(winners).flat().length
        }));
      },

      updateWinner(id, winner) {
        set(state => {
          const pageWinners = state.winners[state.activePage] || [];
          return {
            winners: {
              ...state.winners,
              [state.activePage]: pageWinners.map(w => (w.id === id ? { ...w, ...winner } : w))
            }
          };
        });
      },

      createWinner(winner) {
        set(state => {
          const pageWinners = state.winners[state.activePage] || [];
          const exists = pageWinners.some(w => w.carId === winner.carId);

          if (exists) return state;

          return {
            winners: {
              ...state.winners,
              [state.activePage]: [...pageWinners, winner]
            },
            winnersCount: state.winnersCount + 1
          };
        });
      },

      setRaceType(raceType) {
        set(() => ({ raceType }));
      },

      setRaceWinnerId(raceWinnerId) {
        set(() => ({ raceWinnerId }));
      },

      setActivePage(page) {
        set(() => ({ activePage: page }));
      },

      getWinner(id) {
        return get().winners[get().activePage]?.find(w => w.carId === id);
      }
    }),
    {
      name: "winner-storage"
    }
  )
);

export default useWinnerStore;
