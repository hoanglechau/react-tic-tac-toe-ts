import React from "react";

interface Props {
  history: {}[];
  undoMove: (i: number) => void;
}

function History({ history, undoMove }: Props) {
  return (
    <div className="history">
      <h4>Move History</h4>
      <ul>
        {/* map function: (element, index) */}
        {history.map((historyElement, historyIndex) => {
          const choice = historyIndex ? "Move " + historyIndex : "Move 0";
          return (
            <li key={historyIndex}>
              <button onClick={() => undoMove(historyIndex)}>{choice}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
