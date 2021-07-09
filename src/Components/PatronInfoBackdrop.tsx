import {
  Backdrop,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectPatronInfo,
  selectPatronInfoOpen,
  setPatronInfoOpen,
} from "./BookSlice";

export const PatronInfoBackdrop = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
      paper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(203, 153, 126)",
        color: "white",
        padding: "2%",
      },
      title: {
        marginBottom: "3%",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectPatronInfoOpen);
  const patron = useAppSelector(selectPatronInfo);

  const handleClick = () => {
    dispatch(setPatronInfoOpen(false));
  };

  return (
    <Backdrop open={open} className={classes.backdrop} onClick={handleClick}>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          This book was checked out by:
        </Typography>
        <Typography variant="body1">
          Name: {patron.checkedOutInfo.name}
        </Typography>
        <Typography variant="body1">
          Email: {patron.checkedOutInfo.email}
        </Typography>
        <Typography variant="body1">
          Phone Number: {patron.checkedOutInfo.phoneNumber}
        </Typography>
        <Typography variant="body1">
          Address: {patron.checkedOutInfo.address}
        </Typography>
        <Typography variant="body1">
          Checkout Date: {patron.checkedOutDate}
        </Typography>
        <Typography variant="body1">Due Date: {patron.dueDate}</Typography>
        <Typography variant="body1">
          Library Card Number: {patron.checkedOutInfo.cardNumber}
        </Typography>
      </Paper>
    </Backdrop>
  );
};
export default PatronInfoBackdrop;
