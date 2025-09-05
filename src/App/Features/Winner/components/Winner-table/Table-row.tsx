import { Winner } from "../../../../../api/Slices/winners/entity";
import React from "react";

interface Props {
  winner: Winner;
  carName: string;
}

const TableRow = ({ winner, carName }: Props) => {
  return (
    <tr className="text-center">
      <td className="border border-solid border-[#ccc]">{winner.id}</td>
      <td className="border border-solid border-[#ccc]">{carName}</td>
      <td className="border border-solid border-[#ccc]">{winner.wins}</td>
      <td className="border border-solid border-[#ccc]">{winner.time}</td>
    </tr>
  );
};

export default TableRow;
