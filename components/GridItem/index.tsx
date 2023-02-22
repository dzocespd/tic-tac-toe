import { playerPlay } from "@/core/usecases/player-play";
import {
  selectLastCharSign,
  selectPlayerTurn,
} from "@/store/selectors/game-selector";
import { useAppDispatch, useAppSelector } from "@/store/store";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

type BorderStyle = { [key: string]: string };

const borderMap: Record<number, Record<string, string>> = {
  1: { bottom: "1px solid blue" },
  2: { left: "1px solid blue", bottom: "1px solid blue" },
  3: { left: "1px solid blue" },
  5: { left: "1px solid blue", right: "1px solid blue" },
  6: { top: "1px solid blue", bottom: "1px solid blue" },
  7: { top: "1px solid blue", right: "1px solid blue" },
  8: { top: "1px solid blue", right: "1px solid blue" },
};

const CreateBorder = (num: number): BorderStyle => borderMap[num] || {};

export type GridItemProps = {
  num: number;
};
export const GridItem = styled(Grid)((props: GridItemProps) => {
  const { top, bottom, left, right } = CreateBorder(props.num);

  return {
    borderTop: top || "none",
    borderBottom: bottom || "none",
    borderLeft: left || "none",
    borderRight: right || "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

export type ItemProps = {
  value: number;
};

export const Item = ({ value }: ItemProps) => {
  const dispatch = useAppDispatch();
  const playerTurn = useAppSelector(selectPlayerTurn);
  const lastCharPlayed = useAppSelector((state) =>
    selectLastCharSign(value, state)
  );

  const handlePlay = (playInput: number) => {
    dispatch(playerPlay(playerTurn!, playInput));
  };

  return (
    <GridItem
      item
      xs={4}
      num={value}
      onClick={() => {
        handlePlay(value);
      }}
    >
      {lastCharPlayed}
    </GridItem>
  );
};
