import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavDrawer from "../../../components/NavDrawer";
import ContentTitle from "../../../components/ContentTitle";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import GpacTab from "../../../components/GpacTab";
import ProfileForm from "./ProfileForm";
import Actions from "./Actions";
import PageLoader from "../../../components/PageLoader";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  validator,
  isValidForm,
  isEmptyArray,
  isEmptyObject,
  toCloneData,
  toNormalizeForm,
  handleResponseError,
} from "../../../utils";
import { makeStyles } from "@mui/styles";
import {
  DRAFT_POST_TYPE,
  PUBLISHED_POST_TYPE,
  RESUME_FILE_TYPE_CODE,
  COVER_LETTER_FILE_TYPE_CODE,
  PORTFOLIO_FILE_TYPE_CODE,
  REFERENCE_CHECK_FILE_TYPE_CODE,
  FEE_AGREEMENT_FILE_TYPE_CODE,
} from "../../../constants";
import {
  dispatchGetStatuses,
  dispatchGetFunctionalTitles,
  dispatchGetSeniorities,
  dispatchGetIndustries,
  dispatchGetLocations,
  dispatchGetCompanies,
  dispatchGetProcessStatuses,
  dispatchGetRelocations,
  dispatchStoreTalent,
  dispatchPatchTalent,
  dispatchDestroyTalent,
  dispatchClearTalent,
  dispatchClearUploadTalentFile,
  dispatchClearGetCompanies,
  dispatchClearLocations,
} from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  workSpace: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },

  actions: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  formSpace: {
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  formSpace__profile__gridItem: {
    padding: 15,
  },

  pageLoader: {
    zIndex: 1,
    width: "100%",
    opacity: 0.8,
    marginTop: -50,
    marginLeft: -50,
  },
}));

const profileTab = "profile";
const resumeTab = "resume";
const socialTab = "social";
const initForm = {
  first_name: {
    label: "First Name",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  last_name: {
    label: "Last Name",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  status_id: {
    label: "Status",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  wish_salary: {
    label: "Wish Salary",
    value: "",
    isValid: false,
    error: "",
    required: true,
    numberRule: {
      greaterThanZero: true,
    },
  },
  funcional_title_id: {
    label: "Funcional Title",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  title: {
    label: "Title",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  seniority_id: {
    label: "Seniority",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  industry_id: {
    label: "Industry",
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
  phone: {
    label: "Phone",
    value: "",
    isValid: false,
    error: "",
    required: true,
    stringRule: {
      max: 18,
      min: 10,
    },
  },
  email: {
    label: "Email",
    value: "",
    isValid: false,
    error: "",
    required: true,
    emailRule: true,
  },
  company_id: {
    label: "Company",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  process_status_id: {
    label: "Status For Process",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  relocation_id: {
    label: "Relocation",
    value: "",
    isValid: false,
    error: "",
    required: true,
  },
  notes: {
    value: "",
    isValid: true,
    error: "",
  },
  post_type: {
    value: "",
    isValid: true,
  },
};

const initAttachments = [
  {
    title: "Resume",
    fileTypeCode: RESUME_FILE_TYPE_CODE,
    list: [],
  },
  {
    title: "Cover Letter",
    fileTypeCode: COVER_LETTER_FILE_TYPE_CODE,
    list: [],
  },
  {
    title: "Portfolio",
    fileTypeCode: PORTFOLIO_FILE_TYPE_CODE,
    list: [],
  },
  {
    title: "Reference Check",
    fileTypeCode: REFERENCE_CHECK_FILE_TYPE_CODE,
    list: [],
  },
  {
    title: "Fee Agreement",
    fileTypeCode: FEE_AGREEMENT_FILE_TYPE_CODE,
    list: [],
  },
];

const TalentForm = ({
  title,
  user,
  talent,
  talentFiles,
  talentFileUpload,
  talentFileDestroy,
  statuses,
  functionalTitles,
  seniorities,
  locations,
  industries,
  companies,
  relocations,
  processStatuses,
  dispatchGetStatuses,
  dispatchGetFunctionalTitles,
  dispatchGetSeniorities,
  dispatchGetIndustries,
  dispatchGetLocations,
  dispatchGetCompanies,
  dispatchGetProcessStatuses,
  dispatchGetRelocations,
  dispatchStoreTalent,
  dispatchPatchTalent,
  dispatchDestroyTalent,
  dispatchClearGetCompanies,
  dispatchClearTalent,
  dispatchClearUploadTalentFile,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const [tab, setTab] = useState(profileTab);
  const [action, setAction] = useState({ triggered: false });
  const [form, setForm] = useState(toCloneData(initForm));
  const [attachments, _] = useState(toCloneData(initAttachments));

  useEffect(() => {
    dispatchGetStatuses(user);
    dispatchGetFunctionalTitles(user);
    dispatchGetSeniorities(user);
    dispatchGetIndustries(user);
    dispatchGetLocations(user);
    dispatchGetCompanies({
      user,
      params: {
        filters: {
          query: {
            orderBy: {
              key: "name",
            },
          },
        },
      },
    });
    dispatchGetProcessStatuses(user);
    dispatchGetRelocations(user);
    mountTalent();
    mountTalentFiles();

    return () => {
      setAction({ triggered: false });
      dispatchClearTalent();
      dispatchClearUploadTalentFile();
      dispatchClearGetCompanies();
      // dispatchClearLocations()
    };
  }, []);

  useEffect(() => {
    if (isValidForm(form)) {
      if (talent.data?.id) {
        dispatchPatchTalent({
          user,
          id: talent.data.id,
          data: toNormalizeForm(form),
        });
      } else {
        dispatchStoreTalent({ user, data: toNormalizeForm(form) });
      }
    }
  }, [form]);

  useEffect(() => {
    const { success, error, payload } = talent;
    if (success && talentFileUpload.emptyStatesId) {
      navigate("/market");
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
  }, [talent]);

  const mountTalent = () => {
    if (isEmptyObject(talent.data)) return;

    Object.keys(talent.data).forEach((inputName) => {
      if (form.hasOwnProperty(inputName)) {
        form[inputName].value = talent.data[inputName];
      }
    });
  };

  const mountTalentFiles = () => {
    if (isEmptyArray(talentFiles.payload)) return;

    talentFiles.payload.forEach((entryFile) => {
      const index = attachments.findIndex(
        (file) => file.fileTypeCode === entryFile.code
      );
      if (index !== -1) {
        attachments[index].list = entryFile.files;
      }
    });
  };

  const tabHandleChange = (event, value) => {
    setTab(value);
  };

  const saveAsDraftOnClick = () => {
    form.post_type.value = DRAFT_POST_TYPE;
    setAction({ triggered: true });
  };

  const saveAndSendToCoachOnClick = () => {
    form.post_type.value = PUBLISHED_POST_TYPE;
    setAction({ triggered: true });
  };

  const discardOnClick = () => {
    if (talent.data?.id) {
      dispatchDestroyTalent({ user, id: talent.data?.id });
    }
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
  };

  const isPageLoading = () => {
    return (
      !statuses.success ||
      !functionalTitles.success ||
      !seniorities.success ||
      !locations.success ||
      !industries.success ||
      !companies.success ||
      !processStatuses.success ||
      !relocations.success
    );
  };

  const isFormProcessing = () => {
    return (
      talent.loading || talentFileUpload.loading || talentFileDestroy.loading
    );
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
            to: "/market",
          },
        }}
      >
        <Grid container spacing={5}>
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

          <Grid className={classes.workSpace} item xs={12} md={12}>
            <div className={classes.actions}>
              <Actions
                saveAsDraft={{
                  onClick: saveAsDraftOnClick,
                }}
                saveAndSendToCoach={{
                  onClick: saveAndSendToCoachOnClick,
                }}
                discard={{
                  onClick: discardOnClick,
                }}
              />
            </div>

            <div className={classes.formSpace}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    className={classes.tab}
                    value={tab}
                    textColor={theme.palette.text.primary}
                    indicatorColor={theme.palette.background.paperSecondary}
                    onChange={tabHandleChange}
                  >
                    <GpacTab value="profile" label="Profile" />
                    <GpacTab value="resume" label="Resume" />
                    <GpacTab value="social" label="Social Profiles" />
                  </Tabs>
                </Grid>

                <Grid item xs={12} md={12}>
                  {tab === profileTab && (
                    <ProfileForm
                      form={form}
                      action={action}
                      formHandleChange={formHandleChange}
                      attachments={attachments}
                    />
                  )}

                  {tab === resumeTab && "Resume"}
                  {tab === socialTab && "Social Profiles"}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </NavDrawer>
    </>
  );
};

const mapStateToProps = ({
  user,
  talent,
  talentFiles,
  talentFileUpload,
  talentFileDestroy,
  statuses,
  functionalTitles,
  seniorities,
  locations,
  industries,
  companies,
  processStatuses,
  relocations,
}) => ({
  user,
  talent,
  talentFiles,
  talentFileUpload,
  talentFileDestroy,
  statuses,
  functionalTitles,
  seniorities,
  locations,
  industries,
  companies,
  processStatuses,
  relocations,
});

const mapDispatchToProps = {
  dispatchGetStatuses,
  dispatchGetFunctionalTitles,
  dispatchGetSeniorities,
  dispatchGetIndustries,
  dispatchGetLocations,
  dispatchGetCompanies,
  dispatchGetProcessStatuses,
  dispatchGetRelocations,
  dispatchStoreTalent,
  dispatchPatchTalent,
  dispatchDestroyTalent,
  dispatchClearLocations,
  dispatchClearGetCompanies,
  dispatchClearTalent,
  dispatchClearUploadTalentFile,
};

TalentForm.propTypes = {
  title: PropTypes.string,
};

TalentForm.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TalentForm);
