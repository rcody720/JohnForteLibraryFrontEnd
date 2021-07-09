import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SelectUSState from "./Data/states.json";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import Select from "@material-ui/core/Select";
import { addLibraryCard } from "./BookSlice";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

export const CreateLibraryCardForm = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      title: {
        textAlign: "center",
        color: "white",
      },
      paper: {
        backgroundColor: "rgb(203, 153, 126)",
        margin: "6%",
        marginTop: "13%",
        padding: "5%",
        textAlign: "center",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "white",
        },
        "& .MuiInput-underline": {
          "&:hover:not($disabled):after": {
            borderBottomColor: "white",
          },
          "&:hover:not($disabled):before": {
            borderBottomColor: "white",
          },
        },
      },
      formStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      inputField: {
        margin: theme.spacing(3),
        width: "55%",
      },
      buttonStyle: {
        margin: theme.spacing(5),
        width: "30%",
        color: "white",
        "&:hover": {
          backgroundColor: "rgb(73, 88, 103)",
        },
      },
      multilineColor: {
        color: "white",
      },
      labelStyles: {
        color: "white",
      },
      stateStyles: {
        width: "55%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await dispatch(
      addLibraryCard({
        FirstName: fName,
        LastName: lName,
        PhoneNumber: PhoneNumber,
        StreetAddress: streetAddress,
        City: city,
        State: state,
        ZipCode: zipCode,
        Email: Email,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setErrorMessage(
        "The library card for " +
          response.payload.addedLibraryCard.name.firstName +
          " " +
          response.payload.addedLibraryCard.name.lastName +
          " was created successfully. Your library card number is: " +
          response.payload.addedLibraryCard.cardNumber
      );
      setOpen(true);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setFName("");
      setLName("");
      setStreetAddress("");
      setCity("");
      setZipCode("");
      setEmail("");
      setPhoneNumber("");
      setState("");
    } else {
      setErrorMessage(
        "There was an issue creating the library card. Please try again."
      );
      setOpen(true);
    }
  };

  const handleFNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFName(event.target.value);
  };

  const handleLNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLName(event.target.value);
  };

  const handleStreetAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStreetAddress(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string);
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <form
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" className={classes.title}>
          Create Library Cards
        </Typography>
        <TextField
          label="First Name"
          type="name"
          onChange={handleFNameChange}
          value={fName}
          className={classes.inputField}
          variant="standard"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="Last Name"
          onChange={handleLNameChange}
          value={lName}
          className={classes.inputField}
          variant="standard"
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="Phone Number"
          onChange={handlePhoneNumberChange}
          value={PhoneNumber}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="Email"
          onChange={handleEmailChange}
          value={Email}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="Street Address"
          onChange={handleStreetAddressChange}
          value={streetAddress}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <TextField
          label="City"
          onChange={handleCityChange}
          value={city}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <FormControl className={classes.stateStyles}>
          <InputLabel className={classes.labelStyles} id="State-select-label">
            State *
          </InputLabel>
          <Select
            labelId="State-select-label"
            label="State"
            value={state}
            required={true}
            onChange={handleStateChange}
            classes={{ root: classes.labelStyles, icon: classes.labelStyles }}
          >
            {SelectUSState.map((state) => (
              <MenuItem key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Zip Code"
          onChange={handleZipChange}
          value={zipCode}
          className={classes.inputField}
          variant="standard"
          color="secondary"
          required={true}
          InputProps={{
            className: classes.multilineColor,
          }}
          InputLabelProps={{ className: classes.labelStyles }}
        />
        <Button
          variant="outlined"
          color="inherit"
          className={classes.buttonStyle}
          type="submit"
        >
          Create
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <IconButton size="small" onClick={handleClose} color="inherit">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Paper>
  );
};
export default CreateLibraryCardForm;
