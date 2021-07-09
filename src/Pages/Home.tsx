import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { useAppSelector } from "../app/hooks";
import { selectAllBooks } from "../Components/BookSlice";

export function Home() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        display: "flex",
        flexWrap: "wrap",
        paddingTop: theme.spacing(0),
        "& > *": {
          backgroundColor: theme.palette.grey[400],
          margin: theme.spacing(10, 5, 15, 5),
          width: theme.spacing(23),
          height: theme.spacing(25),
        },
      },
      title: {
        marginTop: theme.spacing(13),
        textAlign: "center",
      },
      subTitle: {
        textAlign: "center",
      },
      book: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        backgroundColor: "rgb(203, 153, 126)",
        color: "white",
      },
      containerStyle: {
        height: "90%",
      },
    })
  );

  const classes = useStyles();
  const books = useAppSelector(selectAllBooks);

  return (
    <Container maxWidth="md" className={classes.containerStyle}>
      <Typography variant="h2" className={classes.title}>
        Recently Added Books
      </Typography>
      <div className={classes.paper}>
        <Paper elevation={5} className={classes.book}>
          <Typography variant="h5">{books[books.length - 3].title}</Typography>
          <Typography variant="body2">
            {books[books.length - 3].authors.join(", ")}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 3].isbn}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 3].publishedYear}
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.book}>
          <Typography variant="h5">{books[books.length - 2].title}</Typography>
          <Typography variant="body2">
            {books[books.length - 2].authors.join(", ")}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 2].isbn}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 2].publishedYear}
          </Typography>
        </Paper>
        <Paper elevation={5} className={classes.book}>
          <Typography variant="h5">{books[books.length - 1].title}</Typography>
          <Typography variant="body2">
            {books[books.length - 1].authors.join(", ")}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 1].isbn}
          </Typography>
          <Typography variant="body2">
            {books[books.length - 1].publishedYear}
          </Typography>
        </Paper>
      </div>
      <Typography variant="h2" className={classes.subTitle}>
        View the Inventory
      </Typography>
    </Container>
  );
}
export default Home;
