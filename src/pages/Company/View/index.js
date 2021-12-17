import React, { useEffect, useState } from "react";
import Form from "../Form";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoader from "../../../components/PageLoader";
import { toast } from "react-toastify";
import { E_VALIDATION_FAILED } from "../../../constants/request";
import {
  dispatchInitCompany,
  dispatchGetCompany,
} from "../../../redux/actions";

const handleResponseError = (payload) => {
  if (payload.code === E_VALIDATION_FAILED) {
    toast.error(payload.errors[0].message);
  } else {
    toast.error(payload.message);
  }
};

const View = ({ user, company, dispatchInitCompany, dispatchGetCompany }) => {
  const { id } = useParams();
  const [dispached, setDispached] = useState(false);

  useEffect(() => {
    dispatchGetCompany({ user, id });

    return () => {
      setDispached(false);
    };
  }, []);

  useEffect(() => {
    if (dispached) return;

    const { success, error, payload } = company;
    if (success) {
      dispatchInitCompany();
      setDispached(true);
    }

    if (error) {
      handleResponseError(payload);
    }
  }, [company]);

  if (!dispached) {
    return <PageLoader />;
  }

  return <Form key={`company-form-${id}`} title={"Company"} />;
};

const mapStateToProps = ({ user, company }) => ({
  user,
  company,
});

const mapDispatchToProps = {
  dispatchInitCompany,
  dispatchGetCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
