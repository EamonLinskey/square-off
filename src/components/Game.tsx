import { useContext, useEffect, useState } from "react";
import gameService from "../services/GameService";
import socketService from "../services/SocketService"
import Board from "./Board"
import Controls from "./Controls"
import Prompt from "./Prompt";
import { MatchOptions, Player } from "../types";
import gameContext from "../gameContext";


export function Game() {

    var [timeLeft, setTimeLeft] = useState(0)
    var { isPlaying, setIsPlaying } = useContext(gameContext)
    var { prompt, setPrompt } = useContext(gameContext)
    var [gameDuration, setGameDuration] = useState(30)

    const handleTimeLeftUpdate =()=> {
        if (socketService.socket) {
            gameService.onTimeLeftUpdate(socketService.socket, (timeLeft) => {
              setTimeLeft(timeLeft)
            })
        }
    }

    const handlePromptUpdate =()=> {
      if (!socketService.socket) { return }
      gameService.onPromptUpdate(socketService.socket, (prompt) => {
        setPrompt(prompt)
      })
    }

    const startGame =()=> {
      const matchOptions: MatchOptions = {gameDuration, perspective: "white"}
      gameService.startGame(socketService.socket!, matchOptions)
    }

    const handleGameStart =()=> {
      gameService.onGameStart(socketService.socket!, () => setIsPlaying(true))
    }

    const handleGameEnd =()=> {
      gameService.onGameEnd(socketService.socket!, () => {setIsPlaying(false);})
      gameService.onGameWin(socketService.socket!, () => alert("you won"))
      gameService.onGameLoss(socketService.socket!, () => alert("you lost"))
    }
    
    const submitAnswer =(c: [number, number])=> {
      gameService.submitAnswer(socketService.socket!, [c[0], c[1]])
    }

    useEffect(() => {
        handleGameStart()
        handlePromptUpdate()
        handleTimeLeftUpdate()
        handleGameEnd()
    }, [])

    return (
        <div id = "container">
            <div id="game-container">
                <div id="game">
                    <Board onSubmitAnswer = {submitAnswer} perspective = "white" />
                    <Prompt />
                </div>
            </div>
            <Controls 
              timeLeft = {timeLeft}
              isPlaying = {isPlaying}
              onStartClicked = {() => startGame()} 
              gameDuration = {gameDuration}
              setGameDuration = {(gd) => setGameDuration(gd)}
            />
        </div>
    )
}