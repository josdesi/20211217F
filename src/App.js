import React from "react";
import Router from "./components/Router";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const getTheme = (type) => {
  const isDark = type === "dark";
  let palette = {};

  if (isDark) {
    palette = {
      red: {
        main: "#FF3939",
      },
      grey: {
        main: "#CECECE",
      },
      mode: type,
      background: {
        default: "#24292E",
        paper: "#1A1C21",
        paperSecondary: "#34343C",
      },
      primary: {
        main: "#4056F4",
      },
      secondary: {
        main: "#fff",
      },
      action: {
        hover: "#FF3939",
        secondaryHover: "#323C4A",
      },
    };
  }

  return createTheme({
    isDark,
    typography: {
      fontFamily: "'RobotoLight', sans-serif",
    },
    palette: {
      ...palette,
      red: {
        main: "#FF3939",
      },
    },
  });
};

const App = () => {
  const theme = getTheme("dark");

  return (
    <>
      <Provider store={store()}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Router />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
