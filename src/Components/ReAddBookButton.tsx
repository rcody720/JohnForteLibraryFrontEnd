import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch } from "../app/hooks";
import { addNewBook, removeFromDeletedBooks } from "./BookSlice";

type ReAddBookButtonProps = {
  /* toggleAlert: Function; */
  book: any;
};

export const ReAddBookButton = ({
  /* toggleAlert */ book,
}: ReAddBookButtonProps) => {
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
          backgroundColor: "rgb(165, 165, 141)",
          color: "white",
          borderColor: "white",
        },
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleReAddButtonClick = () => {
    dispatch(addNewBook(book));
    dispatch(removeFromDeletedBooks(book));
  };

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.buttonStyle}
        onClick={handleReAddButtonClick}
      >
        Re-Add Book
      </Button>
    </div>
  );
};
export default ReAddBookButton;
