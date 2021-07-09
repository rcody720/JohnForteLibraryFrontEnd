import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type DeleteBookButtonProps = {
  toggleAlert: Function;
};

export const DeleteBookButton = ({ toggleAlert }: DeleteBookButtonProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      buttonStyle: {
        height: "30%",
        margin: theme.spacing(3),
        color: "white",
        borderColor: "white",
        "&:hover": {
          backgroundColor: "rgb(150, 0, 0)",
          color: "white",
          borderColor: "white",
        },
      },
    })
  );

  const classes = useStyles();

  const handleDeleteButtonClick = () => {
    toggleAlert(true);
  };

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.buttonStyle}
        onClick={handleDeleteButtonClick}
      >
        Delete Book
      </Button>
    </div>
  );
};
export default DeleteBookButton;
