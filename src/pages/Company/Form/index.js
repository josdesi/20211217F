import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavDrawer from "../../../components/NavDrawer";
import ContentTitle from "../../../components/ContentTitle";
import GpacButton from "../../../components/GpacButton";
import Grid from "@mui/material/Grid";
import FormControl from "./FormControl";
import PageLoader from "../../../components/PageLoader";
import AuthorizeToDisplay from "../../../components/AuthorizeToDisplay";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  validator,
  isValidForm,
  isEmptyObject,
  toCloneData,
  toNormalizeForm,
  handleResponseError,
} from "../../../utils";
import { COMPANY_COMPONENT_SAVE } from "../../../constants";
import {
  dispatchGetLocations,
  dispatchGetCurrencies,
  dispatchStoreCompany,
  dispatchPatchCompany,
  dispatchClearCompany,
  dispatchGetCompanyTypes,
} from "../../../redux/actions";

// const useStyles = makeStyles(() => ({
//   pageLoader: {
//     zIndex: 1,
//     width: "100%",
//     opacity: 0.8,
//     marginTop: -50,
//     marginLeft: -50,
//   },
// }));

const initForm = {
  name: {
    label: "Name",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  email: {
    label: "Email",
    value: "",
    isValid: false,
    error: "",
    required: true,
    emailRule: true,
  },
  phone: {
    label: "Phone",
    value: "",
    isValid: false,
    error: "",
    required: false,
    stringRule: {
      max: 18,
      min: 10,
    },
  },
  company_type_id: {
    label: "Type",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  location_id: {
    label: "Location",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  currency_id: {
    label: "Currency",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  latitude: {
    label: "Latitude",
    value: "",
    isValid: true,
    error: "",
  },
  longitude: {
    label: "Longitude",
    value: "",
    isValid: true,
    error: "",
  },
};

const CompanyForm = ({
  title,
  user,
  company,
  locations,
  currencies,
  companyTypes,
  dispatchGetLocations,
  dispatchGetCurrencies,
  dispatchGetCompanyTypes,
  dispatchStoreCompany,
  dispatchPatchCompany,
  dispatchClearCompany,
}) => {
  const navigate = useNavigate();
  const [action, setAction] = useState({ triggered: false });
  const [form, setForm] = useState(toCloneData(initForm));

  useEffect(() => {
    dispatchGetLocations(user);
    dispatchGetCurrencies(user);
    dispatchGetCompanyTypes(user);
    mountCompany();

    return () => {
      setAction({ triggered: false });
      dispatchClearCompany();
    };
  }, []);

  useEffect(() => {
    const { success, error, payload } = company;
    if (success) {
      navigate("/companies");
    }

    if (error) {
      const { message, field } = handleResponseError(payload);
      toast.error(message);

      if (form.hasOwnProperty(field)) {
        form[field].error = error.message;
        form[field].isValid = false;
        setForm({ ...form });
      }
    }
  }, [company]);

  const mountCompany = () => {
    if (isEmptyObject(company.data)) return;
    Object.keys(company.data).forEach((inputName) => {
      if (form.hasOwnProperty(inputName)) {
        form[inputName].value = company.data[inputName];
      }
    });
  };

  const handleSave = () => {
    setAction({ triggered: true });
  };

  const formHandleChange = (form) => {
    let errorMessage = "";

    Object.keys(form).forEach((inputName) => {
      form[inputName] = {
        ...validator(form[inputName]),
      };

      if (!form[inputName].isValid && !errorMessage) {
        errorMessage = `Error in ${form[inputName].label}: ${form[inputName].error}`;
        toast.error(errorMessage);
      }
    });

    setForm({ ...form });

    if (isValidForm(form)) {
      if (company.data?.id) {
        dispatchPatchCompany({
          user,
          id: company.data.id,
          data: toNormalizeForm(form),
        });
      } else {
        dispatchStoreCompany({ user, data: toNormalizeForm(form) });
      }
    }
  };

  const isPageLoading = () => {
    return !locations.success || !currencies.success || !companyTypes.success;
  };

  const isFormProcessing = () => {
    return company.loading;
  };

  if (isPageLoading()) {
    return <PageLoader />;
  }

  return (
    <>
      <NavDrawer
        appBar={{
          arrowBack: {
            show: true,
            to: "/companies",
          },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ContentTitle title={title} />
          </Grid>

          {isFormProcessing() && (
            <div
              style={{
                zIndex: 1,
                position: "fixed",
                width: "100%",
                opacity: 0.8,
                marginTop: -80,
                marginLeft: -120,
              }}
            >
              <PageLoader />
            </div>
          )}

          <Grid item xs={12} md={12}>
            <FormControl
              form={form}
              action={action}
              formHandleChange={formHandleChange}
            />
          </Grid>

          <Grid
            item
            container
            style={{
              position: "sticky",
              bottom: 0,
            }}
            direction="column"
            justify="center"
            alignItems="center"
            xs={12}
            md={12}
          >
            <AuthorizeToDisplay name={COMPANY_COMPONENT_SAVE}>
              <GpacButton
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save Company
              </GpacButton>
            </AuthorizeToDisplay>
          </Grid>
        </Grid>
      </NavDrawer>
    </>
  );
};

const mapStateToProps = ({
  user,
  company,
  locations,
  currencies,
  companyTypes,
}) => ({
  user,
  company,
  locations,
  currencies,
  companyTypes,
});

const mapDispatchToProps = {
  dispatchGetLocations,
  dispatchGetCurrencies,
  dispatchGetCompanyTypes,
  dispatchStoreCompany,
  dispatchPatchCompany,
  dispatchClearCompany,
};

CompanyForm.propTypes = {
  title: PropTypes.string,
};

CompanyForm.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
