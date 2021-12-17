import React, { useEffect, useState } from "react";
import Form from "../Form";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoader from "../../../components/PageLoader";
import { toast } from "react-toastify";
import { E_VALIDATION_FAILED } from "../../../constants/request";
import {
  dispatchInitTalent,
  dispatchGetTalent,
  dispatchGetAllTalentFiles,
  dispatchClearTalentFiles,
} from "../../../redux/actions";

const handleResponseError = (payload) => {
  if (payload.code === E_VALIDATION_FAILED) {
    toast.error(payload.errors[0].message);
  } else {
    toast.error(payload.message);
  }
};

const View = ({
  user,
  talent,
  talentFiles,
  dispatchInitTalent,
  dispatchGetTalent,
  dispatchGetAllTalentFiles,
  dispatchClearTalentFiles,
}) => {
  const { id } = useParams();
  const [dispached, setDispached] = useState(false);

  useEffect(() => {
    dispatchGetTalent({ user, id });

    return () => {
      setDispached(false);
      dispatchClearTalentFiles();
    };
  }, []);

  useEffect(() => {
    if (dispached) return;

    const { success, error, payload } = talent;
    if (success) {
      dispatchInitTalent();
      dispatchGetAllTalentFiles({ user, id });
    }

    if (error) {
      handleResponseError(payload);
    }
  }, [talent]);

  useEffect(() => {
    if (dispached) return;

    const { success, error, payload } = talentFiles;
    if (success) {
      setDispached(true);
    }

    if (error) {
      handleResponseError(payload);
    }
  }, [talentFiles]);

  if (!dispached) {
    return <PageLoader />;
  }

  return <Form key={`talent-form-${id}`} title={"Talent"} />;
};

const mapStateToProps = ({ user, talent, talentFiles }) => ({
  user,
  talent,
  talentFiles,
});

const mapDispatchToProps = {
  dispatchInitTalent,
  dispatchGetTalent,
  dispatchGetAllTalentFiles,
  dispatchClearTalentFiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
