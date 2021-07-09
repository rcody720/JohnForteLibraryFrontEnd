import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../app/hooks";
import { fetchPatronBooksAsync } from "./BookSlice";

export const CardNumberSearch = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        backgroundColor: "rgb(203, 153, 126)",
        margin: "6%",
        marginTop: "8%",
        padding: "2%",
        textAlign: "center",
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
      button: {
        width: "23%",
        marginLeft: theme.spacing(3),
        color: "white",
        borderColor: "white",
        padding: theme.spacing(1),
        "&:hover": {
          backgroundColor: "rgb(73, 88, 103)",
        },
      },
      inputField: {
        margin: theme.spacing(3),
        width: "55%",
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      searchTitle: {
        color: "white",
      },
      cardNumberInput: {
        display: "flex",
        alignItems: "center",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchPatronBooksAsync(cardNumber));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumber(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h5" className={classes.searchTitle}>
        Enter the Patron's library card number:
      </Typography>
      <form onSubmit={handleSubmitClick} className={classes.cardNumberInput}>
        <TextField
          label="CardNumber"
          onChange={handleCardNumberChange}
          value={cardNumber}
          className={classes.inputField}
          variant="standard"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <Button
          variant="outlined"
          color="inherit"
          type="submit"
          className={classes.button}
        >
          Search
        </Button>
      </form>
    </Paper>
  );
};
export default CardNumberSearch;
