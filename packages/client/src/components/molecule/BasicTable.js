import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from 'date-fns'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Date", 159, 6.0, 24, 4.0),
  createData("Amount", 237, 9.0, 37, 4.3),
  createData("From", 262, 16.0, 24, 6.0),
  createData("Direction", 356, 16.0, 49, 3.9),
  createData("To", 305, 3.7, 67, 4.3),
];

export default function BasicTable({ data }) {
  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
            
            >
              <TableCell>{format(new Date(row.date), "EEE, d LLL yyyy - HH:mm")}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell style={{color: row.direction === "sending" ? "green" : "red"}}>{row.direction}</TableCell>
              <TableCell>{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
