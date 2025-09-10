import Loading from "../../../../../common/components/Loading-indicator/Loading";
import useCars from "../../../../../App/Features/Garage/Hooks/Use-cars-hook";
import { WinnerWithCarId } from "../../../../../App/Features/Garage/Store/Use-winner-store";
import { useCallback } from "react";
import useWinnersTable from "../../Hooks/Use-winners-table.hook";
import Table from "./Table";
import { mergeAndSumWins } from "../../../../../common/lib/index";

export interface WinnerWithName extends WinnerWithCarId {
  carName: string;
  [key: string]: unknown;
}

function WinnerTable() {
  const { winners, loading, page, setPage, winnersCount } = useWinnersTable();
  const { cars } = useCars();
  const carName = useCallback((id: number) => cars.find(car => car.id === id)?.name, [cars]);

  const winnersWithCarName = mergeAndSumWins(
    winners.map(winner => ({
      ...winner,
      carName: carName(winner.carId) || ""
    }))
  );

  const isThereWinner = winnersWithCarName.length > 0;
  return (
    <div className="min-h-[400px] w-full flex items-center justify-center">
      {loading ? (
        <Loading size={60} />
      ) : isThereWinner ? (
        <Table page={page} setPage={setPage} winnersCount={winnersCount} winnersWithCarName={winnersWithCarName} />
      ) : (
        <EmptyTable />
      )}
    </div>
  );
}

const EmptyTable = () => <h1 className="text-[40px] text-gray-700 font-bold">No winners yet</h1>;

export default WinnerTable;
