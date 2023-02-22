import {
  gameFinishedDraw,
  GameState,
  PLAYER,
  playerInput,
  winnerChanged,
} from "../../store/slices/game-slice";
import { AppState } from "@/store/store";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkForWinner } from "../presentation/game-presentation";

export const playerPlay = (
  player: PLAYER,
  input: number
): ThunkAction<void, AppState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const {
      gameReducer: { gameProgress, isGameDone },
    } = getState();

    if (isGameDone) return;

    if (gameProgress[player].length >= 2) {
      const possibleWinner = checkForWinner([...gameProgress[player], input]);

      if (possibleWinner) {
        dispatch(winnerChanged({ player }));
      }
    }

    dispatch(playerInput({ playerInput: input }));

    if (checkIfDraw(getState().gameReducer)) {
      dispatch(gameFinishedDraw());
    }
  };
};

// TODO: Check if on turn 8 it ends draw
function checkIfDraw(gameState: GameState) {
  const {
    gameProgress: { PLAYER_ONE, PLAYER_TWO },
    gameWinner,
    isGameDone,
  } = gameState;

  return (
    !isGameDone && PLAYER_ONE.length + PLAYER_TWO.length === 9 && !gameWinner
  );
}
