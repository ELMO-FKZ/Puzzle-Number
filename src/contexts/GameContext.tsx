import { useState, useEffect, createContext, useMemo } from "react"
import { db } from "../firebase-config"
import { updateDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { generateTiles } from "../utils/generateTiles"
import { GameContextProps, PlayerType, TileType, ViewType, GameContextProviderProps, RecordType, CurrentRecordType } from "../@types/types"
import useRecords from "../hooks/useRecords"

export const GameContext = createContext<GameContextProps>({
    tiles: [],
    player: {name: "", boardSize: 16, time: 0, moves: 0, isTimeOn: false, isWinner: false, isRecord: false},
    view: "homeView",
    currentRecord: {name: "", time: 0, moves: 0},
    setTiles: () => {},
    setPlayer: () => {},
    setView: () => {},
    moveTile: () => {},
    resetGame: () => {},
    startTime: () => {},
    pauseTime: () => {},
    stopGame: () => {},
    playAgain: () => {},
})

export const GameContextProvider = ({children}: GameContextProviderProps) => {


    const [player, setPlayer] = useState<PlayerType>({name: "", boardSize: 16, time: 0, moves: 0, isTimeOn: false, isWinner: false, isRecord: false})
    const [tiles, setTiles] = useState<TileType[]>(generateTiles(player.boardSize))
    const [view, setView] = useState<ViewType>("homeView")
    const [currentRecord, setCurrentRecord] = useState<CurrentRecordType>({name: "", time: 0, moves: 0})
    const {records} = useRecords()
    const navigate = useNavigate()

    useEffect(() => {
        const checkWin = async () => {
            const isWinner = [...tiles].every((tile: TileType) => tile.value === tile.index + 1)
            if (isWinner) {
                const boardRecord = records.find((record: RecordType) => record.boardSize === player.boardSize) as RecordType;
                if (player.time < boardRecord.time || (player.time === boardRecord.time && player.moves < boardRecord.moves)) {
                    const newBoardrecord = {name: player.name, time: player.time, moves: player.moves}
                    await updateDoc(doc(db, "record-holders", boardRecord?.id), newBoardrecord)
                    setPlayer(prev => ({...prev, isTimeOn: false, isWinner: true, isRecord: true}))
                    setCurrentRecord({name: player.name, time: player.time, moves: player.moves})
                } else {
                    setPlayer(prev => ({...prev, isTimeOn: false, isWinner: true}))
                    setCurrentRecord({name: boardRecord.name, time: boardRecord.time, moves: boardRecord.moves})
                }
                setView("winnerView")
                navigate("/winner")
            }
        }
        checkWin()
    }, [tiles])

    const moveTile = (tile: TileType) => {
        // Returning when clicking on the empty tile :
        const emptyTileIndex = tiles.find(tile => tile.value === player.boardSize)?.index as number;
        if (tile.index === emptyTileIndex) {
            return
        }
        // Returning when clicking on unlinked tiles to the empty one : 
        const linkedTileIndexes = [emptyTileIndex - 1, emptyTileIndex + 1, emptyTileIndex - Math.sqrt(player.boardSize), emptyTileIndex + Math.sqrt(player.boardSize)]
        if (!linkedTileIndexes.includes(tile.index)) {
            return
        } else if (emptyTileIndex % Math.sqrt(player.boardSize) === Math.sqrt(player.boardSize) - 1 && tile.index === emptyTileIndex + 1) {
            return
        } else if (emptyTileIndex % Math.sqrt(player.boardSize) === 0 && tile.index === emptyTileIndex - 1) {
            return
        }
        // Updating the board when clicking on linked tiles to the empty one :
        const newTiles = [...tiles].map(oldTile => {
            if (oldTile.index !== emptyTileIndex && oldTile.index !== tile.index) {
                return oldTile
            }
            else if (oldTile.value === player.boardSize) {
                return {value: tile.value, index : emptyTileIndex}
            }
            return {value: player.boardSize, index: tile.index}
        })
        setTiles(newTiles)
        setPlayer(prev => ({...prev, moves: prev.moves + 1, isTimeOn: true }))
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const emptyTileIndex = tiles.find((tile: TileType) => tile.value === player.boardSize)?.index as number;
        if (e.key === "ArrowLeft" && !(emptyTileIndex % Math.sqrt(player.boardSize) === Math.sqrt(player.boardSize) - 1)) {
            moveTile(tiles.find((tile: TileType) => tile.index === emptyTileIndex + 1)!)
        } else if (e.key === "ArrowUp" && !(emptyTileIndex > player.boardSize - 1 - Math.sqrt(player.boardSize))) {
            moveTile(tiles.find((tile: TileType) => tile.index === emptyTileIndex + Math.sqrt(player.boardSize))!)
        } else if (e.key === "ArrowRight" && !(emptyTileIndex % Math.sqrt(player.boardSize) === 0)) {
            moveTile(tiles.find((tile: TileType) => tile.index === emptyTileIndex - 1)!)
        } else if (e.key === "ArrowDown" && !(emptyTileIndex < Math.sqrt(player.boardSize))) {
            moveTile(tiles.find((tile: TileType) => tile.index === emptyTileIndex - Math.sqrt(player.boardSize))!)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown',handleKeyDown)
        return () => {document.removeEventListener('keydown',handleKeyDown)}
    })

    const stopGame = () => {
        setPlayer({name: "", boardSize: 16, time: 0, moves: 0, isTimeOn: false , isWinner: false, isRecord: false})
        setView("homeView")
        navigate("/")
    }

    const startTime = () => {
        setPlayer(prev => ({...prev, isTimeOn: true}))
    };
    
    const pauseTime = () => {
        setPlayer(prev => ({...prev, isTimeOn: false}))
    };
    
    const resetGame = () => {
        setPlayer(prev => ({...prev, time: 0, moves: 0, isTimeOn: false}))
        setTiles(generateTiles(player.boardSize))
    };

    const playAgain = () => {
        setPlayer(prev => ({...prev, time: 0, moves: 0, isTimeOn: false, isWinner: false, isRecord: false}))
        setTiles(generateTiles(player.boardSize))
        setView("gameView")
        navigate("/game")
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (player.isTimeOn) {
            interval = setInterval(() => {
                setPlayer(prev => ({...prev, time: prev.time + 1}))
            }, 1000)
        } else {
            interval && clearInterval(interval);
        }
        return () => clearInterval(interval as NodeJS.Timeout)
    }, [player.isTimeOn]);


    const contextValues = useMemo(() => {
        return { 
            tiles, 
            player,
            view,
            currentRecord,
            setTiles,
            setPlayer,
            setView,
            moveTile,
            resetGame,
            startTime,
            pauseTime,
            stopGame,
            playAgain
        }
    }, [player, tiles, view, currentRecord])

    return (
        <GameContext.Provider value={contextValues}>
            {children}
        </GameContext.Provider>
    )
}