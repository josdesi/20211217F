import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { isUserInSession, isDirector, isCoach, isRecruiter } from "../../utils";
import { getPublicRouteObject } from "./publicRouteObject";
import { directorRouteObject } from "./directorRouteObject";
import { coachRouteObject } from "./coachRouteObject";
import { getRecruiterRouteObject } from "./recruiterRouteObject";

const getRouteObjectByRole = (user) => {
  if (!isUserInSession(user)) return [];
  if (isDirector(user)) return directorRouteObject();
  if (isCoach(user)) return coachRouteObject();
  if (isRecruiter(user)) return getRecruiterRouteObject();
};

const ReactElements = ({ user }) => {
  let routes = useRoutes([
    ...getPublicRouteObject(user),
    ...getRouteObjectByRole(user),
  ]);

  return routes;
};

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <ReactElements user={user} />
    </BrowserRouter>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Router);
