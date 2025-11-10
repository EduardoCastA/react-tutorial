import { Square } from "./Square";

interface Props {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
}

const rows = [0, 1, 2];
const cols = [0, 1, 2];

export const Board = ({ xIsNext, squares, onPlay }: Props) => {
  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && !squares.some(value => value === null);

  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = isDraw ? 'Juego terminado (Empate)' : 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{ status }</div>
      {rows.map((row) => (
        <div key={row} className="board-row">
          {cols.map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function calculateWinner(squares: Array<(string | null)>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}