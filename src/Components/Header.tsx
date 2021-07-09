import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import BookLogo from "../img/BookLogo.svg";
import { Link } from "react-router-dom";

type HeaderProps = {
  toggleDrawer: Function;
  isOpen: boolean;
};

export const Header = ({ toggleDrawer, isOpen }: HeaderProps) => {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      menuButton: {
        marginRight: theme.spacing(2),
      },
      appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "rgb(107, 112, 92)",
        position: "absolute",
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(3),
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
      },
      search: {
        position: "absolute",
        right: theme.spacing(5),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
      logoLink: {
        display: "flex",
        textDecoration: "none",
        color: "white",
        marginLeft: theme.spacing(3),
      },
    })
  );

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={classes.logoLink}>
          <img src={BookLogo} alt="Logo of an open book" />
          <Typography className={classes.title} variant="h6" noWrap>
            John Forte Library
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
