import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "./Table";
import NavDrawer from "../../components/NavDrawer";
import PageLoader from "../../components/PageLoader";
import Header from "./Header";
import {
  dispatchGetTalents,
  dispatchClearGetTalents,
} from "../../redux/actions";
import { getSearcherQuery } from "../../utils/searcher";

const talentParams = {
  filters: {
    query: {
      orderBy: {
        key: "id",
        sortIn: "desc",
      },
    },
    withs: {
      status: true,
      processStatus: true,
      industry: true,
      location: true,
      funcionalTitle: true,
    },
  },
};

const Market = ({
  user,
  searcher,
  talentsReducer,
  dispatchGetTalents,
  dispatchClearGetTalents,
}) => {
  const [searcherId, setSearcherId] = useState(null);

  useEffect(() => {
    dispatchGetTalents({ user, params: talentParams });

    return () => {
      dispatchClearGetTalents();
    };
  }, []);

  useEffect(() => {
    if (!searcher.id || searcher.id === searcherId) return;
    const query = getSearcherQuery(searcher);
    const params = Object.assign({}, talentParams);
    params.filters.query = {
      ...params.filters.query,
      ...query,
    };
    setSearcherId(searcher.id);
    dispatchGetTalents({ user, params });
  }, [searcher]);

  if (!talentsReducer.success) {
    return <PageLoader />;
  }

  return (
    <>
      <NavDrawer
        appBar={{
          searcher: {
            show: true,
          },
        }}
      >
        {/* <Map/> */}
        <Header />
        <Table />
      </NavDrawer>
    </>
  );
};

const mapStateToProps = ({ user, searcher, talents: talentsReducer }) => ({
  user,
  searcher,
  talentsReducer,
});

const mapDispatchToProps = {
  dispatchGetTalents,
  dispatchClearGetTalents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
