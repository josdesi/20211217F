import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { isMaxFileSize } from "../../../../../utils/request";
import { isEmptyArray, isEmptyString } from "../../../../../utils/dataTypes";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import {
  dispatchUploadTalentFile,
  dispatchInitTalentFile,
  dispatchRemoveTalentFileStateId,
  dispatchDestroyTalentFile,
} from "../../../../../redux/actions";
import { toast } from "react-toastify";
import { red } from "@mui/material/colors";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Upload from "./Upload";
import AuthorizeToDisplay from "../../../../../components/AuthorizeToDisplay";
import {
  E_VALIDATION_FAILED,
  TALENT_COMPONENT_ATTACHMENTS_DESTROY,
} from "../../../../../constants";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "600 !important",
  },
  file: {
    display: "flex",
    alignItems: "center",
  },
  file__name: {
    marginRight: 5,
    width: "100%",
  },
  noFiles: {
    color: theme.palette.text.disabled,
  },
  upload: {
    float: "right",
  },
  upload__button: {
    marginRight: "10px !important",
  },
  upload__button__input: {
    display: "none !important",
  },
  error: {
    color: red[500],
  },
  warning: {
    marginBottom: -6,
  },
}));

const Content = ({
  user,
  talent,
  talentFileUpload,
  talentFileDestroy,
  title,
  attachments,
  dispatchUploadTalentFile,
  dispatchDestroyTalentFile,
  dispatchInitTalentFile,
  dispatchRemoveTalentFileStateId,
}) => {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [talentId, setTalentId] = useState(talent.data.id || null);
  const [list, setList] = useState(attachments.list);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);
  useEffect(() => {
    const { id = null } = talent.data;
    if (id !== talentId) {
      setTalentId(id);
    }
  }, [talent]);

  useEffect(() => {
    submitHandler();
  }, [talentId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    Object.entries(talentFileUpload).forEach(([stateId, fileReducer]) => {
      const index = filesToUpload.findIndex(
        (file) => file.value.lastModified == stateId
      );

      if (index !== -1 && fileReducer.success) {
        list.push(fileReducer.payload);
        setList([...list]);
        removePendingFile(stateId);
        dispatchRemoveTalentFileStateId(stateId);
      }

      if (index !== -1 && fileReducer.error) {
        const message =
          fileReducer.payload.code === E_VALIDATION_FAILED
            ? fileReducer.payload.errors[0].message
            : fileReducer.payload.message;

        filesToUpload[index].error = message;
        setFilesToUpload([...filesToUpload]);

        if (!error) {
          setError(error);
        }
      }
    });
  }, [talentFileUpload]);

  useEffect(() => {
    const { success, error: errorFileDestroy, payload } = talentFileDestroy;
    const index = list.findIndex(({ id }) => id === payload.id);
    if (index === -1) return;

    if (success) {
      list.splice(index, 1);
      setList([...list]);
    }

    if (errorFileDestroy) {
      list[index].error = payload.message;
      setList([...list]);
      setError(payload.message);
    }
  }, [talentFileDestroy]);

  const selectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    const { files } = e.target;
    if (!files[0]) return;

    filesToUpload.push({
      error: isMaxFileSize(files[0].size) ? "File is too long" : "",
      value: files[0],
    });

    dispatchInitTalentFile({
      stateId: files[0].lastModified,
    });

    setFilesToUpload([...filesToUpload]);
  };

  const destroyFile = (id) => {
    if (talentId) {
      setError("");
      dispatchDestroyTalentFile({ user, talentId, id });
    }
  };

  const removePendingFile = (lastModified) => {
    const index = filesToUpload.findIndex(
      (file) => file.value.lastModified == lastModified
    );

    if (index !== -1) {
      filesToUpload.splice(index, 1);
      setFilesToUpload([...filesToUpload]);
      dispatchRemoveTalentFileStateId(lastModified);
    }
  };

  const isValidFiles = () => {
    if (isEmptyArray(filesToUpload)) return false;

    return !filesToUpload.some(({ error }) => !isEmptyString(error));
  };

  const submitHandler = () => {
    if (isEmptyArray(filesToUpload)) return;
    setError("");

    for (const file of filesToUpload) {
      const data = new FormData();
      data.append("file", file.value);
      data.append("file_type_code", attachments.fileTypeCode);
      dispatchUploadTalentFile({
        user,
        talentId,
        data,
        stateId: file.value.lastModified,
      });
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12}>
        <Typography className={classes.title} variant="subtitle2">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={7}>
            {isEmptyArray(list) && isEmptyArray(filesToUpload) && (
              <Typography className={classes.noFiles} variant="subtitle2">
                No files here
              </Typography>
            )}

            {list.map(({ id, name, path, error = "" }) => {
              return (
                <>
                  <div key={`file-${id}`} className={classes.file}>
                    <Link
                      key={`file-link-${id}`}
                      className={classes.file__name}
                      href={path}
                      target="_blank"
                      variant="body2"
                      underline="hover"
                      color="inherit"
                    >
                      {name}
                    </Link>

                    <AuthorizeToDisplay
                      name={TALENT_COMPONENT_ATTACHMENTS_DESTROY}
                    >
                      <IconButton
                        key={`file-delete-${id}`}
                        color="primary"
                        onClick={() => destroyFile(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </AuthorizeToDisplay>
                  </div>

                  {!isEmptyString(error) && (
                    <FormHelperText fullWidth>
                      <Typography
                        variant="caption"
                        display="block"
                        className={classes.error}
                      >
                        {error}
                      </Typography>
                    </FormHelperText>
                  )}

                  <Divider />
                </>
              );
            })}

            {filesToUpload.map(({ error, value: { name, lastModified } }) => {
              return (
                <>
                  <div key={`file-${lastModified}`} className={classes.file}>
                    <Link
                      key={`file-link-${lastModified}`}
                      className={classes.file__name}
                      variant="body2"
                      underline="hover"
                      color="inherit"
                    >
                      {name} (Pending){" "}
                      <WarningAmberIcon
                        color="warning"
                        className={classes.warning}
                      />
                    </Link>

                    <IconButton
                      key={`file-delete-${lastModified}`}
                      color="primary"
                      onClick={() => removePendingFile(lastModified)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>

                  {!isEmptyString(error) && (
                    <FormHelperText fullWidth>
                      <Typography
                        variant="caption"
                        display="block"
                        className={classes.error}
                      >
                        {error}
                      </Typography>
                    </FormHelperText>
                  )}
                  <Divider />
                </>
              );
            })}
          </Grid>

          <AuthorizeToDisplay name={TALENT_COMPONENT_ATTACHMENTS_DESTROY}>
            <Upload
              talent={talent}
              classes={classes}
              selectFile={selectFile}
              fileInputRef={fileInputRef}
              handleFileInput={handleFileInput}
              submitHandler={submitHandler}
              isValidFiles={isValidFiles}
            />
          </AuthorizeToDisplay>
        </Grid>
      </Grid>
    </Grid>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
  attachments: PropTypes.shape({
    fileTypeCode: PropTypes.string.isRequired,
    list: PropTypes.array,
    new: PropTypes.array,
  }),
};

Content.defaultProps = {
  attachments: {
    list: [],
  },
};

const mapStateToProps = ({
  user,
  talent,
  talentFileUpload,
  talentFileDestroy,
}) => ({ user, talent, talentFileUpload, talentFileDestroy });

const mapDispatchToProps = {
  dispatchUploadTalentFile,
  dispatchDestroyTalentFile,
  dispatchInitTalentFile,
  dispatchRemoveTalentFileStateId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
