import React from "react";

interface Props {
  value: string;
  handleClick: () => void;
}

function Square({ value, handleClick }: Props) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
