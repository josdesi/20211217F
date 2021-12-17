import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
