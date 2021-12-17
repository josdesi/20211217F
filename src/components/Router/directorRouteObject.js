import React from "react";
import Market from "../../pages/Market";
import ListCompanies from "../../pages/Company/List";
import NewCompany from "../../pages/Company/New";
import ViewCompany from "../../pages/Company/View";
import ViewTalent from "../../pages/Talent/View";
import Map from "../../pages/Map";

export const directorRouteObject = () => [
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
    path: "companies/new",
    element: <NewCompany />,
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
