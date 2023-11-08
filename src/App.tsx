import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { GameContext } from "./contexts/GameContext"
import { DefinedPlayerProps, WinnerPlayerProps } from "./@types/types"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import Game from "./pages/game/Game"
import Winner from "./pages/winner/Winner"

function App() {

  const {view} = useContext(GameContext)

  const DefinedPlayer = ({children}: DefinedPlayerProps) => {
    return view === "gameView" ? children : <Navigate to="/" />
  }
  
  const WinnerPlayer = ({children}: WinnerPlayerProps) => {
    return view === "winnerView" ? children : <Navigate to="/" />
  }

  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="game" element={<DefinedPlayer><Game /></DefinedPlayer>} />
          <Route path="winner" element={<WinnerPlayer><Winner /></WinnerPlayer>} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
  )
}

export default App
