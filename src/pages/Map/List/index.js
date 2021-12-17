import React from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Item from "./Item";
import { withStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { isEmptyArray } from "../../../utils/dataTypes";
import { COMPANY_CODE, TALENT_CODE } from "../../../constants";

const useStyles = makeStyles(() => ({
  map_list: {
    overflow: "auto",
    height: "100vh",
  },
  map_list__item: {
    cursor: "pointer",
  },
}));

const CustomListItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.secondaryHover,
    },
    "&:active": {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(ListItem);

const MapList = ({ companies, talents, onClick }) => {
  const classes = useStyles();

  return (
    <>
      <List className={classes.map_list} sx={{}}>
        {!isEmptyArray(companies.payload.data) &&
          companies.payload.data.map(({ id, name, phone, location, type }) => (
            <CustomListItem
              key={`company-list-item-${id}`}
              className={classes.map_list__item}
              onClick={() => onClick(COMPANY_CODE, id)}
            >
              <Item
                key={`company-item-${id}`}
                type={"Company"}
                title={type?.name}
                name={name}
                phone={phone}
                location={{
                  name: location?.name,
                  code: location?.code,
                  zipcode: location?.zipcode,
                }}
              />
            </CustomListItem>
          ))}

        {!isEmptyArray(talents.payload.data) &&
          talents.payload.data.map(
            ({ id, fullname, phone, location, title }) => (
              <CustomListItem
                key={`talent-list-item-${id}`}
                className={classes.map_list__item}
                onClick={() => onClick(TALENT_CODE, id)}
              >
                <Item
                  key={`talent-item-${id}`}
                  type={"Talent"}
                  title={title}
                  name={fullname}
                  phone={phone}
                  location={{
                    name: location?.name,
                    code: location?.code,
                    zipcode: location?.zipcode,
                  }}
                />
              </CustomListItem>
            )
          )}
      </List>
    </>
  );
};

const mapStateToProps = ({ companies, talents }) => ({
  companies,
  talents,
});

MapList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

MapList.defaultProps = {
  onClick: () => {},
};

export default connect(mapStateToProps)(MapList);
