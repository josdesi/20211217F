import React from "react";
import Grid from "@mui/material/Grid";
import GpacButton from "../../../../../../components/GpacButton";
import Input from "@mui/material/Input";
import PublishIcon from "@mui/icons-material/Publish";

const Upload = ({
  talent,
  classes,
  selectFile,
  fileInputRef,
  handleFileInput,
  submitHandler,
  isValidFiles,
}) => {
  return (
    <Grid item xs={12} md={5}>
      <div className={classes.upload}>
        <GpacButton
          variant="outlined"
          className={classes.upload__button}
          endIcon={<PublishIcon />}
          color="grey"
          type="file"
          onClick={selectFile}
        >
          <Input
            className={classes.upload__button__input}
            inputRef={fileInputRef}
            type="file"
            onChange={handleFileInput}
            inputProps={{
              accept: ".pdf",
            }}
          />
          Upload new file
        </GpacButton>

        {talent.data.id && (
          <GpacButton
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={!isValidFiles()}
          >
            Submit
          </GpacButton>
        )}
      </div>
    </Grid>
  );
};

export default Upload;
