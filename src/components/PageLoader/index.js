import * as React from "react";
import { ReactComponent as LogoStandard } from "../../assets/images/gpac-logo-standard.svg";
import { ReactComponent as LogoLight } from "../../assets/images/gpac-logo-light.svg";
import "./animation.css";
import { useTheme } from "@mui/styles";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   pageLoadder: {
//     background: theme.palette.background.default,
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pageLoadder__logo: {
//     height: 200,
//     width: "auto",
//     animation: "flash 3s infinite ease-in-out both",
//   },
// }));

const PageLoader = () => {
  const theme = useTheme();
  const Logo = theme.isDark ? LogoLight : LogoStandard;
  // const classes = useStyles();

  return (
    <div
      style={{
        background: theme.palette.background.default,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo
        style={{
          height: 200,
          width: "auto",
          animation: "flash 3s infinite ease-in-out both",
        }}
      />
    </div>
  );
};

export default PageLoader;
