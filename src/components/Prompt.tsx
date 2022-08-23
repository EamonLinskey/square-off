import { useContext, useEffect, useState } from "react"
import gameContext from "../gameContext"

function numberToLetter(c: number): string {
    const colNames = ["a", "b", "c", "d", "e", "f", "g", "h"]
    return colNames[c-1]
}

function squareToName(square: [number, number] | null): string {
    if (!square) {
        return ""
    }
    return numberToLetter(square[0]) + square[1]
}

function Prompt() {
    let [showing, setShowing] = useState(true)
    let {prompt} = useContext(gameContext)

    useEffect(() => {
        setShowing(true)
        setTimeout(() => {setShowing(false)}, 300)
    }, [prompt])

    return (
        <div 
            id = "prompt" 
            className = {showing ? "showing" : "hiding"}
        > {squareToName(prompt)} </div>
    )
}
    export default Prompt