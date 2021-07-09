import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const Footer = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      footer: {
        backgroundColor: "rgb(107, 112, 92)",
        textAlign: "center",
        marginTop: "auto",
        padding: theme.spacing(4, 2),
        color: "white",
      },
    })
  );

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">John Forte Library</Typography>
        <Typography variant="body2">
          {"\u00A9"} {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
