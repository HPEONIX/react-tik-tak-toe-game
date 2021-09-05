import React from "react";
import Cell from "./cell";

const Row = ({ row, onRowClick, id }) => {
  const handleCellClick = (y) => {
    onRowClick(id, y);
  };
  return (
    <>
      {row.map((value, idx) => (
        <Cell onCellClick={handleCellClick} key={idx} id={idx} value={value} />
      ))}
    </>
  );
};

export default Row;
