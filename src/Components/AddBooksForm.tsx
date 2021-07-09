import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import AuthorField from "../Components/AuthorField";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { addNewBook } from "./BookSlice";
import { useAppDispatch } from "../app/hooks";

export function AddBooksForm() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      title: {
        textAlign: "center",
        color: "white",
      },
      paper: {
        backgroundColor: "rgb(203, 153, 126)",
        margin: "10%",
        marginTop: "17%",
        padding: "5%",
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
      formStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      inputField: {
        margin: theme.spacing(3),
        width: "55%",
      },
      buttonStyle: {
        margin: theme.spacing(5),
        width: 200,
        color: "white",
        "&:hover": {
          backgroundColor: "rgb(73, 88, 103)",
        },
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      authorDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 50,
        width: "100%",
      },
      icon: {
        alignContent: "center",
        color: "white",
      },
      addRemoveIcons: {
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(0);
  const [authors, setAuthors] = useState([""]);
  const [title, setTitle] = useState("");
  const [ISBN, setISBN] = useState("");
  const [year, setYear] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let bookData = {
      Title: title,
      Authors: authors,
      ISBN: ISBN,
      PublishedYear: year,
    };

    const response = await dispatch(addNewBook(bookData));

    if (response.meta.requestStatus === "fulfilled") {
      setErrorMessage("The book was added successfully");
      setOpen(true);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setTitle("");
      setAuthors([""]);
      setISBN("");
      setYear(0);
      setCount(0);
    } else {
      setErrorMessage("There was an issue adding the book. Please try again.");
      setOpen(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let index = event.target.id;
    authors[parseInt(index)] = event.target.value;
    setAuthors(authors);
  };

  const handleISBNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setISBN(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber < 0) {
      setYear(0);
    } else {
      setYear(parseInt(event.target.value));
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={classes.formStyle}
      >
        <Typography variant="h3" className={classes.title}>
          Add Books
        </Typography>
        <TextField
          label="Title"
          type="name"
          onChange={handleTitleChange}
          value={title}
          className={classes.inputField}
          variant="standard"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <div className={classes.authorDiv}>
          <AuthorField index={0} setHandler={handleAuthorChange} key={0} />
          <div className={classes.addRemoveIcons}>
            <IconButton>
              <AddIcon
                onClick={() => setCount(count + 1)}
                className={classes.icon}
              />
            </IconButton>
            <IconButton>
              <RemoveIcon
                onClick={() => {
                  if (count > 0) setCount(count - 1);
                }}
                className={classes.icon}
              />
            </IconButton>
          </div>
        </div>
        {[...Array(count)].map((_, i) => (
          <AuthorField
            index={i + 1}
            setHandler={handleAuthorChange}
            key={i + 1}
          />
        ))}
        <TextField
          label="ISBN"
          onChange={handleISBNChange}
          value={ISBN}
          className={classes.inputField}
          variant="standard"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="Published Year"
          onChange={handleYearChange}
          type="number"
          value={year}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <Button
          variant="outlined"
          color="inherit"
          className={classes.buttonStyle}
          type="submit"
        >
          Add
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={errorMessage}
      />
    </Paper>
  );
}
export default AddBooksForm;
