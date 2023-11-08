// States

export type BoardSizeType = 9 | 16 | 25;

export type CurrentRecordType = {
    name: string;
    time: number;
    moves: number;
}

export type PlayerType = {
    name: string; 
    boardSize: BoardSizeType; 
    time: number; 
    moves: number; 
    isTimeOn: boolean; 
    isWinner: boolean; 
    isRecord: boolean
}

export type RecordType = {
    id: string;
    name: string;
    time: number;
    moves: number;
    boardSize: BoardSizeType;
}

export type TileType = {
    value: number;
    index: number;
}

export type ViewType = "homeView" | "gameView" | "winnerView";

// Props 

export type DefinedPlayerProps = {
    children: React.ReactNode;
}

export type GameContextProps = {
    tiles: TileType[];
    player: PlayerType;
    view: ViewType;
    currentRecord: CurrentRecordType;
    setTiles: (value: React.SetStateAction<TileType[]>) => void;
    setPlayer: (value: React.SetStateAction<PlayerType>) => void;
    setView: (value: React.SetStateAction<ViewType>) => void;
    moveTile: (tile: TileType) => void;
    resetGame: () => void;
    startTime: () => void;
    pauseTime: () => void;
    stopGame: () => void;
    playAgain: () => void;
}

export type GameContextProviderProps = {
    children: React.ReactNode;
}

export type GameTileProps = {
    tile: TileType; 
    moveTile: (tile: TileType) => void;
    boardSize: BoardSizeType;
}

export type MessageBannerProps = {
    message: "Welcome" | "Congratulations";
}

export type WinnerPlayerProps = {
    children: React.ReactNode;
}