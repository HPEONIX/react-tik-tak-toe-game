import React from "react";
import Row from "./row";

const Board = ({board,resolution,handleBoxClick}) => {
  return (
    <div className="board glass" style={{ width: resolution, height: resolution }}>
      {board.map((row, idx) => (
        <Row onRowClick={handleBoxClick} key={idx} id={idx} row={row} />
      ))}
    </div>
  );
};

export default Board;
