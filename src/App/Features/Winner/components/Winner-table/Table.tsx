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

const Table = ({ winnersCount, winnersWithCarName }: Props) => {
  const pagesLength = Math.ceil(winnersCount / 7);

  return (
    <div>
      <table className="w-[600px] bg-white neon-border shadow-md rounded-lg overflow-hidden">
        <TableHead />
        <tbody>
          {winnersWithCarName.map((winner, index) => (
            <TableRow key={`winner-${winner.id}-${index}`} winner={winner} carName={winner.carName} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
