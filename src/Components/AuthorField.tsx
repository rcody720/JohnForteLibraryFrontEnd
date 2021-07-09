import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

type AuthorInputProps = {
  index: number;
  setHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const AuthorField = ({ index, setHandler }: AuthorInputProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      inputField: {
        margin: theme.spacing(3),
        width: "55%",
        color: "white",
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      icon: {
        color: "white",
      },
      addRemoveButton: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );

  const classes = useStyles();

  return (
    <TextField
      label="Author"
      onChange={setHandler}
      id={"" + index}
      className={classes.inputField}
      variant="standard"
      required={true}
      InputProps={{
        className: classes.multilineColor,
      }}
      InputLabelProps={{ className: classes.labelStyles }}
    />
  );
};

export default AuthorField;
