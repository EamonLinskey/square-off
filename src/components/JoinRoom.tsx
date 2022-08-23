import React, { useContext, useState } from "react";
import gameContext from "../gameContext";
import gameService from "../services/GameService";
import socketService from "../services/SocketService";


export function JoinRoom() {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);
  var { user } = useContext(gameContext)

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName, user!)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form className = "login account-panel" onSubmit = {joinRoom}>
      <h1 className = "banner-header">Welcome</h1>
      <h2>Join a room</h2>
        <input 
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <div id="button-background-3d">
          <button 
            type = "submit"
            id = "login"
            className = "fun-orange-button"
            disabled = {isJoining}
          >Join!</button>
        </div>
      </form>
  );
}