import React from "react";
import IconButton from "../Button/Icon-Button.tsx";

interface Props {
  onPageChange: (page: number) => void;
  carsCount: number;
  page: number;
  pagesLength: number;
}

function Pagination({ onPageChange, carsCount, page, pagesLength }: Props) {
  const handlePrevClick = () => {
    const newPage = page - 1 < 1 ? 1 : page - 1;
    onPageChange(newPage);
  };

  const handleNextClick = () => {
    const newPage = page + 1 > pagesLength ? pagesLength : page + 1;
    onPageChange(newPage);
  };

  return (
    <div className="p-10">
      <div className="flex flex-row justify-center">
        <div className="p-4 space-x-6 flex flex-row items-center">
          <IconButton icon="prev" iconSize={24} onClick={handlePrevClick} />
          <div>
            <h1 className="text-lg font-semibold text-black">
              {page} / {pagesLength}
            </h1>
          </div>
          <IconButton icon="next" iconSize={24} onClick={handleNextClick} />
        </div>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <h1 className="text-xl font-bold text-black">{carsCount} cars in total</h1>
      </div>
    </div>
  );
}

export default Pagination;
