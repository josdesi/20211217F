import React from "react";
import { connect } from "react-redux";
import GpacButton from "../../../../components/GpacButton";
import Advertisement from "../../../../components/Advertisement";
import Table from "../../../../components/GpacTable/Table";
import TableContainer from "../../../../components/GpacTable/TableContainer";
import TableHead from "../../../../components/GpacTable/TableHead";
import TableRow from "../../../../components/GpacTable/TableRow";
import TableBody from "../../../../components/GpacTable/TableBody";
import TableCell from "../../../../components/GpacTable/TableCell";
import { Link } from "react-router-dom";
import { isEmptyArray } from "../../../../utils/dataTypes";
import NameColumn from "./NameColumn";

const CompanyTable = ({ companies }) => {
  if (isEmptyArray(companies.payload.data)) {
    return <Advertisement text={"Oops, your companies are empty "} />;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!isEmptyArray(companies.payload.data) &&
              companies.payload.data.map((company) => (
                <TableRow hover key={company.id} style={{}}>
                  <TableCell>
                    <NameColumn name={company.name} type={company.type?.name} />
                  </TableCell>
                  <TableCell align="right">{company.location?.code}</TableCell>
                  <TableCell align="right">{company.email}</TableCell>
                  <TableCell align="right">{company.phone}</TableCell>
                  <TableCell align="center">
                    <GpacButton
                      variant="outlined"
                      to={`/companies/${company.id}`}
                      component={Link}
                      color="grey"
                    >
                      View
                    </GpacButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = ({ companies }) => ({
  companies,
});

export default connect(mapStateToProps)(CompanyTable);
