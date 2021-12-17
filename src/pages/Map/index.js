import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Advertisement from "../../components/Advertisement";
import NavDrawer from "../../components/NavDrawer";
import PageLoader from "../../components/PageLoader";
import {
  dispatchGetTalents,
  dispatchClearGetTalents,
  dispatchGetCompanies,
  dispatchClearGetCompanies,
} from "../../redux/actions";
import MapGL from "../../components/Map";
import List from "./List";
import { isEmptyObject, isEmptyArray, getSearcherQuery } from "../../utils";
import { COMPANY_CODE, TALENT_CODE } from "../../constants";

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

const Map = ({
  user,
  searcher,
  talents,
  dispatchGetTalents,
  dispatchClearGetTalents,
  companies,
  dispatchGetCompanies,
  dispatchClearGetCompanies,
}) => {
  const [viewport, setViewport] = useState({});
  const [markers, setMarkers] = useState([]);
  const [searcherId, setSearcherId] = useState(null);

  useEffect(() => {
    dispatchGetCompanies({ user, params: companyParams });
    dispatchGetTalents({ user, params: talentParams });

    return () => {
      dispatchClearGetCompanies();
      dispatchClearGetTalents();
    };
  }, []);

  useEffect(() => {
    if (!searcher.id || searcher.id === searcherId) return;

    const query = getSearcherQuery(searcher);
    const newCompanyParams = Object.assign({}, companyParams);
    newCompanyParams.filters.query = {
      ...newCompanyParams.filters.query,
      ...query,
    };
    const newTalentParams = Object.assign({}, talentParams);
    newTalentParams.filters.query = {
      ...newTalentParams.filters.query,
      ...query,
    };
    setSearcherId(searcher.id);
    dispatchGetCompanies({ user, params: newCompanyParams });
    dispatchGetTalents({ user, params: newTalentParams });
  }, [searcher]);

  useEffect(() => {
    const { success, payload } = companies;
    if (success && !isEmptyArray(payload.data)) {
      const companyMarkers = payload.data.map(
        ({ name, latitude, longitude, location }) => {
          return {
            label: name,
            latitude: latitude || location.latitude,
            longitude: longitude || location.longitude,
            color: "black",
          };
        }
      );

      if (isEmptyObject(viewport)) {
        setViewport({
          latitude: companyMarkers ? companyMarkers[0].latitude : null,
          longitude: companyMarkers ? companyMarkers[0].longitude : null,
        });
      }

      setMarkers([...markers, ...companyMarkers]);
    }
  }, [companies]);

  useEffect(() => {
    const { success, payload } = talents;
    if (success && !isEmptyArray(payload.data)) {
      const talentMarkers = payload.data.map(
        ({ fullname, latitude, longitude, location }) => {
          return {
            label: fullname,
            latitude: latitude || location.latitude,
            longitude: longitude || location.longitude,
            color: "blue",
          };
        }
      );

      if (isEmptyObject(viewport)) {
        setViewport({
          latitude: talentMarkers ? talentMarkers[0].latitude : null,
          longitude: talentMarkers ? talentMarkers[0].longitude : null,
        });
      }
      setMarkers([...markers, ...talentMarkers]);
    }
  }, [talents]);

  const handleOnClick = (type, id) => {
    let data = [];

    if (type === COMPANY_CODE) {
      data = companies.payload.data;
    }

    if (type === TALENT_CODE) {
      data = talents.payload.data;
    }

    const item = data.find((item) => item.id === id);
    if (!item) return;

    setViewport({
      latitude: item.latitude || location.latitude,
      longitude: item.longitude || location.longitude,
      zoom: 12,
    });
  };

  if (!companies.success || !talents.success) {
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
        {isEmptyArray(companies.payload.data) && (
          <Advertisement text={"Oops, you resources is empty to see the map"} />
        )}

        {!isEmptyArray(companies.payload.data) && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <List onClick={handleOnClick} />
            </Grid>

            <Grid item xs={12} md={8}>
              {!isEmptyObject(viewport) && (
                <MapGL
                  defaultViewport={viewport}
                  heigth={"100%"}
                  markers={markers}
                />
              )}
            </Grid>
          </Grid>
        )}
      </NavDrawer>
    </>
  );
};

const mapStateToProps = ({
  user,
  searcher,
  talents,
  locations,
  companies,
  industries,
}) => ({ user, searcher, talents, companies, locations, industries });

const mapDispatchToProps = {
  dispatchGetCompanies,
  dispatchClearGetCompanies,
  dispatchGetTalents,
  dispatchClearGetTalents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
