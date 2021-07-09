import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./Components/Header";
import SideDrawer from "./Components/SideDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddBooks from "./Pages/AddBooks";
import ViewInventory from "./Pages/ViewInventory";
import Footer from "./Components/Footer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Trash from "./Pages/Trash";
import CreateLibraryCard from "./Pages/CreateLibraryCard";
import ReturnBooks from "./Pages/ReturnBooks";
import "./App.css";
import { useEffect } from "react";
import {
  getAllAvailableBooks,
  getAllBooks,
  getStatus,
} from "./Components/BookSlice";
import { CircularProgress } from "@material-ui/core";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyItems: "center",
        backgroundColor: "rgb(236, 230, 214)",
      },
      loadingAnimation: {
        top: "45%",
        left: "50%",
        position: "absolute",
      },
      errorPage: {
        top: "35%",
        left: "35%",
        position: "absolute",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState({
    drawerIsOpen: false,
  });
  const status = useAppSelector(getStatus);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, drawerIsOpen: isOpen });
    };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllBooks());
      await dispatch(getAllAvailableBooks());
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Router>
        <Header toggleDrawer={toggleDrawer} isOpen={state.drawerIsOpen} />
        <SideDrawer toggleDrawer={toggleDrawer} isOpen={state.drawerIsOpen} />
        <Switch>
          <Route path="/addBooks">
            <AddBooks />
          </Route>
          <Route path="/createLibraryCard">
            <CreateLibraryCard />
          </Route>
          <Route path="/viewInventory">
            {status === "loading" ? (
              <CircularProgress className={classes.loadingAnimation} />
            ) : status === "failed" ? (
              <div className={classes.errorPage}>
                <ErrorPage />
              </div>
            ) : (
              <ViewInventory />
            )}
          </Route>
          <Route path="/trash">
            <Trash />
          </Route>
          <Route path="/returnBooks">
            <ReturnBooks />
          </Route>
          <Route path="/">
            {status === "loading" ? (
              <CircularProgress className={classes.loadingAnimation} />
            ) : status === "failed" ? (
              <div className={classes.errorPage}>
                <ErrorPage />
              </div>
            ) : (
              <div>
                <Home />
                <ViewInventory />
              </div>
            )}
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
