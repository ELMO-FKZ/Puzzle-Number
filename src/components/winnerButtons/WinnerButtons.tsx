import { useContext } from "react"
import { FaUndoAlt, FaStop } from "react-icons/fa"
import { GameContext } from "../../contexts/GameContext"

function WinnerButtons() {

    const {playAgain, stopGame} = useContext(GameContext)

    return (
        <div className="controls">
            <button aria-label="New Game" className="control" onClick={() => playAgain()} ><FaUndoAlt /></button>
            <button aria-label="Quit" className="control" onClick={() => stopGame()} ><FaStop /></button>
        </div>
    )
}

export default WinnerButtons