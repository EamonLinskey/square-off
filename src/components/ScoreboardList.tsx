import { useEffect, useState, forwardRef } from "react"
import gameService from "../services/GameService";
import socketService from "../services/SocketService";
import { Scoreboard, ScoreInfo } from "../types";
import FlipMove from "react-flip-move";

const dummyImage = "https://images.squarespace-cdn.com/content/v1/581ccadb414fb5bef66c2bcb/1615306891656-XO04TW6U3PGMNHE24M7D/Lawrence_Trent_%28ENG%292.jpg?format=500w"

export function ScoreboardList() {

    var [scoreboard, setScoreboard] = useState<Scoreboard>({})

    const handleScoreUpdate =()=> {
        gameService.onScoreUpdate(socketService.socket!, (scoreboard) => {
            console.log(scoreboard)
            setScoreboard(scoreboard)
        })
    }

    const handleGameEnd =()=> {
        gameService.onGameEnd(socketService.socket!, () => {
            scoreboard = {}
        })
    }

    useEffect( () => {
        handleScoreUpdate()
        handleGameEnd()
    }, [])

    return (
        <div id="scoreboard">
            <ol>
                {
                    Object.values(scoreboard).sort((a, b) => b.score - a.score).map(info => {
                        return(
                            <PlayerListItem score={info.score || 0} name={info.name} photoUrl = {info.photoUrl} key = {info.id} />
                        )
                    })
                }
            </ol>
        </div>
    )
}

function PlayerListItem(props: ScoreInfo) {

    return (
        <li className="player-list-item">
            <div className="pli-container">
                <div className="pli-left">
                    <img src={props.photoUrl} />
                    <div className="pli-stack">  
                        <div className = "pli-name">{props.name}</div>
                        <div className = "pli-history">✅ ❌ ✅ ✅ ❌ ❌ ✅ ❌</div>
                    </div>
                </div>
                <div className="pli-right score">{props.score}</div>
            </div>
        </li>
    )
}