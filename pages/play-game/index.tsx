import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectGameWinner } from "@/store/selectors/game-selector";
import { Box, Grid, Typography } from "@mui/material";

import { Item } from "@/components/GridItem";
import { reset } from "@/store/slices/game-slice";

const PlayGame = () => {
  const dispatch = useAppDispatch();
  const gameWinner = useAppSelector(selectGameWinner);

  const handleRestartGame = () => {
    dispatch(reset());
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        {gameWinner && `Winner is: ${gameWinner} `}
      </Typography>

      <Box
        sx={{
          height: "60%",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          bgcolor: "#34599547",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">Go back</Link>
          <Typography
            onClick={handleRestartGame}
            sx={{ cursor: "pointer" }}
            variant="body1"
          >
            Restart
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "60%",
            display: "flex",
          }}
        >
          <Grid container>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((elemen) => {
              return <Item key={elemen} value={elemen} />;
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayGame;
