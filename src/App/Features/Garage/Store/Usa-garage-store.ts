import { EngineResponse } from '../../../../api/Slices/engine/entity';
import { EngineStatus } from '../../../../api/Slices/engine/types';
import { Car } from '../../../../api/Slices/garage/entity';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GarageStoreState {
  cars: Record<string, Car[]>;
  activePage: number;
  carsCount: number;
}

interface GarageStoreAction {
  setActivePage: (page: number) => void;
  setCars: (cars: Record<string, Car[]>) => void;
  removeCar: (id: number) => void;
  updateCar: ({ id, car }: { id: number; car: Partial<Car> }) => void;
  updateCarEngine: (params: { id: number; engine: EngineResponse }) => void;
  updateCarStatus: (params: { id: number; status: EngineStatus }) => void;
  resetCars: () => void;
  getCar: (id: number) => Car | undefined;
  setCarsCount: (count: number) => void;
  clearStorage: () => void;
}

const useGarageStore = create<GarageStoreState & GarageStoreAction>()(
  persist(
    (set, get, store) => ({
      carsCount: 1,
      activePage: 1,
      cars: { '1': [] },
      setCars(cars) {
        set(() => ({
          cars,
        }));
      },
      removeCar(id) {
        set(state => {
          const updatedCars = state.cars[state.activePage].filter(c => c.id !== id);
          const newCars = {
            ...state.cars,
            [state.activePage]: updatedCars,
          };
          const noCarsLeft = Object.values(newCars).every(arr => (arr as Car[]).length === 0);
          return {
            cars: noCarsLeft ? { '1': [] } : newCars,
            activePage: noCarsLeft ? 1 : state.activePage,
            carsCount: Math.max(0, state.carsCount - 1),
          };
        });
      },
      setCarsCount(count) {
        set(() => ({ carsCount: count }));
      },
      updateCar({ id, car }) {
        set(state => {
          return {
            cars: {
              ...state.cars,
              [state.activePage]: state.cars[state.activePage].map(c =>
                c.id === id
                  ? {
                      ...c,
                      ...car,
                    }
                  : c,
              ),
            },
          };
        });
      },

      updateCarEngine({ id, engine }) {
        set(state => ({
          cars: {
            ...state.cars,
            [state.activePage]: state.cars[state.activePage].map(c => (c.id === id ? { ...c, engine } : c)),
          },
        }));
      },
      updateCarStatus({ id, status }) {
        set(state => ({
          cars: {
            ...state.cars,
            [state.activePage]: state.cars[state.activePage].map(c =>
              c.id === id ? { ...c, engine: { ...(c.engine ?? { velocity: 0 }), status } } : c,
            ),
          },
        }));
      },

      resetCars() {
        set(state => ({
          cars: {
            ...state.cars,
            [state.activePage]: [],
          },
        }));
      },
      setActivePage(page) {
        set(() => ({ activePage: page }));
      },
      getCar(id) {
        return get().cars[get().activePage].find(car => car.id === id);
      },
      clearStorage() {
        if (store.persist && typeof store.persist.clearStorage === 'function') {
          store.persist.clearStorage();
        }
        set(() => ({
          cars: { '1': [] },
          activePage: 1,
          carsCount: 1,
        }));
      },
    }),
    {
      name: 'car-storage',
    },
  ),
);

export default useGarageStore;
