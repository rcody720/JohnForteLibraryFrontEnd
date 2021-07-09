import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { getAllAvailableBooks, getAllBooks } from "../Components/BookSlice";

export const ErrorPage = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      warningIcon: {
        fontSize: "150px",
        marginBottom: "3%",
      },
      heroText: {
        marginBottom: "4%",
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await dispatch(getAllBooks());
        await dispatch(getAllAvailableBooks());
      };

      fetchData();
    }, 30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <WarningIcon className={classes.warningIcon} />
      <Typography variant="h2" className={classes.heroText}>
        404 Error: Not Found
      </Typography>
      <Typography variant="h5">Please refresh.</Typography>
    </div>
  );
};
export default ErrorPage;
