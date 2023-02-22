import React from "react";

import { Box, Container, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { startGame } from "@/core/usecases/start-game";
import Link from "next/link";

export const Main = () => {
  const dispatch = useAppDispatch();

  const handleStartGame = () => {
    dispatch(startGame());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50%",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">Tic Tac Toe </Typography>

      <Button
        onClick={handleStartGame}
        variant="outlined"
        sx={{
          height: "fit-content",
          "& a": {
            textDecoration: "none",
            color: "inherit",
          },
        }}
      >
        <Link href="/play-game">Play Game</Link>{" "}
      </Button>
    </Box>
  );
};
