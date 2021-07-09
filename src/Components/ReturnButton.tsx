import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import {
  checkInBook,
  setCheckInResponseMessage,
  setCheckInResponseOpen,
} from "./BookSlice";

type ReturnButtonProps = {
  book: any;
};

export const ReturnButton = ({ book }: ReturnButtonProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      buttonStyle: {
        height: "30%",
        margin: theme.spacing(3),
        color: "white",
        borderColor: "white",
        "&:hover": {
          backgroundColor: "rgb(165, 165, 141)",
          color: "white",
          borderColor: "white",
        },
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleReturnButtonClick = async (event: any) => {
    event.preventDefault();
    const response = await dispatch(checkInBook(book.bookId));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(
        setCheckInResponseMessage(book.title + " was successfully returned.")
      );
    } else {
      dispatch(
        setCheckInResponseMessage(
          "There was an issue returning " + book.title + ". Please try again."
        )
      );
    }
    dispatch(setCheckInResponseOpen(true));
  };

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        className={classes.buttonStyle}
        onClick={handleReturnButtonClick}
      >
        Return Book
      </Button>
    </div>
  );
};
export default ReturnButton;
