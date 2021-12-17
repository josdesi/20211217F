import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableRow = styled(TableRow)(() => ({
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "none",
    padding: 0,
  },

  "td:first-child": {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  "td:last-child": {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
}));

export default StyledTableRow;
