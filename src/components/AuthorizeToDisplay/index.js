import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AuthorizeToDisplay = ({ user, name, children }) => {
  return user.componentPermissions.includes(name) ? children || <></>: <></>;
};

AuthorizeToDisplay.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(AuthorizeToDisplay);
