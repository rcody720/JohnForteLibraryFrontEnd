import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MissingCover from "../img/missingbook.png";
import DeleteBookButton from "./DeleteBookButton";
import ReAddBookButton from "./ReAddBookButton";
import CheckoutButton from "./CheckoutButton";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {
  addToDeletedBooks,
  deleteBook,
  getPatronInfo,
  selectAvailableBooks,
  setBookToDelete,
  setPatronInfoOpen,
} from "./BookSlice";
import ReturnButton from "./ReturnButton";
import PatronInfoBackdrop from "./PatronInfoBackdrop";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

type BookCardProps = {
  book: any;
};

export const BookCard = ({ book }: BookCardProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      containerStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      },
      paperStyle: {
        backgroundColor: "rgb(203, 153, 126)",
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing(2),
        width: "80%",
        position: "relative",
      },
      coverStyle: {
        width: theme.spacing(20),
        height: "auto",
        marginRight: theme.spacing(6),
        borderRadius: "4px 0 0 4px",
        minHeight: theme.spacing(30),
      },
      bookInfo: {
        flexGrow: 2,
        flexShrink: 1,
        flexBasis: 0,
      },
      alertStyle: {
        width: "97%",
        padding: theme.spacing(3),
        paddingLeft: 0,
      },
      warningDeleteButton: {
        backgroundColor: "rgb(200, 0, 0)",
        margin: theme.spacing(1),
        marginRight: 0,
        color: "white",
        "&:hover": {
          backgroundColor: "rgb(150, 0, 0)",
          color: "white",
        },
      },
      rightSideCard: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      innerWrapper: {
        display: "flex",
      },
      deleteCancelWrapper: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      },
      cancelButton: {
        margin: theme.spacing(1),
        marginRight: 0,
      },
      rightSideButtons: {
        width: "26%",
      },
      overDueIcon: {
        position: "absolute",
        fontSize: "50px",
        alignSelf: "flex-end",
        right: "1.5%",
        bottom: "4%",
        color: "red",
      },
      infoIcon: {
        position: "absolute",
        alignSelf: "flex-start",
        right: "1.5%",
        top: "4%",
        cursor: "pointer",
        color: "white",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const availableBooks = useAppSelector(selectAvailableBooks);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  let authorString = book.authors.join(", ");
  let srcString =
    "http://covers.openlibrary.org/b/isbn/" +
    book.isbn +
    "-L.jpg?default=false";

  const handleImageError = (e: any) => {
    e.target.onError = null;
    e.target.src = MissingCover;
  };

  const toggleAlert = (open: boolean) => {
    setOpenDeleteAlert(open);
  };

  const handleCancelClick = () => {
    setOpenDeleteAlert(false);
  };

  const handleWarningDeleteButtonClick = () => {
    setOpenDeleteAlert(false);
    dispatch(addToDeletedBooks(book));
    dispatch(setBookToDelete(book));
    dispatch(deleteBook(book));
  };

  const handleBookCardClick = async (event: any) => {
    if (
      event.target.id !== "paper" ||
      availableBooks.some((b) => b.bookId === book.bookId)
    ) {
      return;
    }
    const response = await dispatch(getPatronInfo(book.bookId));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(setPatronInfoOpen(true));
    }
  };

  return (
    <Paper
      elevation={5}
      className={classes.paperStyle}
      onClick={handleBookCardClick}
      id="paper"
    >
      {book.isOverdue ? (
        <Tooltip
          title={<h2>This book is overdue</h2>}
          placement="left"
          arrow
          TransitionComponent={Zoom}
        >
          <NewReleasesIcon className={classes.overDueIcon} />
        </Tooltip>
      ) : (
        ""
      )}
      {availableBooks.some((b) => b.bookId === book.bookId) ||
      window.location.pathname === "/trash" ? (
        ""
      ) : (
        <div id="paper">
          <IconButton
            className={classes.infoIcon}
            id="paper"
            onClick={handleBookCardClick}
          >
            <PersonOutlineIcon id="paper" fontSize="large" />
          </IconButton>
          <PatronInfoBackdrop />
        </div>
      )}
      <img
        src={srcString}
        className={classes.coverStyle}
        onError={handleImageError}
        alt={"The cover of the book ".concat(book.title)}
        id="paper"
      />
      <div className={classes.rightSideCard} id="paper">
        <Collapse in={openDeleteAlert} className={classes.alertStyle}>
          <Alert
            severity="warning"
            action={
              <div className={classes.deleteCancelWrapper}>
                <Button
                  className={classes.cancelButton}
                  variant="contained"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.warningDeleteButton}
                  variant="contained"
                  onClick={handleWarningDeleteButtonClick}
                >
                  DELETE
                </Button>
              </div>
            }
          >
            Are you sure you want to delete the book: {book.title}
          </Alert>
        </Collapse>
        <div className={classes.innerWrapper} id="paper">
          <div className={classes.bookInfo} id="paper">
            <Typography variant="h4" id="paper">
              {book.title}
            </Typography>
            <Typography variant="h5" id="paper">
              {authorString}
            </Typography>
            <Typography variant="body1" id="paper">
              ISBN: {book.isbn}
            </Typography>
            <Typography variant="body1" id="paper">
              Published: {book.publishedYear}
            </Typography>
          </div>
          {window.location.pathname === "/trash" ? (
            <ReAddBookButton book={book} />
          ) : (
            <div className={classes.rightSideButtons} id="paper">
              <DeleteBookButton toggleAlert={toggleAlert} />
              {window.location.pathname === "/returnBooks" ? (
                <ReturnButton book={book} />
              ) : availableBooks.some((b) => b.bookId === book.bookId) ? (
                <CheckoutButton book={book} />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};
export default BookCard;
