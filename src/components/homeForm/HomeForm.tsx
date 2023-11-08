import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import { GameContext } from "../../contexts/GameContext"
import { generateTiles } from "../../utils/generateTiles"
import "./homeForm.css"

function HomeForm() {

    const {player, setPlayer, setTiles, setView} = useContext(GameContext)
    const navigate = useNavigate()

    const radioItems = [
        {id: 1, boardSize: 9},
        {id: 2, boardSize: 16},
        {id: 3, boardSize: 25}
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        const parsedValue = name === 'boardSize' ? parseInt(value) : value
        setPlayer(prev => ({...prev, [name]: parsedValue}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTiles(generateTiles(player.boardSize))
        setView("gameView")
        navigate("/game")
    }

    return (
        <form className="home__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="home__form-division" >
                <div className="home__form-section">
                    <label className="home__form-label" htmlFor="player-name">Player name</label>
                    <input className="home__form-input" type="text" id="player-name" name="name" value={player.name} onChange={(e) => handleChange(e)} autoComplete="off" required/>
                </div>
                <div className="home__form-section">
                    <span className="home__form-label">Board size</span>
                    {
                        radioItems.map(radioItem => {
                            return (
                            <div key={radioItem.id} className="home__form-radios">
                                <input className="home__form-radio" type="radio" id={`board-${radioItem.boardSize}`} name="boardSize" value={radioItem.boardSize} checked={player.boardSize == radioItem.boardSize} onChange={(e) => handleChange(e)} required/>
                                <label htmlFor={`board-${radioItem.boardSize}`} >{radioItem.boardSize}</label>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="home__form-section">
                    <span className="home__form-label">Instructions</span>
                    <p>The goal of the puzzle is to arrange the tiles in numerical order, from left to right and top to bottom.</p>
                </div>
            </div>
            <div className="controls">
                <button type="submit" name="next" className="control" aria-label="Next" ><FaArrowRight /></button>
            </div>
        </form>
    )
}

export default HomeForm