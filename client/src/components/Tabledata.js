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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 2 - 4 - 2022, 60, "Successful", "delete"),
  createData(1, 2 - 4 - 2022, 60, "Successful", "delete"),
  createData(1, 2 - 4 - 2022, 60, "Successful", "delete"),
  createData(1, 2 - 4 - 2022, 60, "Successful", "delete"),
  createData(1, 2 - 4 - 2022, 60, "Successful", "delete"),
];

export default function Tabledata() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      <Table sx={{ Width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className="headings">#</StyledTableCell>
            <StyledTableCell className="headings">Date</StyledTableCell>
            <StyledTableCell className="headings" align="right">
              Account
            </StyledTableCell>
            <StyledTableCell className="headings" align="right">
              Withdraw
            </StyledTableCell>
            <StyledTableCell className="headings" align="right">
              <Icon icon="ant-design:delete-filled" style={{ color: "red" }} />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className="headings" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell className="headings">
                {row.calories}
              </StyledTableCell>
              <StyledTableCell className="headings" align="right">
                {row.fat}
              </StyledTableCell>
              <StyledTableCell className="headings" align="right">
                {row.carbs}
              </StyledTableCell>
              <StyledTableCell className="headings" align="right">
                <Icon icon="ant-design:delete-filled" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
