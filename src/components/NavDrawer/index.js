import React from "react";
import { connect } from "react-redux";
import { isDirector, isCoach, isRecruiter } from "../../utils";
import Director from "./Director";
import Coach from "./Coach";
import Recruiter from "./Recruiter";
import PropTypes from "prop-types";

const NavDrawer = ({ user, appBar, children }) => {
  if (isDirector(user)) {
    return <Director appBar={appBar}>{children}</Director>;
  }

  if (isRecruiter(user)) {
    return <Recruiter appBar={appBar}>{children}</Recruiter>;
  }

  if (isCoach(user)) {
    return <Coach appBar={appBar}>{children}</Coach>;
  }

  return <></>;
};

NavDrawer.propTypes = {
  appBar: PropTypes.shape({
    arrowBack: PropTypes.shape({
      show: PropTypes.bool,
      to: PropTypes.string.isRequired,
      label: PropTypes.string,
    }),
  }),
};

NavDrawer.defaultProps = {
  appBar: {
    arrowBack: {
      show: false,
    },
    searcher: {
      show: false,
    },
  },
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(NavDrawer);
