import Button from "../button/Button.tsx";

function RaceControlPanel() {
  return (
    <div className="flex flex-row py-4 items-center px-16">
      <div className="flex flex-row space-x-6">
        <Button icon="start-race">Start Race</Button>
        <Button icon="reset">Reset</Button>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <Button icon="random">Generate Cars</Button>
      </div>
    </div>
  );
}

export default RaceControlPanel;
