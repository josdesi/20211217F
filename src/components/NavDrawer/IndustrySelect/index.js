import React, { useEffect, useState } from "react";
import GpacMultipleSelectFormControl from "../../GpacMultipleSelectFormControl";
import { connect } from "react-redux";
import { toNormalizeForSelect } from "../../../utils";
import {
  dispatchSetSearcherData,
  dispatchGetIndustries,
} from "../../../redux/actions";

const IndustrySelect = ({
  user,
  searcher,
  disabled,
  industriesReducer,
  dispatchSetSearcherData,
  dispatchGetIndustries,
}) => {
  const [industries, setIndustries] = useState([]);
  const [selected, setSelected] = useState(searcher.industries || []);

  useEffect(() => {
    dispatchGetIndustries(user);
  }, []);

  useEffect(() => {
    const { success, payload } = industriesReducer;
    if (success) {
      setIndustries(toNormalizeForSelect(payload, "id", "name"));
    }
  }, [industriesReducer]);

  const handleChange = (_, value) => {
    setSelected(value);
    dispatchSetSearcherData({
      industries: value,
    });
  };

  return (
    <GpacMultipleSelectFormControl
      key="industry-select"
      renderValue={false}
      input={{
        items: industries,
        defaultValue: selected,
        id: "industry",
        name: "industry",
        type: "industry",
        placeholder: "Industry",
        disabled,
        onChange: handleChange,
        style: {
          backgroundColor: "transparent",
        },
      }}
    />
  );
};

const mapStateToProps = ({ searcher, user, industries: industriesReducer }) => {
  return { searcher, user, industriesReducer };
};

const mapDispatchToProps = {
  dispatchSetSearcherData,
  dispatchGetIndustries,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndustrySelect);
