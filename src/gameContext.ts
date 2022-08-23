import React from "react";
import { PlayerMap, User } from "./types"

export interface GameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (started: boolean) => void
  prompt: [number, number] | null
  setPrompt: (prompt: [number, number] | null) => void
  user: User | null
  setUser: (user: User) => void
}

const defaultState: GameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  prompt: null,
  setPrompt: () => {},
  user: null,
  setUser: () => {}
};

export default React.createContext(defaultState);
