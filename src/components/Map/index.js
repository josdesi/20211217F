/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import Tag from "./Tag";
import { isFunction } from "../../utils/dataTypes";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM,
  COORDINATES_DECIMAL,
  DEFAULT_HEIGHT,
} from "../../constants/map";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  navigationControl: {
    // right: 10,
    marginLeft: "90%",
    top: 10,
  },
}));

const Map = ({ markers, heigth, onClick, defaultViewport }) => {
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    latitude: defaultViewport.latitude || DEFAULT_LATITUDE,
    longitude: defaultViewport.longitude || DEFAULT_LONGITUDE,
    zoom: defaultViewport.zoom || DEFAULT_ZOOM,
  });
  const { coordinates = {} } = onClick;
  const [onClickCoordinates, setOnClickCoordinates] = useState({
    latitude: coordinates.latitude || viewport.latitude,
    longitude: coordinates.longitude || viewport.longitude,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: defaultViewport.latitude || DEFAULT_LATITUDE,
      longitude: defaultViewport.longitude || DEFAULT_LONGITUDE,
      zoom: defaultViewport.zoom || DEFAULT_ZOOM,
    });
  }, [defaultViewport]);

  const handleClick = (event) => {
    if (!isFunction(onClick.handle)) return;

    const [longitude, latitude] = event.lngLat;
    setOnClickCoordinates({ longitude, latitude });
    onClick.handle(event);
  };

  return (
    <>
      <div>
        Latitude: {Number(viewport.latitude).toFixed(COORDINATES_DECIMAL)} |
        Longitude: {Number(viewport.longitude).toFixed(COORDINATES_DECIMAL)}
      </div>

      <ReactMapGL
        width={"100%"}
        height={heigth || DEFAULT_HEIGHT}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onClick={handleClick}
        {...viewport}
      >
        <NavigationControl className={classes.navigationControl} />

        {isFunction(onClick.handle) && (
          <Marker
            latitude={onClickCoordinates.latitude || viewport.latitude}
            longitude={onClickCoordinates.longitude || viewport.longitude}
          >
            <Tag color="blue">
              {!coordinates.latitude ? "Click me!" : "Here"}
            </Tag>
          </Marker>
        )}

        {markers.map(({ label, color = null, latitude, longitude }, i) => {
          return (
            <Marker
              key={`${label}-${latitude}-${longitude}-${i}`}
              latitude={latitude}
              longitude={longitude}
            >
              <Tag color={color}> {label}</Tag>
            </Marker>
          );
        })}
      </ReactMapGL>
    </>
  );
};

Map.propTypes = {
  heigth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultViewport: PropTypes.shape({
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zoom: PropTypes.number,
  }),
  onClick: PropTypes.shape({
    handle: PropTypes.func,
    coordinates: PropTypes.shape({
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  }),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      color: PropTypes.oneOf(["blue", "black", "red"]),
    }).isRequired
  ),
};

Map.defaultProps = {
  defaultViewport: {},
  onClick: {},
  markers: [],
};

export default Map;
