import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { isDraft, isRecruiter } from "../../../utils";
import { DEFAULT_PROFILE_SRC } from "../../../constants/talent";

const useStyles = makeStyles(() => ({
  columnContainer: {
    display: "flex",
  },
  name: {
    marginBottom: "-5px !important",
    fontWeight: 600,
  },
  title: {
    fontWeight: 100,
  },

  box: {
    maxHeight: 40,
  },
  avatar: {
    marginRight: 10,
  },
}));

const NameColumn = ({ user, name, photo, title, postType }) => {
  const classes = useStyles();

  return (
    <div className={classes.columnContainer}>
      <Avatar className={classes.avatar} src={photo || DEFAULT_PROFILE_SRC} />

      <Box className={classes.box}>
        <Typography className={classes.name} variant="body1" gutterBottom>
          {name}

          {(isDraft(postType) || isRecruiter(user)) && (
            <Typography marginLeft={1} variant="caption" fontSize={10} color={isDraft(postType) ? "warning.main" : "#64b5f6"}>
              {postType}
            </Typography>
          )}
        </Typography>

        <Typography variant="caption" className={classes.title} gutterBottom>
          {title}
        </Typography>
      </Box>
    </div>
  );
};

NameColumn.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postType: PropTypes.string,
};

NameColumn.defaultProps = {
  name: "",
  title: "",
  postType: "",
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(NameColumn);
