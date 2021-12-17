import React from "react";
import ContentTitle from "../../../components/ContentTitle";
import GpacButton from "../../../components/GpacButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AuthorizeToDisplay from "../../../components/AuthorizeToDisplay";
import { COMPANY_COMPONENT_ADD_COMPANY } from "../../../constants/role";

const useStyles = makeStyles(() => ({
  buttonAddNewTalent: {
    float: "right",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <ContentTitle title={"Companies"} />
      </Grid>

      <AuthorizeToDisplay name={COMPANY_COMPONENT_ADD_COMPANY}>
        <Grid item xs={12} md={6}>
          <GpacButton
            className={classes.buttonAddNewTalent}
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            color="primary"
            to={"/companies/new"}
            component={Link}
          >
            Add New Company
          </GpacButton>
        </Grid>
      </AuthorizeToDisplay>
    </Grid>
  );
};

export default Header;
