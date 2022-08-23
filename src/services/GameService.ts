import { SocketConnectOpts } from "net";
import { Socket } from "socket.io-client";
import { MatchOptions, Player, Scoreboard } from "../types"
import SocketService from "./SocketService";
import { User, PlayerMap } from "../types"

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string, user: User): Promise<boolean> {
    return new Promise((rs, rj) => {
      console.log(user)
      alert("a")
      socket.emit("join_game", { roomId , firstName: "jimmy", photoUrl: "afd" });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }
  
  public async startGame(socket: Socket, options: MatchOptions) {
    socket.emit("start_game", options)
  }
  
  public async onTimeLeftUpdate(socket: Socket, listener: (timeLeft: number) => void) {
    socket.on("time_left", ({timeLeft}) => { listener(timeLeft) })
  }
  
  public async onGameStart(socket: Socket, listener: () => void) {
    socket.on("game_has_started", listener)
  }
  
  public async onPlayerJoin(socket: Socket, listener: (players: PlayerMap) => void) {
    socket.on("player_has_joined", ({players_map}) => listener(players_map))
  }

  public async requestCompletePlayerMap(socket: Socket, listener: (players: PlayerMap) => void) {
    socket.emit("needs_complete_player_map")
    socket.on("complete_player_map", ({players_map}) => listener(players_map))
  }
  
  public async onPromptUpdate(socket: Socket, listener: (prompt: [number, number]) => void) {
    socket.on("new_prompt", ({prompt}) => listener(prompt))
  }
  
  public async submitAnswer(socket: Socket, answer: [number, number]) {
    socket.emit("answer_submission", {answer})
  }
  
  public async sendMouseMove(socket: Socket, position: [number, number]) {
    socket.emit("mouse_move", {position})
  }
  
  public async onMouseMove(socket: Socket, listener: (players: PlayerMap) => void) {
    socket.on("updated_player_positions", ({players_map}) => listener(players_map))
  }
  
  public async onGameEnd(socket: Socket, listener: () => void) {
    socket.on("game_end", () => listener())
  }

  public async onGameWin(socket: Socket, listener: ()=> void) {
    socket.on("you won", () => listener())
  }

  public async onGameLoss(socket: Socket, listener: ()=> void) {
    socket.on("you lost", () => listener())
  }
  
  public async onScoreUpdate(socket: Socket, listener: (scoreboard: any) => void) {
    socket.on("updated_score", ({scoreboard}) => listener(scoreboard))
  }
  
}

export default new GameService();
