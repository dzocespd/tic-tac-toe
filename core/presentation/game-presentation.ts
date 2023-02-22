import {
  GameHistory,
  GameProgress,
  GameSignPlay,
  GameState,
  PLAYER,
} from "@/store/slices/game-slice";

export const WINNING_COMBINATIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export type GamePresentation = {
  isGameStarted: boolean;
  isGameDone: boolean;
  gameWinner: PLAYER | undefined | "DRAW";
  gameProgress: GameProgress;
  gameHistoryInputs: GameHistory;
};

export const buildGamePresentation = (state: GameState): GamePresentation => {
  return {
    isGameStarted: state.isGameStarted,
    isGameDone: state.isGameDone,
    gameWinner: state.gameWinner,
    gameProgress: state.gameProgress,
    gameHistoryInputs: state.gameHistoryInputs,
  };
};

export const checkForWinner = (playerInputs: number[]) => {
  let inputsMatch = 0;

  for (const combination of WINNING_COMBINATIONS) {
    inputsMatch = 0;

    playerInputs.forEach((number) => {
      if (combination.includes(number)) {
        inputsMatch += 1;
      }
    });

    if (inputsMatch === 3) {
      return true;
    }
  }

  return false;
};
