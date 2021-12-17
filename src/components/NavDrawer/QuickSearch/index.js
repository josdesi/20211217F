import React from "react";
import GpacInput from "../../GpacInput";
import { connect } from "react-redux";
import { dispatchSetSearcherData } from "../../../redux/actions";
import debounce from "lodash/debounce";

const QuickSearch = ({ searcher, dispatchSetSearcherData }) => {
  const setSearcherData = debounce(dispatchSetSearcherData, 500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearcherData({
      quickSearch: value,
    });
  };

  return (
    <GpacInput
      id={"id"}
      name={"name"}
      type={"text"}
      placeholder={"Quick Search..."}
      defaultValue={searcher.quickSearch}
      onChange={handleChange}
      inputstyle={{
        background: "transparent",
      }}
    />
  );
};

const mapStateToProps = ({ searcher }) => ({ searcher });

const mapDispatchToProps = {
  dispatchSetSearcherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);
