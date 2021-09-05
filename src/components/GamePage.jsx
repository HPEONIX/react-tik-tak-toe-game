import React from "react";
import "./gamePage.css";
import Board from "./board";
import Overlay from "./overlay";

import { useState, useEffect, useRef } from "react";

const GamePage = () => {
  const INIT_BOARD_STATE = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const [overlayMessage, setOverlayMessage] = useState("Ongoing");

  const [board, setBoard] = useState([...INIT_BOARD_STATE]);

  const [gameState, setGameState] = useState(0);

  const [player, setPlayer] = useState(1);

  const [resolution, setResolution] = useState(
    Math.min(window.innerWidth, window.innerHeight) * 0.95
  );

  const parentDiv = useRef(null);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const newRes = Math.min(window.innerWidth, window.innerHeight) * 0.95;
    setResolution(newRes);
    document
      .querySelector(":root")
      .style.setProperty("--O-radius", `${newRes / 30}px`);
    console.log("mounted");
  };

  const checkIfWin = (newBoard, x, y) => {
    //win check
    //straight check
    if (
      newBoard[x].every((item) => item === player) ||
      newBoard.every((item) => item[y] === player)
    ) {
      console.log(player, " wins");
      setOverlayMessage(`Player ${player} wins`);
      setGameState(1);
      return;
    }
    //diagonal check
    if (x === y || x === newBoard.length - 1 - y) {
      let digonal = [];
      let offdiagonal = [];
      for (let row = 0; row < newBoard.length; row++) {
        const item = newBoard[row][row];
        digonal.push(item);
        const offitem = newBoard[row][newBoard.length - 1 - row];
        offdiagonal.push(offitem);
      }
      if (
        (digonal.length > 0 && digonal.every((item) => item === player)) ||
        (offdiagonal.length > 0 && offdiagonal.every((item) => item === player))
      ) {
        console.log(player, " wins");
        setOverlayMessage(`Player ${player} wins`);
        setGameState(1);
        return;
      }
    }

    //draw check
    if (
      newBoard.every((column) => column.every((cell) => cell !== 0) === true)
    ) {
      console.log("draw");
      setOverlayMessage(`Draw Game`);
      setGameState(1);
      return;
    }
  };

  const handleBoxClick = (x, y) => {
    console.log(player, " clicked ", x, y);
    if (gameState === 1) return;
    const newBoard = [...board];
    if (newBoard[x][y] !== 0 || gameState === 1) return;
    newBoard[x][y] = player;
    checkIfWin(newBoard, x, y);
    setBoard(newBoard);
    setPlayer((player % 2) + 1);
  };

  const handleGameReset = () => {
    setBoard([...INIT_BOARD_STATE]);
    setPlayer(1);
    setGameState(0);
    setOverlayMessage("Ongoing");
    //console.log(board,player,gameState)
  };

  return (
    <div className="borad-container" ref={parentDiv}>
      {gameState !== 0 ? (
        <Overlay message={overlayMessage} onReset={handleGameReset} />
      ) : (
        ""
      )}
      <Board
        board={board}
        handleBoxClick={handleBoxClick}
        resolution={resolution}
      />
    </div>
  );
};

export default GamePage;
