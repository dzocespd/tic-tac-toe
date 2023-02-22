import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PLAYER {
  PLAYER_ONE = "PLAYER_ONE",
  PLAYER_TWO = "PLAYER_TWO",
}

export type GameSignPlay = "X" | "O";
export type GameHistory = {
  [key: number]: GameSignPlay;
};
export type GameProgress = {
  playerTurn: PLAYER | null;
  [PLAYER.PLAYER_ONE]: number[];
  [PLAYER.PLAYER_TWO]: number[];
};
// Define a type for the slice state
export interface GameState {
  isGameStarted: boolean;
  isGameDone: boolean;
  gameWinner: PLAYER | undefined | "DRAW";
  gameProgress: GameProgress;
  gameHistoryInputs: GameHistory;
}

export const buildInitialState = (): GameState => ({
  isGameStarted: false,
  isGameDone: false,
  gameWinner: undefined,
  gameProgress: {
    playerTurn: null,
    PLAYER_ONE: [],
    PLAYER_TWO: [],
  },
  gameHistoryInputs: {},
});

export const gameSlice = createSlice({
  name: "game",
  initialState: buildInitialState(),
  reducers: {
    start: (state) => {
      state.isGameStarted = true;
      state.gameProgress.playerTurn = PLAYER.PLAYER_ONE;
    },
    playerInput: (
      state,
      { payload }: PayloadAction<{ playerInput: number }>
    ) => {
      const playerTurn = state.gameProgress.playerTurn;
      state.gameHistoryInputs[payload.playerInput] =
        playerTurn === PLAYER.PLAYER_ONE ? "X" : "O";

      const isPlayerOneLastPlayed = playerTurn === PLAYER.PLAYER_ONE;
      state.gameProgress.playerTurn = isPlayerOneLastPlayed
        ? PLAYER.PLAYER_TWO
        : PLAYER.PLAYER_ONE;
      state.gameProgress[playerTurn!].push(payload.playerInput);
    },
    winnerChanged: (state, { payload }: PayloadAction<{ player: PLAYER }>) => {
      state.gameWinner = payload.player;
      state.isGameDone = true;
    },
    gameFinishedDraw: (state) => {
      state.gameWinner = "DRAW";
      state.isGameDone = true;
    },
    reset: (state) => {
      state.isGameStarted = true;
      state.isGameDone = false;
      state.gameWinner = undefined;
      state.gameProgress = {
        playerTurn: PLAYER.PLAYER_ONE,
        PLAYER_ONE: [],
        PLAYER_TWO: [],
      };
      state.gameHistoryInputs = {};
    },
  },
});

export const { start, playerInput, winnerChanged, reset, gameFinishedDraw } =
  gameSlice.actions;

export default gameSlice.reducer;
