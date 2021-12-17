import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import GpacInputFormControl from "../../../../components/GpacInputFormControl";
import GpacSelectFormControl from "../../../../components/GpacSelectFormControl";
import { connect } from "react-redux";
import { isEmptyArray, isDirector } from "../../../../utils";
import PropTypes from "prop-types";
import FormGridItem from "../FormGridItem";
import Attachments from "./Attachments";
import Notes from "./Notes";
import { toast } from "react-toastify";

const toNormalizeItems = (items) => {
  if (isEmptyArray(items)) return [];

  return items.map(({ id, name }) => {
    return { label: name, value: id };
  });
};

const toNormalizeLocations = (items) => {
  if (isEmptyArray(items)) return [];

  return items.map(({ id, code, name }) => {
    return { label: `${name} (${code})`, value: id };
  });
};

const ProfileForm = ({
  form,
  formHandleChange,
  action,
  attachments,
  user,
  statusesReducer,
  functionalTitlesReducer,
  senioritiesReducer,
  locationsReducer,
  industriesReducer,
  companiesReducer,
  processStatusesReducer,
  relocationsReducer,
}) => {
  const [statuses, setStatuses] = useState([]);
  const [functionalTitles, setFunctionalTitles] = useState([]);
  const [seniorities, setSeniorities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [processStatuses, setProcessStatuses] = useState([]);
  const [relocations, setRelocations] = useState([]);

  useEffect(() => {
    const { success, payload } = statusesReducer;
    if (success) {
      setStatuses(toNormalizeItems(payload));
    }
  }, [statusesReducer]);

  useEffect(() => {
    const { success, payload } = functionalTitlesReducer;
    if (success) {
      setFunctionalTitles(toNormalizeItems(payload));
    }
  }, [functionalTitlesReducer]);

  useEffect(() => {
    const { success, payload } = senioritiesReducer;
    if (success) {
      setSeniorities(toNormalizeItems(payload));
    }
  }, [senioritiesReducer]);

  useEffect(() => {
    const { success, payload } = industriesReducer;
    if (success) {
      setIndustries(toNormalizeItems(payload));
    }
  }, [industriesReducer]);

  useEffect(() => {
    const { success, payload } = locationsReducer;
    if (success) {
      setLocations(toNormalizeLocations(payload));
    }
  }, [locationsReducer]);

  useEffect(() => {
    const { success, payload } = companiesReducer;
    if (success) {
      setCompanies(toNormalizeItems(payload.data));
      if (isEmptyArray(payload.data)) {
        let message =
          "Companies are empty. To continue you must have some company. ";
        if (!isDirector(user)) {
          message += "Only directors has permissions to create them.";
        }

        toast.warning(message);
      }
    }
  }, [companiesReducer]);

  useEffect(() => {
    const { success, payload } = processStatusesReducer;
    if (success) {
      setProcessStatuses(toNormalizeItems(payload));
    }
  }, [processStatusesReducer]);

  useEffect(() => {
    const { success, payload } = relocationsReducer;
    if (success) {
      setRelocations(toNormalizeItems(payload));
    }
  }, [relocationsReducer]);

  useEffect(() => {
    if (action.triggered) {
      formHandleChange(form);
    }
  }, [action]);

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    form[name] = {
      ...form[name],
      value,
    };
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        style={{
          marginTop: -16,
          padding: 15,
          background: "#34343C",
        }}
      >
        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="first-name-input"
            inputLabel={form.first_name.label}
            error={form.first_name.error}
            input={{
              id: "first_name",
              name: "first_name",
              type: "text",
              placeholder: "Text",
              defaultValue: form.first_name.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="last-name-input"
            inputLabel={form.last_name.label}
            error={form.last_name.error}
            input={{
              id: "last_name",
              name: "last_name",
              type: "text",
              placeholder: "Text",
              defaultValue: form.last_name.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="status-input"
            inputLabel={form.status_id.label}
            error={form.status_id.error}
            input={{
              items: statuses,
              id: "status_id",
              name: "status_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.status_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="wish-salary-input"
            inputLabel={form.wish_salary.label}
            error={form.wish_salary.error}
            input={{
              id: "wish_salary",
              name: "wish_salary",
              type: "number",
              placeholder: "Text",
              defaultValue: form.wish_salary.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="functional-title-input"
            inputLabel={form.funcional_title_id.label}
            error={form.funcional_title_id.error}
            input={{
              items: functionalTitles,
              id: "funcional_title_id",
              name: "funcional_title_id",
              defaultValue: form.funcional_title_id.value,
              type: "text",
              placeholder: "Select",
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="title-input"
            inputLabel={form.title.label}
            error={form.title.error}
            input={{
              id: "title",
              name: "title",
              type: "text",
              placeholder: "Text",
              defaultValue: form.title.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="seniority-input"
            inputLabel={form.seniority_id.label}
            error={form.seniority_id.error}
            input={{
              items: seniorities,
              id: "seniority_id",
              name: "seniority_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.seniority_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="industry-input"
            inputLabel={form.industry_id.label}
            error={form.industry_id.error}
            input={{
              items: industries,
              id: "industry_id",
              name: "industry_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.industry_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="location-input"
            inputLabel={form.location_id.label}
            error={form.location_id.error}
            input={{
              items: locations,
              id: "location_id",
              name: "location_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.location_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="phone-input"
            inputLabel={form.phone.label}
            error={form.phone.error}
            input={{
              id: "phone",
              name: "phone",
              type: "text",
              placeholder: "Text",
              defaultValue: form.phone.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacInputFormControl
            key="email-input"
            inputLabel={form.email.label}
            error={form.email.error}
            input={{
              id: "email",
              name: "email",
              type: "email",
              placeholder: "Text",
              defaultValue: form.email.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="company-input"
            inputLabel={form.company_id.label}
            error={form.company_id.error}
            input={{
              items: companies,
              id: "company_id",
              name: "company_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.company_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="process-status-input"
            inputLabel={form.process_status_id.label}
            error={form.process_status_id.error}
            input={{
              items: processStatuses,
              id: "process_status_id",
              name: "process_status_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.process_status_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>

        <FormGridItem item xs={12} md={4}>
          <GpacSelectFormControl
            key="relocation-input"
            inputLabel={form.relocation_id.label}
            error={form.relocation_id.error}
            input={{
              items: relocations,
              id: "relocation_id",
              name: "relocation_id",
              type: "text",
              placeholder: "Select",
              defaultValue: form.relocation_id.value,
              onChange: handleChange,
            }}
          />
        </FormGridItem>
      </Grid>

      <Attachments action={action} attachments={attachments} />
      <Notes value={form.notes.value} handleChange={handleChange} />
    </>
  );
};

const mapStateToProps = ({
  user,
  statuses: statusesReducer,
  functionalTitles: functionalTitlesReducer,
  seniorities: senioritiesReducer,
  locations: locationsReducer,
  industries: industriesReducer,
  companies: companiesReducer,
  processStatuses: processStatusesReducer,
  relocations: relocationsReducer,
}) => ({
  user,
  statusesReducer,
  functionalTitlesReducer,
  senioritiesReducer,
  locationsReducer,
  industriesReducer,
  companiesReducer,
  processStatusesReducer,
  relocationsReducer,
});

const mapDispatchToProps = {};

ProfileForm.propTypes = {
  form: PropTypes.object.isRequired,
  formHandleChange: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  form: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
