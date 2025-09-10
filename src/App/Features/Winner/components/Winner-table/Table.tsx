import React from "react";
import TableHead from "./Table-head";
import { WinnerWithName } from "./Winner-table";
import TableRow from "./Table-row";
import Pagination from "../../../../../common/components/Pagination/Pagination";

interface Props {
  winnersWithCarName: WinnerWithName[];
  page: number;
  setPage: (page: number) => void;
  winnersCount: number;
}
const Table = ({ page, setPage, winnersCount, winnersWithCarName }: Props) => {
  const pagesLength = Math.floor(winnersWithCarName.length / 10) + 1;

  return (
    <div>
      <table className="w-[600px] bg-white neon-border shadow-md rounded-lg overflow-hidden">
        <TableHead />
        <tbody>
          {winnersWithCarName.map(winner => (
            <TableRow key={`winner-${winner.id}`} winner={winner} carName={winner.carName} />
          ))}
        </tbody>
      </table>
      {pagesLength > 1 && <Pagination onPageChange={setPage} carsCount={winnersCount} page={page} pagesLength={pagesLength} />}
    </div>
  );
};

export default Table;
