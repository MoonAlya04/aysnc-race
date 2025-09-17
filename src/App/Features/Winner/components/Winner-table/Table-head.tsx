import React from 'react';
import { headValues } from '../../../../../common/lib/constants';

const TableHead = () => {
  return (
    <thead>
      <tr>
        {headValues.map((value, index) => (
          <th key={index} className="border border-solid border-[#ccc]">
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
