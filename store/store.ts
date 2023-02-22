import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import gameReducer, {
  buildInitialState as initGameState,
} from "./slices/game-slice";

export const rootReducer = combineReducers({
  gameReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const preloadState: AppState = {
  gameReducer: initGameState(),
};

// Hydrate usefull to preset state
export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlewate) =>
      getDefaultMiddlewate({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? preloadState,
  });

export const store = createStore({});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
