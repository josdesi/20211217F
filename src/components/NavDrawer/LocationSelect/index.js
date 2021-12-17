import React, { useEffect, useState } from "react";
import GpacMultipleSelectFormControl from "../../GpacMultipleSelectFormControl";
import { connect } from "react-redux";
import { isEmptyArray } from "../../../utils/dataTypes";
import {
  dispatchSetSearcherData,
  dispatchGetLocations,
} from "../../../redux/actions";

const toNormalizeItems = (items) => {
  if (isEmptyArray(items)) return [];

  return items.map(({ id, code, name }) => {
    return { label: `${name} (${code})`, value: id };
  });
};

const LocationSelect = ({
  user,
  searcher,
  locationsReducer,
  dispatchSetSearcherData,
  dispatchGetLocations,
}) => {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(searcher.locations || []);

  useEffect(() => {
    dispatchGetLocations(user);
  }, []);

  useEffect(() => {
    const { success, payload } = locationsReducer;
    if (success) {
      setLocations(toNormalizeItems(payload));
    }
  }, [locationsReducer]);

  const handleChange = (_, value) => {
    setSelected(value);
    dispatchSetSearcherData({
      locations: value,
    });
  };

  return (
    <GpacMultipleSelectFormControl
      key="location-select"
      renderValue={false}
      input={{
        items: locations,
        defaultValue: selected,
        id: "location",
        name: "location",
        type: "location",
        placeholder: "Location",
        onChange: handleChange,
        style: {
          backgroundColor: "transparent",
        },
      }}
    />
  );
};

const mapStateToProps = ({ searcher, user, locations: locationsReducer }) => {
  return { searcher, user, locationsReducer };
};

const mapDispatchToProps = {
  dispatchSetSearcherData,
  dispatchGetLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelect);
