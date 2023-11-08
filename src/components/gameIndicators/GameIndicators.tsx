import { useContext } from "react"
import { FaStopwatch, FaWalking } from "react-icons/fa"
import { GameContext } from "../../contexts/GameContext"
import "./gameIndicators.css"

function GameIndicators() {

    const {player} = useContext(GameContext)

    return (
        <div className="indicators">
            <div className="indicator indicator--left">
                <FaStopwatch />
                <div className="indicator-value">
                    <span>{("0" + Math.floor(player.time / 3600)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((player.time / 60) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor(player.time % 60)).slice(-2)}</span>
                </div>
            </div>
            <div className="indicator indicator--right">
                <span className="indicator-value">{player.moves}</span>
                <FaWalking />
            </div>
        </div>
    )
}

export default GameIndicators