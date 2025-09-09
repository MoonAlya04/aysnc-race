import { Winner } from "../../../../api/Slices/winners/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RaceType = "single" | "multi";

export interface WinnerWithCarId extends Winner {
  carId: number;
}
interface WinnerStore {
  winners: Record<string, WinnerWithCarId[]>;
  activePage: number;
  raceWinnerId: number | null;
  raceType: RaceType | null;
  winnersCount: number;
}

interface WinnerStoreAction {
  setActivePage: (page: number) => void;
  setWinners: (winners: Record<string, WinnerWithCarId[]>) => void;
  setRaceWinnerId: (id: number | null) => void;
  setRaceType: (raceType: RaceType | null) => void;
  updateWinner: (id: number, winner: Winner) => void;
  createWinner: (winner: WinnerWithCarId) => void;
  getWinner: (id: number) => WinnerWithCarId | undefined;
}

const useWinnerStore = create<WinnerStore & WinnerStoreAction>()(
  persist(
    (set, get) => ({
      winners: { "1": [] },
      winnersCount: 1,
      activePage: 1,
      setActivePage(page) {
        set(() => ({ activePage: page }));
      },
      raceWinnerId: null,
      raceType: null,
      setWinners(winners) {
        set(() => ({
          winners
        }));
      },
      updateWinner(id, winner) {
        set(state => ({
          winners: {
            ...state.winners,
            [state.activePage]: state.winners[state.activePage].map(w => (w.id === id ? { ...w, ...winner } : w))
          }
        }));
      },
      createWinner(winner) {
        set(state => ({
          winners: {
            ...state.winners,
            [state.activePage]: [...state.winners[state.activePage], winner]
          }
        }));
      },
      setRaceType(raceType) {
        set(() => ({ raceType }));
      },

      setRaceWinnerId(raceWinnerId) {
        set(() => ({ raceWinnerId }));
      },
      getWinner(id) {
        return get().winners[get().activePage].find(w => w.carId === id);
      }
    }),
    {
      name: "winner-storage"
    }
  )
);

export default useWinnerStore;
