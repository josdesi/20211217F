import React from "react";
import { Navigate } from "react-router-dom";
import { isUserInSession } from "../../utils";
import SignIn from "../../pages/SignIn";

export const getPublicRouteObject = (user) => {
  const userInSession = isUserInSession(user);
  const signInElement = userInSession ? <Navigate to={"/home"} /> : <SignIn />;
  const anyElement = <Navigate to={userInSession ? "/home" : "/signin"} />;

  return [
    { path: "signin", element: signInElement },
    { path: "*", element: anyElement },
  ];
};
