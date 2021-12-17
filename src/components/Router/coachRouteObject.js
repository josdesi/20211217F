import React from "react";
import Market from "../../pages/Market";
import ListCompanies from "../../pages/Company/List";
import ViewCompany from "../../pages/Company/View";
import ViewTalent from "../../pages/Talent/View";
import Map from "../../pages/Map";

export const coachRouteObject = () => [
  {
    path: "home",
    element: <Market />,
  },
  {
    path: "market",
    element: <Market />,
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
    exact: true,
  },
  {
    path: "map",
    element: <Map />,
  },
];
