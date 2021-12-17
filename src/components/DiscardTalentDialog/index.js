import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import GpacButton from "../GpacButton";

const Discard = ({ talent, open, handleClose, handleDiscard }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Are you sure you want to discard {talent.name} talent?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          This action can&apos;t be reverted after to process this request
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <GpacButton
          color="grey"
          onClick={() => handleDiscard(talent.id)}
          autoFocus
        >
          Yes! Discard
        </GpacButton>

        <GpacButton variant="contained" autoFocus onClick={handleClose}>
          Cancel
        </GpacButton>
      </DialogActions>
    </Dialog>
  );
};

Discard.propTypes = {
  talent: PropTypes.shape({
    id: PropTypes.any,
  }),
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDiscard: PropTypes.func.isRequired,
};

Discard.defaultProps = {
  talent: {},
  open: false,
};

export default Discard;
