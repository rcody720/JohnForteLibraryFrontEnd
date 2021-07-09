import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Container from "@material-ui/core/Container";
import CreateLibraryCardForm from "../Components/CreateLibraryCardForm";

export const CreateLibraryCard = () => {
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
      <CreateLibraryCardForm />
    </Container>
  );
};
export default CreateLibraryCard;
