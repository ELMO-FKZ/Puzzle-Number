import { useContext } from "react"
import { GameContext } from "../../contexts/GameContext"
import GameTile from "../gameTile/GameTile"
import "./gameBoard.css"

function GameBoard() {

    const {tiles, player, moveTile} = useContext(GameContext)

    const variableBoardStyle = {
        gridTemplateColumns: `repeat(${Math.sqrt(player.boardSize)}, 1fr)`,
        gridTemplateRows: `repeat(${Math.sqrt(player.boardSize)}, 1fr)`
    }

    return (
        <div className="board" style={variableBoardStyle}>
            {tiles.map(tile => (<GameTile key={tile.index} tile={tile} moveTile={moveTile} boardSize={player.boardSize} />))}
        </div>
    )
}

export default GameBoard