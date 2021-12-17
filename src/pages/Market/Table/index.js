import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GpacButton from "../../../components/GpacButton";
import Table from "../../../components/GpacTable/Table";
import TableContainer from "../../../components/GpacTable/TableContainer";
import TableHead from "../../../components/GpacTable/TableHead";
import TableRow from "../../../components/GpacTable/TableRow";
import AuthorizeToDisplay from "../../../components/AuthorizeToDisplay";
import DiscardTalentDialog from "../../../components/DiscardTalentDialog";
import TableBody from "../../../components/GpacTable/TableBody";
import TableCell from "../../../components/GpacTable/TableCell";
import NameColumn from "./NameColumn";
import { Link } from "react-router-dom";
import { toFormatCurrency, isEmptyArray } from "../../../utils";
import { TALENT_COMPONENT_DISCARD } from "../../../constants";
import Advertisement from "../../../components/Advertisement";
import { dispatchDestroyTalent } from "../../../redux/actions";

const MarketTable = ({
  user,
  talentReducer,
  talentsReducer,
  dispatchDestroyTalent,
}) => {
  const [talents, setTalents] = useState(talentsReducer.payload.data || []);
  const [open, setOpen] = useState(false);
  const [talentToDiscard, setTalentToDiscard] = useState({});

  useEffect(() => {
    const { success } = talentReducer;
    if (success) {
      const index = talents.findIndex(
        (talent) => talent.id === talentToDiscard.id
      );
      if (index !== -1) {
        talents.splice(index, 1);
        setTalents([...talents]);
      }
    }
  }, [talentReducer]);
  
  const handleOpen = (talent) => {
    setTalentToDiscard(talent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDiscard = (id) => {
    const exists = talents.some((talent) => talent.id === id);
    if (exists) {
      dispatchDestroyTalent({ user, id });
    }

    setOpen(false);
  };

  if (isEmptyArray(talents)) {
    return <Advertisement text={"Oops, your market is empty"} />;
  }

  return (
    <>
      <DiscardTalentDialog
        talent={talentToDiscard}
        open={open}
        handleClose={handleClose}
        handleDiscard={handleDiscard}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Industry</TableCell>
              <TableCell align="right">Job Position</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {talents.map((talent) => (
              <TableRow hover key={talent.id} style={{}}>
                <TableCell>
                  <NameColumn
                    name={talent.fullname}
                    title={talent.title}
                    postType={talent.post_type}
                  />
                </TableCell>
                <TableCell align="right">{talent.industry?.name}</TableCell>
                <TableCell align="right">
                  {talent.funcionalTitle?.name}
                </TableCell>
                <TableCell align="right">{talent.phone}</TableCell>
                <TableCell align="right">
                  ${toFormatCurrency(talent.wish_salary)}
                </TableCell>
                <TableCell align="right">{talent.location.code}</TableCell>
                <TableCell align="center">
                  <GpacButton
                    variant="outlined"
                    to={`/talent/${talent.id}`}
                    component={Link}
                    color="grey"
                  >
                    View Profile
                  </GpacButton>

                  <AuthorizeToDisplay name={TALENT_COMPONENT_DISCARD}>
                    <GpacButton
                      variant="outlined"
                      onClick={() =>
                        handleOpen({
                          id: talent.id,
                          name: talent.fullname,
                        })
                      }
                      color="grey"
                      style={{ marginLeft: 5 }}
                    >
                      Discard
                    </GpacButton>
                  </AuthorizeToDisplay>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = ({
  user,
  talents: talentsReducer,
  talent: talentReducer,
}) => ({
  user,
  talentsReducer,
  talentReducer,
});

const mapDispatchToProps = {
  dispatchDestroyTalent,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketTable);
