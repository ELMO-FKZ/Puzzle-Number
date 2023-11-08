import { useContext } from "react"
import { GameContext } from "../../contexts/GameContext"
import { FaPause, FaPlay, FaUndoAlt, FaStop } from "react-icons/fa"

function GameButtons() {

    const {player, startTime, pauseTime, resetGame, stopGame} = useContext(GameContext)

    return (
        <div className="controls">
            {!player.isTimeOn && <button aria-label="Play" className="control" onClick={() => startTime()} ><FaPlay /></button>}
            {player.isTimeOn && <button aria-label="Pause" className="control" onClick={() => pauseTime()} ><FaPause /></button>}
            <button aria-label="New Game" className="control" onClick={() => resetGame()} ><FaUndoAlt /></button>
            <button aria-label="Quit" className="control" onClick={() => stopGame()} ><FaStop /></button>
        </div>
    )
}

export default GameButtons