import { useState } from "react"
import confetti from "canvas-confetti"
import cruz from './recursos/cross-23.svg'
import circulo from './recursos/circulo.svg'


const TURNS = {
  X: <img src={cruz} alt="" />,
  O: <img src={circulo} alt="" />
}

const Square = ({ children, isSelected , updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () =>{
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b]&&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
        
      }
    }
    return null
  }

const resetGame = () =>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

const checkEndGame = (newBoard) =>{
  return newBoard.every((Square) => Square != null)
}


  const updateBoard = (index) =>{

    if (board[index] || winner ) return 

    const newBoard = [... board]

    newBoard[index] = turn

    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
   
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className="w-fit my-6 mx-auto [&>button]:py-2 [&>button]:px-3 [&>button]:my-6 [&>button]:mx-auto [&>button]:bg-transparent [&>button]:border-2 [&>button]:border-solid [&>button]:w-24 [&>button]:rounded-md [&>button]:duration-200 [&>button]:font-bold [&>button]:cursor-pointer [&>button]:border-black" >
      <h1 className="font-extrabold text-3xl flex justify-center">Ta-Te-Ti</h1>
      <button id="BOTON2" className="flex justify-center" onClick={resetGame}>Reiniciar</button>
      <section className="grid grid-cols-3 gap-3">
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                 {board[index]}
              </Square>
            )
          })
        }

      </section>

      <section className="flex justify-center my-4 mx-auto w-fit relative rounded-3xl [&>square]:w-16 [&>square]:h-16 pointer-events-none [&>Square]:border-transparent ">
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>


        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>

      </section>

      {

        winner != null &&(
          <section className=" absolute w-screen h-screen top-0 left-0 grid place-items-center bg-black bg-opacity-40 [&>square]:w-16 [&>square]:h-16 [&>square]:pointer-events-none [&>square]:border-transparent">
            <div className="text bg-cyan-200  h-72 w-80 rounded-xl flex flex-col justify-center items-center gap-5">
              <h2 className="font-bold   pt-5 text-2xl">
                {
                  winner === false
                  ? 'EMPATE'
                  : `GANO:`
                }
              </h2>

                <header className=" winner my-0 mx-auto w-fit border-2 border-solid border-white rounded-xl flex gap-4">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button id="BOTON" onClick={resetGame}>Volver a jugar!</button>
                </footer>



            </div>
          </section>
        )
      }


    </main>
    
  )
}

export default App
