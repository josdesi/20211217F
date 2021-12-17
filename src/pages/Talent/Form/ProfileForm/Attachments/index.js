import React from "react";
import Grid from "@mui/material/Grid";
import FormGridItem from "../../FormGridItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Content from "./Content";
import { isEmptyArray } from "../../../../../utils/dataTypes";
import { styled } from "@mui/material/styles";

const StyledGridContainer = styled(Grid)(() => ({
  marginTop: 25,
  padding: 15,
  background: "#34343C",
}));

const Attachments = ({ talent, attachments }) => {
  return (
    <StyledGridContainer container spacing={0}>
      <FormGridItem item xs={12} md={12}>
        <Typography variant="subtitle" fontWeight={600}>
          Attachments
        </Typography>
      </FormGridItem>

      {!isEmptyArray(attachments) &&
        attachments.map((attachment) => {
          return (
            <FormGridItem
              key={`attachment-grid-${attachment.fileTypeCode}`}
              item
              xs={12}
              md={12}
            >
              <Content
                key={`attachment-content-${attachment.fileTypeCode}`}
                talent={talent}
                title={attachment.title}
                attachments={attachment}
              />
            </FormGridItem>
          );
        })}
    </StyledGridContainer>
  );
};

Attachments.propTypes = {
  talent: PropTypes.shape({
    id: PropTypes.string,
  }),

  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      fileTypeCode: PropTypes.string.isRequired,
      list: PropTypes.array,
    })
  ),
};

Attachments.defaultProps = {
  attachments: [],
};

export default Attachments;
