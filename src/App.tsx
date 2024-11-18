import React, { useState } from "react";

type Player = "X" | "O" | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>(null);

  // 勝利パターン
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 勝者チェック
  const checkWinner = (board: Player[]): Player | null => {
    for (let pattern of winPattern) {
      const [a, b, c] = pattern;
      console.log(pattern);
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(board[a]);
        return board[a];
      }
    }
    return null;
  };

  // セルをクリックしたときの処理
  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    console.log(newBoard[index]);
    setBoard(newBoard);

    // 勝敗の処理と勝者がいなければターンの切り替えを行う
    const detectedWinner = checkWinner(newBoard);
    console.log(detectedWinner);
    if (detectedWinner) {
      setWinner(detectedWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  // ゲームリセット
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + TypeScript Tic Tac Toe</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              cursor: "pointer",
              backgroundColor: cell ? "#f0f0f0" : "#fff",
            }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div>
          <h2>{winner} wins!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      {!winner && board.every((cell) => cell) && (
        <div>
          <h2>It's a draw!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
