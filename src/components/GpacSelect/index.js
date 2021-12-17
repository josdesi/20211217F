import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

const GpacSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  "label + &": {
    // marginTop: theme.spacing(3),
    // borderStyle: "none"
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // border: "1px solid #ced4da",
    borderStyle: "none",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    // backgroundColor: "transparent",// theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      // "border-color",
      // "background-color",
      // "box-shadow",
    ]),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      // borderColor: theme.palette.primary.main,
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default GpacSelect;
