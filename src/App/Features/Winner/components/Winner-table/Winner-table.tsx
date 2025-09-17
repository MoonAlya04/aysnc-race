import Loading from '../../../../../common/components/Loading-indicator/Loading';
import useCars from '../../../../../App/Features/Garage/Hooks/Use-cars-hook';
import { WinnerWithCarId } from '../../../../../App/Features/Garage/Store/Use-winner-store';
import { useCallback, useState } from 'react';
import useWinnersTable from '../../Hooks/Use-winners-table.hook';
import Table from './Table';
import { mergeAndSumWins } from '../../../../../common/lib/index';
import Pagination from '../../../../../common/components/Pagination/Pagination';

export interface WinnerWithName extends WinnerWithCarId {
  carName: string;
  [key: string]: unknown;
}

function WinnerTable() {
  const { winners, loading } = useWinnersTable();
  const { cars } = useCars();
  const [page, setPage] = useState(1); // ✅ added
  const winnersPerPage = 10; // or your API limit / hook value

  const getCarName = useCallback((id: number) => cars.find(car => car.id === id)?.name || '', [cars]);

  const winnersWithCarName = mergeAndSumWins(
    winners.map(winner => ({
      ...winner,
      carName: getCarName(winner.carId),
    })),
  );

  const totalWinners = winnersWithCarName.length; // ✅ added
  const pagesLength = Math.ceil(totalWinners / winnersPerPage); // ✅ added
  const isThereWinner = totalWinners > 0;

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center gap-4">
      {loading ? (
        <Loading size={60} />
      ) : isThereWinner ? (
        <Table
          winnersWithCarName={winnersWithCarName}
          page={page} // ✅ pass down if Table needs it
          setPage={setPage} // ✅ pass down if Table needs it
          winnersCount={totalWinners} // ✅ pass down if Table expects it
        />
      ) : (
        <EmptyTable />
      )}

      {isThereWinner && <Pagination onPageChange={setPage} carsCount={totalWinners} page={page} pagesLength={pagesLength} />}
    </div>
  );
}

const EmptyTable = () => <h1 className="text-[40px] text-gray-700 font-bold">No winners yet</h1>;

export default WinnerTable;
