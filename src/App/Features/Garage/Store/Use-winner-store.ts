import { Winner } from '../../../../api/Slices/winners/entity';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RaceType = 'single' | 'multi';

export interface WinnerWithCarId extends Winner {
  carId: number;
}

interface WinnerStore {
  winners: WinnerWithCarId[];
  activePage: number;
  raceWinnerId: number | null;
  raceType: RaceType | null;
  winnersCount: number;
  raceInProgress: boolean;

  // ✅ NEW
  carPositions: Record<number, number>; // carId → current position
}

interface WinnerStoreAction {
  setActivePage: (page: number) => void;
  setWinners: (winners: WinnerWithCarId[]) => void;
  setRaceWinnerId: (id: number | null) => void;
  setRaceType: (raceType: RaceType | null) => void;
  updateWinner: (id: number, winner: Partial<Winner>) => void;
  createWinner: (winner: WinnerWithCarId) => void;
  getWinner: (id: number) => WinnerWithCarId | undefined;
  setRaceInProgress: (inProgress: boolean) => void;

  // ✅ NEW
  setCarPosition: (carId: number, position: number) => void;
  resetCarPositions: () => void;
}

const useWinnerStore = create<WinnerStore & WinnerStoreAction>()(
  persist<WinnerStore & WinnerStoreAction>(
    (set, get) => ({
      winners: [] as WinnerWithCarId[],
      winnersCount: 0,
      activePage: 1,
      raceInProgress: false,
      raceWinnerId: null,
      raceType: null,

      // ✅ NEW default
      carPositions: {},

      setWinners(winners) {
        set(() => ({
          winners: Array.isArray(winners) ? winners : [],
          winnersCount: Array.isArray(winners) ? winners.length : 0,
        }));
      },

      updateWinner(id, winner) {
        set(state => ({
          winners: state.winners.map(w => (w.id === id ? { ...w, ...winner } : w)),
        }));
      },

      createWinner(winner) {
        set(state => {
          const exists = state.winners.some(w => w.carId === winner.carId);
          if (exists) return state;
          return {
            winners: [...state.winners, winner],
            winnersCount: state.winnersCount + 1,
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

      setRaceInProgress(inProgress) {
        set(() => ({ raceInProgress: inProgress }));
      },

      getWinner(carId) {
        const winners = get().winners;
        if (!Array.isArray(winners)) return undefined;
        return winners.find(w => w.carId === carId);
      },

      // ✅ NEW actions
      setCarPosition(carId, position) {
        set(state => ({
          carPositions: { ...state.carPositions, [carId]: position },
        }));
      },

      resetCarPositions() {
        set(() => ({ carPositions: {} }));
      },
    }),
    {
      name: 'winner-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          state.winners = Array.isArray(state.winners) ? state.winners : [];
          state.winnersCount = Array.isArray(state.winners) ? state.winners.length : 0;

          if (typeof state.carPositions !== 'object' || state.carPositions === null) {
            state.carPositions = {};
          }
        }
      },
    },
  ),
);

export default useWinnerStore;
