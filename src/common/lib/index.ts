import { WinnerWithName } from '../../App/Features/Winner/components/Winner-table/Winner-table';

export function mergeAndSumWins(winners: WinnerWithName[]): WinnerWithName[] {
  const aggregatedCars = winners.reduce(
    (acc, car) => {
      if (car.carName) {
        if (acc[car.carName]) {
          acc[car.carName].wins += car.wins;
        } else {
          acc[car.carName] = { ...car };
        }
      }
      return acc;
    },
    {} as Record<string, WinnerWithName>,
  );

  return Object.values(aggregatedCars);
}
