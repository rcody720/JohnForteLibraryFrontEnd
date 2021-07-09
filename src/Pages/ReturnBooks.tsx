import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCheckInResponseMessage,
  selectCheckInResponseOpen,
  selectPatronBooks,
  setCheckInResponseOpen,
} from "../Components/BookSlice";
import BookCard from "../Components/BookCard";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";
import CardNumberSearch from "../Components/CardNumberSearch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

export const ReturnBooks = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      containerStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(4),
      },
      pagination: {
        marginTop: theme.spacing(2),
        display: "flex",
        alignItems: "center",
      },
      pageSize: {
        marginLeft: theme.spacing(3),
      },
      select: {
        marginLeft: theme.spacing(3),
        "&:before": {
          borderColor: "rgb(107, 112, 92)",
        },
        "&:after": {
          borderColor: "rgb(107, 112, 92)",
        },
      },
      noBooksMessage: {
        margin: theme.spacing(5),
        fontSize: "24px",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const openError = useAppSelector(selectCheckInResponseOpen);
  const message = useAppSelector(selectCheckInResponseMessage);
  const books = useAppSelector(selectPatronBooks);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const booksPaged = books.slice((page - 1) * perPage, perPage * page);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    setPerPage(event.target.value);
  };

  const handleSnackBarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setCheckInResponseOpen(false));
  };

  useEffect(() => {
    setNumberOfPages(Math.ceil(books.length / perPage));
  }, [books.length, perPage]);

  return (
    <Container max-width="sm" className={classes.containerStyle}>
      <CardNumberSearch />
      {books.length > 0 ? (
        booksPaged.map((book, index) => {
          return <BookCard key={index} book={book} />;
        })
      ) : (
        <Typography className={classes.noBooksMessage} variant="body2">
          No books have been checked out.
        </Typography>
      )}
      {numberOfPages > 1 || page !== 1 ? (
        <div className={classes.pagination}>
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handlePageChange}
          />
          <InputLabel id="simple-select-label" className={classes.pageSize}>
            Books per Page:{" "}
          </InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={perPage}
            className={classes.select}
            onChange={handlePageSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </div>
      ) : (
        ""
      )}
      <Snackbar
        open={openError}
        autoHideDuration={3500}
        onClose={handleSnackBarClose}
        message={message}
      />
    </Container>
  );
};
export default ReturnBooks;
