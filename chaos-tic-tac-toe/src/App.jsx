import { useState } from "react"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0 })

  const winnerPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  let winner = null

  winnerPatterns.forEach((pattern) => {
    const [a, b, c] = pattern

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a]
    }
  })

  function handleClick(index) {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = xTurn ? "X" : "O"

    setBoard(newBoard)

    setTimeout(() => {
      const filledIndexes = newBoard
        .map((cell, i) => (cell ? i : null))
        .filter((i) => i !== null)

      if (filledIndexes.length > 2) {
        const randomIndex =
          filledIndexes[Math.floor(Math.random() * filledIndexes.length)]

        newBoard[randomIndex] = null
        setBoard([...newBoard])
      }
    }, 1000)

    setXTurn(!xTurn)
  }

  function restartGame() {
    if (winner) {
      setScores((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }))
    }

    setBoard(Array(9).fill(null))
    setXTurn(true)
  }

  return (
    <div className="app-shell">
      <div className="cyber-panel">
        <div className="panel-header">
          <div className="title-block">
            <span className="subtitle">NEON ARENA</span>
            <h1>Chaos Tic Tac Toe</h1>
          </div>
          <div className={`status-pill ${winner ? "status-win" : ""}`}>
            {winner ? `${winner} Wins · SYSTEM LOCKED` : `${xTurn ? "X" : "O"} Turn`}
          </div>
        </div>

        <div className="score-grid">
          <div className="score-card">
            <span>PLAYER X</span>
            <strong>{scores.X}</strong>
          </div>
          <div className="score-card">
            <span>PLAYER O</span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <div className="board-shell">
          <div className="game-grid">
            {board.map((cell, index) => (
              <button
                key={index}
                type="button"
                className={`board-cell ${cell ? "filled" : ""}`}
                onClick={() => handleClick(index)}
                disabled={Boolean(board[index] || winner)}
                aria-label={`Cell ${index + 1} ${cell ? cell : "empty"}`}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>

        <div className="control-area">
          <button className="restart-button" type="button" onClick={restartGame}>
            Restart Game
          </button>
          <p className="game-note">
            The board pulses with neon energy. Every move can trigger chaos in the arena.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
