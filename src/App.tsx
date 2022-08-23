import { useEffect, useState, useRef } from "react";
import "./App.css";
import socketService from "./services/SocketService";
import { JoinRoom } from "./components/JoinRoom";
import GameContext, { GameContextProps } from "./gameContext";
import { Game } from "./components/Game"
import { Login } from "./components/Login"
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Player, User, PlayerMap } from "./types"
import axios from "axios"
import gameService from "./services/GameService";

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [prompt, setPrompt] = useState<[number, number] | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const connectSocket = async () => {
    const socket = await socketService
      .connect("https://square-off-backend.herokuapp.com")
      //.connect("http://ancient-earth-60055.herokuapp.com")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
    axios.get("https://square-off-backend.herokuapp.com/getuser", {withCredentials: true}).then((res) => {
      if (res.data) {
        let user: User = {firstName: res.data.displayName, photoUrl: res.data.photos[0].value, id: Math.floor(Math.random() * 200).toString()}
        setUser(user)
      }
    }).catch((err) => console.log(err))
  }, []);

  const gameContextValue: GameContextProps = {
    isInRoom,
    setInRoom,
    isPlaying,
    setIsPlaying,
    prompt,
    setPrompt,
    user,
    setUser
  };

  return (
    <GameContext.Provider value={gameContextValue as GameContextProps}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login/" element = {<Login />} />
            <Route path="/play/" element ={<>{!isInRoom && <JoinRoom />} {isInRoom && <Game />}</>}/>
          </Routes>
        </Router>
      </div>
    </GameContext.Provider>
  );
}


export default App;
