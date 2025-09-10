import Button from "../../../../../common/components/Button/Buttons";

interface Props {
  time: string;
  name: string;
  onClose: () => void;
}
function WinnerModal({ name, time, onClose }: Props) {
  return (
    <div className="relative bg-white w-[400px] flex items-center justify-center rounded-2xl p-6 backdrop-blur-md shadow-neon border-4 border-neon-green">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-[40px] font-bold">WINNER</h1>
        <p className="text-[32px] font-semibold text-gray-700">{name}</p>
        <p>{time} sec</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

export default WinnerModal;
