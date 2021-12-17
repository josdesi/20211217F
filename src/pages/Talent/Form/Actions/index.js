import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import GpacButton from "../../../../components/GpacButton";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { isDraft, isEmptyString } from "../../../../utils";
import AuthorizeToDisplay from "../../../../components/AuthorizeToDisplay";
import DiscardTalentDialog from "../../../../components/DiscardTalentDialog";
import {
  TALENT_COMPONENT_SAVE_AS_DRAFT,
  TALENT_COMPONENT_SAVE_AND_SEND_TO_COACH,
  TALENT_COMPONENT_DISCARD,
  DEFAULT_PROFILE_SRC,
} from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  actions__container: {
    position: "sticky",
    top: "11%",
    [theme.breakpoints.down("md")]: {
      top: 0,
      height: "auto",
      position: "inherit",
    },
  },
  actions__gridItem: {
    justifyContent: "center",
    display: "flex",
  },

  actions__avatar: {
    width: "200px !important",
    height: "200px !important",
  },
}));

const Actions = ({ talent, saveAsDraft, saveAndSendToCoach, discard }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDiscard = () => {
    discard.onClick();
    setOpen(false);
  };

  return (
    <>
      <AuthorizeToDisplay name={TALENT_COMPONENT_DISCARD}>
        <DiscardTalentDialog
          talent={{
            name: talent.fullname,
          }}
          open={open}
          handleClose={handleClose}
          handleDiscard={handleDiscard}
        />
      </AuthorizeToDisplay>

      <Grid
        container
        spacing={2}
        alignContent="center"
        alignItems="center"
        textAlign="center"
        className={classes.actions__container}
      >
        <Grid item xs={12} md={12} className={classes.actions__gridItem}>
          <Avatar className={classes.actions__avatar} src={DEFAULT_PROFILE_SRC}/>
        </Grid>

        <Grid className={classes.actions__gridItem} item xs={12} md={12}>
          <div style={{ display: "block", width: 250 }}>
            <AuthorizeToDisplay name={TALENT_COMPONENT_SAVE_AS_DRAFT}>
              {isDraft(talent.data.post_type) ||
                (isEmptyString(talent.data.post_type) && (
                  <GpacButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: 30 }}
                    onClick={saveAsDraft.onClick}
                  >
                    Save As Draft
                  </GpacButton>
                ))}
            </AuthorizeToDisplay>

            <AuthorizeToDisplay name={TALENT_COMPONENT_SAVE_AND_SEND_TO_COACH}>
              <GpacButton
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: 30 }}
                onClick={saveAndSendToCoach.onClick}
              >
                Save And Send To Coach
              </GpacButton>
            </AuthorizeToDisplay>

            <AuthorizeToDisplay name={TALENT_COMPONENT_DISCARD}>
              {talent.data.id && (
                <GpacButton
                  fullWidth
                  variant="outlined"
                  color="grey"
                  onClick={handleOpen}
                >
                  Discard
                </GpacButton>
              )}
            </AuthorizeToDisplay>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

Actions.propTypes = {
  saveAsDraft: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }),
  saveAndSendToCoach: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }),
  discard: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }),
};

Actions.defaultProps = {
  saveAsDraft: {},
  saveAndSendToCoach: {},
  discard: {},
};

const mapStateToProps = ({ talent }) => {
  return { talent };
};

export default connect(mapStateToProps)(Actions);
