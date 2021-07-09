import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectAllBooks,
  selectAvailableBooks,
  selectAvailableChecked,
  selectOverdueChecked,
  selectSearchBy,
  setAvailableChecked,
  setFilteredBooks,
  setOverdueChecked,
  setSearchBy,
} from "./BookSlice";

export const BookSearch = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      inputField: {
        margin: theme.spacing(3),
        marginLeft: 0,
        width: "50%",
        marginTop: theme.spacing(4),
      },
      searchStyles: {
        width: "70%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "& label.Mui-focused": {
          color: "rgb(107, 112, 92)",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "rgb(107, 112, 92)",
        },
        "& .MuiInput-underline": {
          "&:hover:not($disabled):after": {
            borderBottomColor: "rgb(107, 112, 92)",
          },
          "&:hover:not($disabled):before": {
            borderBottomColor: "rgb(107, 112, 92)",
          },
        },
      },
      formControl: {
        width: "20%",
      },
      button: {
        width: "15%",
        marginLeft: theme.spacing(1),
        color: "rgb(107, 112, 92)",
        borderColor: "rgb(107, 112, 92)",
        "&:hover": {
          backgroundColor: "rgb(107, 112, 92)",
          color: "white",
          borderColor: "rgb(107, 112, 92)",
        },
      },
      checkBox: {
        marginLeft: theme.spacing(3),
      },
      overdueCheckbox: {
        marginLeft: theme.spacing(3),
        width: "27%",
      },
      select: {
        "&:before": {
          borderColor: "rgb(107, 112, 92)",
        },
        "&:after": {
          borderColor: "rgb(107, 112, 92)",
        },
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const searchBy = useAppSelector(selectSearchBy);
  const allBooks = useAppSelector(selectAllBooks);
  const availableBooks = useAppSelector(selectAvailableBooks);
  var overdueBooks = allBooks;
  overdueBooks = overdueBooks.filter((book: any) => book.isOverdue === true);
  const [neutralBooks, setNeutralBooks] = useState(availableBooks);
  const availableChecked = useAppSelector(selectAvailableChecked);
  const overdueChecked = useAppSelector(selectOverdueChecked);

  let options: string[] = [];
  if (searchBy === "authors") {
    for (let book of neutralBooks) {
      let authors = book.authors;
      for (let author of authors) {
        options.push(author);
      }
    }
  } else {
    options = neutralBooks.map((option: any) => option[searchBy].toString());
  }
  let unique = Array.from(new Set(options));

  const handleSearchClick = () => {
    dispatch(
      setFilteredBooks(
        neutralBooks.filter((book) =>
          book[searchBy]
            .toString()
            .toUpperCase()
            .includes(query.toString().toUpperCase())
        )
      )
    );
  };

  const handleAvailableCheckBox = (event: any) => {
    dispatch(setAvailableChecked(!availableChecked));
    dispatch(setOverdueChecked(false));
    if (availableChecked) {
      setNeutralBooks(allBooks);
      dispatch(setFilteredBooks(allBooks));
    } else {
      setNeutralBooks(availableBooks);
      dispatch(setFilteredBooks(availableBooks));
    }
  };

  const handleOverdueChange = () => {
    dispatch(setOverdueChecked(!overdueChecked));
    dispatch(setAvailableChecked(false));
    if (overdueChecked) {
      setNeutralBooks(allBooks);
      dispatch(setFilteredBooks(allBooks));
    } else {
      setNeutralBooks(overdueBooks);
      dispatch(setFilteredBooks(overdueBooks));
    }
  };

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSearchByChange = (event: any) => {
    dispatch(setSearchBy(event.target.value));
  };

  return (
    <div className={classes.searchStyles}>
      <Autocomplete
        freeSolo
        className={classes.inputField}
        options={unique}
        onInputChange={(event, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            label="Search"
            {...params}
            variant="standard"
            value={query}
            onChange={handleQueryChange}
          />
        )}
      />
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Search By</InputLabel>
        <Select
          onChange={handleSearchByChange}
          value={searchBy}
          className={classes.select}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="authors">Author(s)</MenuItem>
          <MenuItem value="isbn">ISBN</MenuItem>
          <MenuItem value="publishedYear">Published Year</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        className={classes.checkBox}
        control={
          <Checkbox
            checked={availableChecked}
            onChange={handleAvailableCheckBox}
            style={{ color: "rgb(107, 112, 92)" }}
          />
        }
        label="Available"
      />
      <FormControlLabel
        className={classes.overdueCheckbox}
        control={
          <Checkbox
            checked={overdueChecked}
            onChange={handleOverdueChange}
            style={{ color: "rgb(107, 112, 92)" }}
          />
        }
        label="Overdue Books"
      />
      <Button
        onClick={handleSearchClick}
        variant="outlined"
        color="inherit"
        className={classes.button}
      >
        Search
      </Button>
    </div>
  );
};
export default BookSearch;
