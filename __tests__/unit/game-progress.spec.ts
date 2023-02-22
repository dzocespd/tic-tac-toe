import { buildGamePresentation } from "../../core/presentation/game-presentation";
import { PLAYER } from "../../store/slices/game-slice";
import { AppState, createStore } from "../../store/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { startGame } from "../../core/usecases/start-game";
import { playerPlay } from "../../core/usecases/player-play";

let store: ToolkitStore<AppState>;

describe("Game progress test", () => {
  beforeEach(() => {
    store = createStore({});
  });

  it("should start the game", () => {
    store.dispatch<any>(startGame());
    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_ONE,
        PLAYER_ONE: [],
        PLAYER_TWO: [],
      },
    });
  });

  it("should set input for player that made the move", () => {
    store.dispatch<any>(startGame());
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_TWO,
        PLAYER_ONE: [2],
        PLAYER_TWO: [],
      },
    });
  });
  it("should set input for player one and player two", () => {
    store.dispatch<any>(startGame());
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 3));
    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_ONE,
        PLAYER_ONE: [2],
        PLAYER_TWO: [3],
      },
    });
  });
  it("should set player one as winner with three combinations", () => {
    store.dispatch<any>(startGame());

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 6));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 1));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 4));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 3));

    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      isGameDone: true,
      gameWinner: PLAYER.PLAYER_ONE,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_TWO,
        PLAYER_ONE: [2, 1, 3],
        PLAYER_TWO: [6, 4],
      },
    });
  });

  it("should set player two as winner with more combinations", () => {
    store.dispatch<any>(startGame());

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 8));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 5));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 7));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 9));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 1));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 4));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 6));
    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      isGameDone: true,
      gameWinner: PLAYER.PLAYER_TWO,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_ONE,
        PLAYER_ONE: [8, 7, 1, 2],
        PLAYER_TWO: [5, 9, 4, 6],
      },
    });
  });
  it("should set a draw game", () => {
    store.dispatch<any>(startGame());

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 5));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 9));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 8));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 7));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 3));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 6));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 4));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 1));
    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      isGameDone: true,
      gameWinner: "DRAW",
      gameProgress: {
        playerTurn: PLAYER.PLAYER_TWO,
        PLAYER_ONE: [5, 2, 7, 6, 1],
        PLAYER_TWO: [9, 8, 3, 4],
      },
    });
  });

  it("should not be able to make move if game is done", () => {
    store.dispatch<any>(startGame());

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 6));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 1));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 4));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 3));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 7));

    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      isGameDone: true,
      gameWinner: PLAYER.PLAYER_ONE,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_TWO,
        PLAYER_ONE: [2, 1, 3],
        PLAYER_TWO: [6, 4],
      },
    });
  });

  it("should apply game history on each move with the tic tac toe signs", () => {
    store.dispatch<any>(startGame());

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 2));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 6));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 1));
    store.dispatch<any>(playerPlay(PLAYER.PLAYER_TWO, 4));

    store.dispatch<any>(playerPlay(PLAYER.PLAYER_ONE, 3));

    const presentation = buildGamePresentation(store.getState().gameReducer);

    expect(presentation).toEqual({
      ...presentation,
      isGameStarted: true,
      isGameDone: true,
      gameWinner: PLAYER.PLAYER_ONE,
      gameProgress: {
        playerTurn: PLAYER.PLAYER_TWO,
        PLAYER_ONE: [2, 1, 3],
        PLAYER_TWO: [6, 4],
      },
      gameHistoryInputs: {
        2: "X",
        6: "O",
        1: "X",
        4: "O",
        3: "X",
      },
    });
  });
});
