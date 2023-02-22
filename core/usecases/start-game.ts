import { start } from "../../store/slices/game-slice";
import { AppDispatch, AppState } from "../../store/store";
import { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit";

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const startGame = (): ThunkAction<
  void,
  AppState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    dispatch(start());
  };
};
