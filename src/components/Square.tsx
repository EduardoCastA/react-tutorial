interface Props {
  value: string | null;
  isWinner: boolean;
  onSquareClick: () => void;
}

export const Square = ({ value, isWinner, onSquareClick }: Props) => {
  return <button className={isWinner ? "highlight" : "square"} onClick={onSquareClick} >
    { value }
  </button>;
}