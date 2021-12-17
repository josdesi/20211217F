import React from "react";
import ContentTitle from "../../components/ContentTitle";
import GpacButton from "../../components/GpacButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AuthorizeToDisplay from "../../components/AuthorizeToDisplay";
import { MARKET_COMPONENT_ADD_NEW_TALENT } from "../../constants/role";

const useStyles = makeStyles(() => ({
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonAddNewTalent: {
    float: "right",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <ContentTitle title={"Market"} />
      </Grid>

      <AuthorizeToDisplay name={MARKET_COMPONENT_ADD_NEW_TALENT}>
        <Grid item xs={12} md={6}>
          <GpacButton
            className={classes.buttonAddNewTalent}
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            color="primary"
            to={"/talent/new"}
            component={Link}
          >
            Add New Talent
          </GpacButton>
        </Grid>
      </AuthorizeToDisplay>
    </Grid>
  );
};

export default Header;
