import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch } from "../app/hooks";
import { clearPatronBooks } from "./BookSlice";

export const SideDrawerContents = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      Icon: {
        marginRight: theme.spacing(2),
        color: "white",
      },
      linkText: {
        color: "white",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleReturnBooksPage = () => {
    dispatch(clearPatronBooks(0));
  };

  return (
    <List>
      <ListItem button component={Link} to="/">
        <HomeIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>Home</ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/addBooks">
        <AddCircleIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>Add Books</ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/createLibraryCard">
        <CreditCardIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>
          Create Library Card
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/viewInventory">
        <LibraryBooksIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>View Inventory</ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/returnBooks"
        onClick={handleReturnBooksPage}
      >
        <ImportContactsIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>Return Books</ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/trash">
        <DeleteIcon className={classes.Icon} />
        <ListItemText className={classes.linkText}>Trash</ListItemText>
      </ListItem>
    </List>
  );
};
export default SideDrawerContents;
