import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { dispatchSignIn, dispatchClearSignIn } from "../../redux/actions";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import GpacInputFormControl from "../../components/GpacInputFormControl";
import GpacButton from "../../components/GpacButton";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmptyString, isObject } from "../../utils";
import aveno from "../../assets/images/changing-lives.png";

const useStyles = makeStyles(() => ({
  paper: {
    padding: `30px 25px 100px 15px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 300,
    minWidth: 300,
    background: "#24292E !important",
  },

  logo__talent: {
    color: "#CECECE",
  },

  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url('" + aveno + "') !important",
    background: "linear-gradient(90deg, #B70000 50%, #24292E 32%)",
    backgroundSize: "cover",
  },
}));

const getNewEmailState = (currentState, data) => {
  if (!isObject(data)) return currentState;

  const { value, error } = data;
  const isValid = false;

  if (data.hasOwnProperty("value")) {
    if (!value) {
      return {
        value,
        isValid,
        error: "Email is required.",
      };
    }

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(String(value).toLowerCase())) {
      return {
        value,
        isValid,
        error: "Email is invalid.",
      };
    }
  }

  if (!isEmptyString(error)) {
    return {
      ...currentState,
      isValid,
      error,
    };
  }

  return {
    value: data.hasOwnProperty("value") ? value : currentState.value,
    error: "",
    isValid: true,
  };
};

const getNewPasswordState = (currentState, data) => {
  if (!isObject(data)) return currentState;

  const { value, error } = data;
  const isValid = false;

  if (data.hasOwnProperty("value") && !value) {
    return {
      value,
      error: "Password is required.",
      isValid,
    };
  }

  if (!isEmptyString(error)) {
    return {
      ...currentState,
      isValid,
      error,
    };
  }

  return {
    value: data.hasOwnProperty("value") ? value : currentState.value,
    error: "",
    isValid: true,
  };
};

const SignIn = ({ signIn, dispatchSignIn, dispatchClearSignIn }) => {
  const classes = useStyles();
  const initialStateInput = {
    value: "",
    isValid: false,
    error: "",
  };

  const [navigate, setNavigate] = useState("");
  const [email, setEmail] = useState(initialStateInput);
  const [password, setPassword] = useState(initialStateInput);
  const [settedErrors, setSettedErrors] = useState(false);

  useEffect(() => {
    return () => {
      dispatchClearSignIn();
    };
  }, []);

  useEffect(() => {
    const { success, error, payload } = signIn;

    if (!settedErrors && error && !isEmptyString(payload.message)) {
      toast.error(payload.message);
      setErrors(payload.errors);
      setSettedErrors(true);
    }

    if (success && !navigate) {
      setNavigate("/home");
    }
  }, [signIn]);

  const setErrors = (errors) => {
    if (Array.isArray(errors)) {
      for (const error of errors) {
        setNewInputState(error.field, { error: error.message });
      }
    }
  };

  const setNewInputState = (inputName, data) => {
    switch (inputName) {
      case "email":
        setEmail(getNewEmailState(email, data));
        break;

      case "password":
        setPassword(getNewPasswordState(password, data));
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setNewInputState(name, { value });
  };

  const isValidForm = () => {
    return email.isValid && password.isValid;
  };

  const handleSignIn = () => {
    dispatchSignIn({
      email: email.value,
      password: password.value,
    });
    setSettedErrors(false);
  };

  if (navigate) {
    return <Navigate to={navigate} />;
  }

  return (
    <>
      <div className={classes.background}>
        <Paper
          className={classes.paper}
          variant="outlined"
          sx={{ borderRadius: 5 }}
        >
          <img
            height={140}
            src="https://3ew6oaunigy160mh02nxlcs2-wpengine.netdna-ssl.com/wp-content/uploads/2020/08/logo-footer-01.svg"
          />
          {/* <Logo/> */}
          <Typography
            className={classes.logo__talent}
            variant="subtitle1"
            component="div"
          >
            Talent
          </Typography>
          <form>
            <Grid
              container
              spacing={2}
              style={{
                width: "auto",
                margin: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12}>
                <GpacInputFormControl
                  key="email-input"
                  inputLabel="Email"
                  error={email.error}
                  input={{
                    id: "email",
                    name: "email",
                    type: "email",
                    placeholder: "Enter your email",
                    onChange: handleChange,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <GpacInputFormControl
                  key="password-input"
                  inputLabel="Password"
                  error={password.error}
                  input={{
                    id: "password",
                    name: "password",
                    type: "password",
                    placeholder: "Enter your password",
                    onChange: handleChange,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <GpacButton
                  onClick={handleSignIn}
                  disabled={!isValidForm()}
                  style={{ background: "#4056F4", width: "100%" }}
                  variant="contained"
                >
                  {signIn.loading && (
                    <CircularProgress
                      color="secondary"
                      style={{ position: "absolute", height: 20, width: 20 }}
                    />
                  )}
                  Sign In
                </GpacButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = ({ signIn }) => ({ signIn });

const mapDispatchToProps = { dispatchSignIn, dispatchClearSignIn };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
