import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectFilteredBooks } from "../Components/BookSlice";
import BookCard from "../Components/BookCard";
import Pagination from "@material-ui/lab/Pagination";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect } from "react";
import BookSearch from "../Components/BookSearch";
import Select from "@material-ui/core/Select";

export const ViewInventory = () => {
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
    })
  );

  const classes = useStyles();
  const books = useAppSelector(selectFilteredBooks);
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

  useEffect(() => {
    setNumberOfPages(Math.ceil(books.length / perPage));
  }, [books.length, perPage]);

  useEffect(() => {
    setPage(1);
  }, [books, numberOfPages]);

  return (
    <Container max-width="sm" className={classes.containerStyle}>
      <BookSearch />
      {booksPaged.map((book, index) => {
        return <BookCard key={index} book={book} />;
      })}
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
    </Container>
  );
};

export default ViewInventory;
