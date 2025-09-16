import WinnerTable from "../Features/Winner/components/Winner-table/Winner-table";

export default function Winners() {
  return (
    <div className="min-h-screen w-full bg-green-300 p-4">
      <h1 className=" text-center text-[38px] text-green-800">WINNER</h1>
      <WinnerTable />
    </div>
  );
}
