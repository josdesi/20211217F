import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "./Table";
import NavDrawer from "../../../components/NavDrawer";
import PageLoader from "../../../components/PageLoader";
import Header from "./Header";
import {
  dispatchGetCompanies,
  dispatchClearGetCompanies,
  dispatchSetSearcherData,
} from "../../../redux/actions";
import { getSearcherQuery } from "../../../utils";

const companyParams = {
  filters: {
    withs: {
      location: true,
      type: true,
    },
    query: {
      orderBy: {
        key: "name",
      },
    },
  },
};

const List = ({
  user,
  companies,
  searcher,
  dispatchGetCompanies,
  dispatchClearGetCompanies,
}) => {
  const [searcherId, setSearcherId] = useState(null);

  useEffect(() => {
    dispatchGetCompanies({ user, params: companyParams });

    return () => {
      dispatchClearGetCompanies();
    };
  }, []);

  useEffect(() => {
    if (!searcher.id || searcher.id === searcherId) return;
    const query = getSearcherQuery(searcher);
    const params = Object.assign({}, companyParams);
    params.filters.query = {
      ...params.filters.query,
      ...query,
    };
    setSearcherId(searcher.id);
    dispatchGetCompanies({ user, params });
  }, [searcher]);

  if (!companies.success) {
    return <PageLoader />;
  }

  return (
    <>
      <NavDrawer
        appBar={{
          searcher: {
            show: true,
            disableIndustry: true,
          },
        }}
      >
        <Header />
        <Table />
      </NavDrawer>
    </>
  );
};

const mapStateToProps = ({ user, companies, searcher }) => ({
  user,
  companies,
  searcher,
});

const mapDispatchToProps = {
  dispatchGetCompanies,
  dispatchClearGetCompanies,
  dispatchSetSearcherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
