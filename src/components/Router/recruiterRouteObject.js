import React from "react";
import Market from "../../pages/Market";
import ListCompanies from "../../pages/Company/List";
import ViewCompany from "../../pages/Company/View";
import NewTalent from "../../pages/Talent/New";
import ViewTalent from "../../pages/Talent/View";
import Map from "../../pages/Map";

export const getRecruiterRouteObject = () => [
  {
    path: "home",
    element: <Market />,
  },
  {
    path: "market",
    element: <Market />,
  },
  {
    path: "talent/new",
    element: <NewTalent />,
  },
  {
    path: "talent/:id",
    element: <ViewTalent />,
  },
  {
    path: "companies",
    element: <ListCompanies />,
  },
  {
    path: "companies/:id",
    element: <ViewCompany />,
  },
  {
    path: "map",
    element: <Map />,
  },
];
