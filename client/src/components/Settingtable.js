import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("twitter", "Successful", "delete"),
  createData("twitter", "Successful", "delete"),
];

export default function Settingtable() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className="headings">Provider</StyledTableCell>
            <StyledTableCell className="headings" align="right">
              LinkedAccount
            </StyledTableCell>
            <StyledTableCell className="headings" align="right">
              LinkedAccount
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow className="headings" key={row.name}>
              <StyledTableCell className="headings" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell className="headings" align="right">
                {row.calories}
              </StyledTableCell>
              <StyledTableCell className="headings" align="right">
                {row.fat}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
