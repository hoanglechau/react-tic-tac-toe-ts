import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState("");
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);

  // Declaring a Winner
  useEffect(() => {
    // Run calculateWinner on the most current squares. This function returns either the winner or null
    const newWinner = calculateWinner(history[history.length - 1].squares);
    if (newWinner) setWinner(newWinner);
  }, [history]); // this side effect will run every time there is a change to history

  // Function to check if a player has won.
  // If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  // Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares: string[]) => {
    // This array contains the values which determine that a player has won
    const lines = [
      [0, 1, 2], // 3 in a horizontal row
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // 3 in a vertical row
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // 3 in a diagonal row
      [2, 4, 6],
    ];
    for (const element of lines) {
      // Destructure the array element
      const [a, b, c] = element;
      // Check if all 3 squares contain the same value
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // returning the winner, either "X" or "O"
      }
    }
    return null;
  };

  // Handle player's move
  const handleClick = (i: number) => {
    // Create a shallow copy of the history array with the most current length
    const currentHistory = history.slice(0, stepNumber + 1);
    // Get the most current object at the end of the history array
    const currentBoard = currentHistory[currentHistory.length - 1];
    // Create a shallow copy of the squares array in the current object
    const newSquares = currentBoard.squares.slice();
    // This function will not work if there's already been a winner or the square already has a value
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    // Set the value of the square to be "X" or "O" depending on which player is next
    newSquares[i] = xIsNext ? "X" : "O";
    // Add the new squares array as an object to the history array
    setHistory((prevHistory) =>
      currentHistory.concat([
        {
          squares: newSquares,
        },
      ])
    );
    // Update step number to the new length of the history array
    setStepNumber((prevStepNumber) => currentHistory.length);
    // Let the next player plays
    setXIsNext((prevXIsNext) => !prevXIsNext);
  };

  // Allow players to undo moves
  const undoMove = (moveNumber: number) => {
    // Update step number to update the history array to the wanted move when the next player plays
    setStepNumber(moveNumber);
    // When the step number is even, player is "X". If it's odd, player is "O"
    setXIsNext(moveNumber % 2 === 0);
    // Reset the winner if the game was over before undoing moves
    if (winner) setWinner("");
  };

  // Restart game
  const handleRestart = () => {
    // Reset the history array
    setHistory([
      {
        squares: Array(9).fill(null),
      },
    ]);
    // Reset stepNumber
    setStepNumber(0);
    // Let X starts the new game
    setXIsNext(true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board
          squares={history[stepNumber].squares}
          handleClick={handleClick}
        />
        <History history={history} undoMove={undoMove} />
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
