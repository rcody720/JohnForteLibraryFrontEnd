import Drawer from "@material-ui/core/Drawer";
import { createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SideDrawerContents from "../Components/SideDrawerContents";
import React from "react";

type SideDrawerProps = {
  toggleDrawer: Function;
  isOpen: boolean;
};

export const SideDrawer = ({ toggleDrawer, isOpen }: SideDrawerProps) => {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgb(165, 165, 141)",
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      chevron: {
        color: "white",
      },
    })
  );

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon className={classes.chevron} />
          ) : (
            <ChevronRightIcon className={classes.chevron} />
          )}
        </IconButton>
      </div>
      <SideDrawerContents />
    </Drawer>
  );
};
export default SideDrawer;
