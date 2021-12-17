import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import IndustrySelect from "../IndustrySelect";
import LocationSelect from "../LocationSelect";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import QuickSearch from "../QuickSearch";
import { styled } from "@mui/material/styles";
import {
  dispatchClearSearcher,
  dispatchSetSearcherData,
} from "../../../redux/actions";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: "0px 5px 5px 0px",
}));

const GridSearcher = styled(Grid)(() => ({
  background: "#2B313B",
}));

const Searcher = ({ searcher, dispatchSetSearcherData }) => {
  useEffect(() => {
    return () => {
      dispatchClearSearcher();
    };
  }, []);

  const handleSearch = () => {
    dispatchSetSearcherData({
      id: new Date().getTime(),
    });
  };

  return (
    <Grid container spacing={0}>
      <GridSearcher item xs={12} md={9} padding={0} borderRadius={2}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <QuickSearch />
          </Grid>

          <Grid item xs={12} md={8} display="flex">
            <Grid container>
              <Grid item xs={12} md={6}>
                <IndustrySelect disabled={searcher.disableIndustry} />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocationSelect />
              </Grid>
            </Grid>

            <StyledButton variant="contained" onClick={handleSearch}>
              <SearchIcon />
            </StyledButton>
          </Grid>
        </Grid>
      </GridSearcher>
    </Grid>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  dispatchSetSearcherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
