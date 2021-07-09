import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import {
  checkoutBook,
  removeFromAvailableBooks,
  removeFromFilteredBooks,
  selectAvailableChecked,
  selectCheckoutedBook,
  selectCheckoutResponseOpen,
  selectDueDate,
  setCheckedoutBook,
  setCheckoutResponseOpen,
  setDueDate,
} from "./BookSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type CheckoutButtonProps = {
  book: any;
};

export const CheckoutButton = ({ book }: CheckoutButtonProps) => {
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
          backgroundColor: "rgb(73, 88, 103)",
          color: "white",
          borderColor: "white",
        },
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      },
      responseBackdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
      inputField: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(5),
        width: "55%",
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      popupTitle: {
        padding: theme.spacing(5),
        color: "white",
      },
      paper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(203, 153, 126)",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline": {
          "&:hover:not($disabled):after": {
            borderBottomColor: "white",
          },
          "&:hover:not($disabled):before": {
            borderBottomColor: "white",
          },
        },
      },
      responsePaper: {
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
        backgroundColor: "rgb(203, 153, 126)",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline": {
          "&:hover:not($disabled):after": {
            borderBottomColor: "white",
          },
          "&:hover:not($disabled):before": {
            borderBottomColor: "white",
          },
        },
      },
      closeIcon: {
        color: "white",
        alignSelf: "flex-end",
        padding: theme.spacing(1),
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const responseOpen = useAppSelector(selectCheckoutResponseOpen);
  const checkedoutBook = useAppSelector(selectCheckoutedBook);
  const availableChecked = useAppSelector(selectAvailableChecked);
  const dueDate = useAppSelector(selectDueDate);
  const [libraryCardNumber, setLibraryCardNumber] = useState("");
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckoutButtonClick = () => {
    setOpen(true);
  };

  const handleResponseClose = () => {
    dispatch(setCheckoutResponseOpen(false));
  };

  const handleSnackBarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLibraryCardNumber(event.target.value);
  };

  const handleFinalCheckoutClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let checkoutData = {
      BookId: book.bookId,
      CardNumber: libraryCardNumber,
    };

    const response = await dispatch(checkoutBook(checkoutData));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(removeFromAvailableBooks(book));
      if (availableChecked) {
        dispatch(removeFromFilteredBooks(book));
      }
      dispatch(setCheckoutResponseOpen(true));
      dispatch(setCheckedoutBook(book));
      dispatch(setDueDate(response.payload.dueDate));
      setOpen(false);
      setLibraryCardNumber("");
    } else if (response.meta.requestStatus === "rejected") {
      setOpenError(true);
      setMessage(
        'There was an issue checking out "' +
          book.title +
          '". Please try again.'
      );
    }
  };

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.buttonStyle}
        onClick={handleCheckoutButtonClick}
      >
        Checkout Book
      </Button>
      <Backdrop className={classes.backdrop} open={open}>
        <Paper elevation={4} className={classes.paper}>
          <IconButton
            size="medium"
            onClick={handleClose}
            className={classes.closeIcon}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" className={classes.popupTitle}>
            Enter the Patron's library card number:
          </Typography>
          <form onSubmit={handleFinalCheckoutClick}>
            <TextField
              label="Library Card Number"
              type="name"
              onChange={handleCardNumberChange}
              value={libraryCardNumber}
              className={classes.inputField}
              variant="standard"
              required={true}
              InputProps={{
                className: classes.multilineColor,
              }}
              InputLabelProps={{ className: classes.labelStyles }}
            />
            <Button
              className={classes.buttonStyle}
              variant="outlined"
              type="submit"
            >
              Checkout
            </Button>
          </form>
        </Paper>
      </Backdrop>
      <Backdrop
        className={classes.responseBackdrop}
        open={responseOpen}
        onClick={handleResponseClose}
      >
        <Paper elevation={4} className={classes.responsePaper}>
          <Typography variant="h5" className={classes.popupTitle}>
            {checkedoutBook.title} was checked out successfully.
          </Typography>
          <Typography variant="body1" className={classes.popupTitle}>
            The due date is {dueDate}
          </Typography>
        </Paper>
      </Backdrop>
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message={message}
      />
    </div>
  );
};
export default CheckoutButton;
