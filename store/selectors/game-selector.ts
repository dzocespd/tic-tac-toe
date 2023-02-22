import { buildGamePresentation } from "@/core/presentation/game-presentation";
import { GameSignPlay } from "../slices/game-slice";
import { RootState } from "../store";

export const selectIsGameStarted = ({ gameReducer }: RootState) =>
  buildGamePresentation(gameReducer).isGameStarted;

export const selectPlayerTurn = ({ gameReducer }: RootState) =>
  buildGamePresentation(gameReducer).gameProgress.playerTurn;

export const selectIsGameDone = ({ gameReducer }: RootState) =>
  buildGamePresentation(gameReducer).isGameDone;

export const selectGameWinner = ({ gameReducer }: RootState) =>
  buildGamePresentation(gameReducer).gameWinner;

export const selectGameHistory = ({ gameReducer }: RootState) =>
  buildGamePresentation(gameReducer).gameHistoryInputs;

export const selectLastCharSign = (
  playerInput: number,
  { gameReducer }: RootState
): GameSignPlay => {
  const gameHistoryInput = buildGamePresentation(gameReducer).gameHistoryInputs;
  return gameHistoryInput[playerInput];
};
