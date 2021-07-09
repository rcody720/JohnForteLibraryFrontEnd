import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddBooksForm from "../Components/AddBooksForm";
import React from "react";

export const AddBooks = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      containerStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      },
    })
  );

  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.containerStyle}>
      <AddBooksForm />
    </Container>
  );
};
export default AddBooks;
