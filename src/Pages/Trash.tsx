import React, { ChangeEvent, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../app/hooks";
import { selectDeletedBooks } from "../Components/BookSlice";
import Pagination from "@material-ui/lab/Pagination";
import BookCard from "../Components/BookCard";
import Typography from "@material-ui/core/Typography";

export const Trash = () => {
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
      },
      titleText: {
        margin: theme.spacing(5),
      },
      noBooksMessage: {
        margin: theme.spacing(5),
        fontSize: "24px",
      },
    })
  );

  const classes = useStyles();
  let books = useAppSelector(selectDeletedBooks);
  const reversedBooks = [...books].reverse();
  let perPage = 5;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const booksPaged = reversedBooks.slice((page - 1) * perPage, perPage * page);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setNumberOfPages(Math.ceil(books.length / perPage));
  }, [books.length, perPage]);

  return (
    <Container max-width="sm" className={classes.containerStyle}>
      <Typography className={classes.titleText} variant="h2">
        Recently Deleted Books
      </Typography>

      {booksPaged.length > 0 ? (
        booksPaged.map((book, index) => {
          return <BookCard key={index} book={book} />;
        })
      ) : (
        <Typography className={classes.noBooksMessage} variant="body2">
          No books have been deleted.
        </Typography>
      )}
      {numberOfPages > 1 || page !== 1 ? (
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handlePageChange}
          className={classes.pagination}
        />
      ) : (
        ""
      )}
    </Container>
  );
};
export default Trash;
