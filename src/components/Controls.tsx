import { useContext } from "react"
import gameContext from "../gameContext"
import { ControlsProps } from "../types"
import { ScoreboardList } from "./ScoreboardList"


function squareToName(square: [number, number] | null): string {
    if (!square) {
        return ""
    }
    return numberToLetter(square[0]) + square[1]
}

function numberToLetter(c: number): string {
    const colNames = ["a", "b", "c", "d", "e", "f", "g", "h"]
    return colNames[c-1]
}

function Controls(props: ControlsProps) {
    
    var { prompt, setPrompt } = useContext(gameContext)

    return (
        <div className='sidebar'>
        <h1 id="sidebar-header">Square Off!</h1>
        <div id="sidebar-content" data-controls-hidden = {props.isPlaying}>
          <div id="game-fact-container" data-display-none = {!props.isPlaying}>
            <div id="timer">{props.timeLeft}</div>
            <div id="task-description">Find {squareToName(prompt)}</div>
            {<ScoreboardList />}
          </div>
          <div data-display-none = {props.isPlaying} > 
          </div>
        </div>
        <div id="controls-container" data-display-none = {props.isPlaying}>
          <div id="controls-inner-container">
            <div >Round Length: {props.gameDuration}</div>
            <input 
              type="range"
              min="10" max="60"
              className="slider"
              id="myRange"
              value = {props.gameDuration} 
              step="5"
              onChange = {(e) => props.setGameDuration(Number(e.target.value))}
            />

            <div>Perspective:</div>
            <input 
              type="checkbox"
              name = "perspective"
              checked = {true}
              id="perspective"
            />
            <label htmlFor="perspective" data-display-none = {props.isPlaying}>View as black</label>
            <div id="button-background-3d">
              <button 
                id="start"
                className = "fun-orange-button"
                onClick = {() => props.onStartClicked()}
              >Start!</button>
            </div>
          </div>
        </div>
      </div>
    )
}
    export default Controls