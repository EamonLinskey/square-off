type Side = "white" | "black"
type SelectionGrade = "correct" | "incorrect" | "missed"

interface Scoreboard {
    [id: string]: ScoreInfo
}

interface ScoreInfo {
    name?: string
    photoUrl?: string
    id?: string
    score: number
}

interface SquareProps {
    row: number
    col: number
    onSubmitAnswer: (c: [number, number]) => void
    prompt: [number, number] | null
}

interface BoardProps {
    onSubmitAnswer: (c: [number, number]) => void
    perspective: Side
}


interface ControlsProps {
    timeLeft: number
    onStartClicked: () => void
    isPlaying: boolean
    gameDuration: number,
    setGameDuration: (newDuration: number) => void
}

interface MatchOptions {
    gameDuration: number,
    perspective: Side
}

interface Player {
    id: string
    x: number
    y: number
    firstName?: string,
    photoUrl?: string
}

interface PlayerMap {
    [id: string]: Player
}

interface User {
    id: string
    firstName: string
    photoUrl: string
}

export type { 
    Side, 
    SelectionGrade,
    SquareProps,
    BoardProps, 
    ControlsProps, 
    MatchOptions, 
    Player,
    User,
    PlayerMap,
    Scoreboard, 
    ScoreInfo
}