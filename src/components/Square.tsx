import {useContext, useState} from "react"
import {SquareProps, SelectionGrade } from "../types"
import gameContext from "../gameContext"

function numberToLetter(c: number): string {
    const colNames = ["a", "b", "c", "d", "e", "f", "g", "h"]
    return colNames[c-1]
}

function Square(props: SquareProps) {
    let [grade, setGrade] = useState<SelectionGrade | null>(null)
    let {isPlaying} = useContext(gameContext)

    return (
        <button 
            className = "square" 
            data-grade = {grade} 
            onClick = {() => {
                if (!isPlaying) { return }
                let grade: SelectionGrade = props.prompt?.toString() === [props.col, props.row].toString() ? "correct" : "incorrect"
                props.onSubmitAnswer([props.col, props.row]);
                setGrade(grade)
                setTimeout(() => {setGrade(null)}, 250)
            }}>
            <div className = "row-label">{props.row}</div>
            <div className = "col-label">{numberToLetter(props.col)}</div>
        </button>
    )
}

export { Square }