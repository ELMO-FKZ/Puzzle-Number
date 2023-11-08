import { useContext } from "react"
import { GameContext } from "../../contexts/GameContext"
import "./winnerScore.css"

function WinnerScore() {

    const {player, currentRecord} = useContext(GameContext)
    const boardWidth = Math.sqrt(player.boardSize)

    return (
        <div className="winner">
            { player.isRecord 
            ?
            <div className="winner__msg">
                <p className="winner__msg-para">You have <span>successfully</span> completed the puzzle on the board <span>{boardWidth}&#215;{boardWidth}</span>, and set a <span>new record</span>!</p>
                <p className="winner__msg-para">Well done <span>{player.name}</span>! You completed the game in <span>{player.time} seconds</span>, with <span>{player.moves} moves</span>.</p> 
                <p className="winner__msg-para">Incredible achievement!</p>
            </div>
            :
            <div className="winner__msg">
                <p className="winner__msg-para">You have <span>successfully</span> completed the puzzle on the board <span>{boardWidth}&#215;{boardWidth}</span>. Although you <span>didn't break the record</span>.</p>
                <p className="winner__msg-para">The <span>current record</span> was set by <span>{currentRecord.name}</span> in <span>{currentRecord.time} seconds</span>, with <span>{currentRecord.moves} moves</span>.</p> 
                <p className="winner__msg-para">Great job on completing the game!</p>
            </div>
            }
        </div>
    )
}

export default WinnerScore