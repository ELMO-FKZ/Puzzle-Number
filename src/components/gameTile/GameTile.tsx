import { memo } from "react"
import { GameTileProps } from "../../@types/types"
import "./gameTile.css"

const GameTile = memo(function GameTile({tile, moveTile, boardSize}: GameTileProps) {

    return (
        <div className={`tile ${tile.value === boardSize ? "title--disabled" : ""} ${tile.value !== boardSize && tile.value === tile.index + 1 ? "tile--correct" : ""}`} onClick={() => moveTile(tile)}>
            {tile.value !== boardSize && tile.value}
        </div>
    )
})

export default GameTile