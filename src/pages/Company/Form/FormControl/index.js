import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import GpacInputFormControl from "../../../../components/GpacInputFormControl";
import GpacSelectFormControl from "../../../../components/GpacSelectFormControl";
import { connect } from "react-redux";
import {
  isEmptyObject,
  hasPermission,
  toNormalizeLocations,
  toNormalizeCurrency,
  toNormalizeForSelect,
} from "../../../../utils";
import PropTypes from "prop-types";
import FormGridItem from "../../../../components/FormGridItem";
import Map from "../../../../components/Map";
import {
  COORDINATES_DECIMAL,
  COMPANY_COMPONENT_SAVE,
} from "../../../../constants";

const getLocationCoordinates = (locations, location_id) => {
  const location = locations.find((location) => location.id === location_id);

  return {
    latitude: location?.latitude,
    longitude: location?.longitude,
  };
};

const ProfileForm = ({
  user,
  form: formDefault,
  formHandleChange,
  action,
  locationsReducer,
  currenciesReducer,
  companyTypesReducer,
}) => {
  const [form, setForm] = useState(formDefault);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [defaultViewport, setDefaultViewport] = useState({});

  useEffect(() => {
    const { success, payload } = locationsReducer;
    if (success) {
      setLocations(toNormalizeLocations(payload));
      setDefaultViewport(
        getLocationCoordinates(payload, form.location_id.value)
      );
    }
  }, [locationsReducer]);

  useEffect(() => {
    const { success, payload } = currenciesReducer;
    if (success) {
      setCurrencies(toNormalizeCurrency(payload));
    }
  }, [currenciesReducer]);

  useEffect(() => {
    const { success, payload } = companyTypesReducer;
    if (success) {
      setCompanyTypes(toNormalizeForSelect(payload, "id", "name"));
    }
  }, [companyTypesReducer]);

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

    if (name === "location_id") {
      setDefaultViewport(
        getLocationCoordinates(locationsReducer.payload, form.location_id.value)
      );
    }
  };

  const handleMapOnClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    form.latitude.value = Number(latitude).toFixed(COORDINATES_DECIMAL);
    form.longitude.value = Number(longitude).toFixed(COORDINATES_DECIMAL);
    setForm({ ...form });
  };

  const getMapProps = () => {
    const props = {
      defaultViewport,
    };

    if (hasPermission(user, COMPANY_COMPONENT_SAVE)) {
      props.onClick = {
        handle: handleMapOnClick,
        coordinates: {
          latitude: form.latitude.value,
          longitude: form.longitude.value,
        },
      };
    } else if (form.latitude.value && form.longitude.value) {
      props.markers = [
        {
          label: form.name.value,
          latitude: form.latitude.value,
          longitude: form.longitude.value,
        },
      ];
    }

    return props;
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        style={{
          background: "#34343C",
        }}
      >
        <Grid item xs={12} md={6}>
          <Grid container>
            <FormGridItem item xs={12} md={6}>
              <GpacInputFormControl
                key="name-input"
                inputLabel={form.name.label}
                error={form.name.error}
                input={{
                  id: "name",
                  name: "name",
                  type: "text",
                  placeholder: "Text",
                  defaultValue: form.name.value,
                  onChange: handleChange,
                }}
              />
            </FormGridItem>

            <FormGridItem item xs={12} md={6}>
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

            <FormGridItem item xs={12} md={6}>
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

            <FormGridItem item xs={12} md={6}>
              <GpacSelectFormControl
                key="company-type-input"
                inputLabel={form.company_type_id.label}
                error={form.company_type_id.error}
                input={{
                  items: companyTypes,
                  id: "company_type_id",
                  name: "company_type_id",
                  type: "text",
                  placeholder: "Select",
                  defaultValue: form.company_type_id.value,
                  onChange: handleChange,
                }}
              />
            </FormGridItem>

            <FormGridItem item xs={12} md={6}>
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

            <FormGridItem item xs={12} md={6}>
              <GpacSelectFormControl
                key="currency-input"
                inputLabel={form.currency_id.label}
                error={form.currency_id.error}
                input={{
                  items: currencies,
                  id: "currency_id",
                  name: "currency_id",
                  type: "text",
                  placeholder: "Select",
                  defaultValue: form.currency_id.value,
                  onChange: handleChange,
                }}
              />
            </FormGridItem>

            <FormGridItem item xs={12} md={6}>
              <GpacInputFormControl
                key="latitude-input"
                inputLabel={form.latitude.label}
                error={form.latitude.error}
                input={{
                  id: "latitude",
                  name: "latitude",
                  type: "text",
                  placeholder: "Click on the map",
                  value: form.latitude.value,
                  disabled: true,
                  onChange: handleChange,
                }}
              />
            </FormGridItem>

            <FormGridItem item xs={12} md={6}>
              <GpacInputFormControl
                key="longitude-input"
                inputLabel={form.longitude.label}
                error={form.longitude.error}
                input={{
                  id: "longitude",
                  name: "longitude",
                  type: "text",
                  placeholder: "Click on the map",
                  value: form.longitude.value,
                  disabled: true,
                  onChange: handleChange,
                }}
              />
            </FormGridItem>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {!isEmptyObject(defaultViewport) && (
            <Map {...getMapProps()} heigth={350} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({
  user,
  locations: locationsReducer,
  currencies: currenciesReducer,
  companyTypes: companyTypesReducer,
}) => ({
  user,
  locationsReducer,
  currenciesReducer,
  companyTypesReducer,
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
