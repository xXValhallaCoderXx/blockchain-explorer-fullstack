import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import BasicTable from "../../../components/molecule/BasicTable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns  = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,

  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',

    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TxListContainer = ({ data, selectedWallets }) => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    let flatData = [];
    selectedWallets.forEach((address) => flatData.push(...data[address]));
    const sortDates = flatData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setParsedData(sortDates);
  }, [data]);

  return (
    <Box>
      <Box sx={{ marginTop: 2, marginBottom: 5 }}>
        <Typography variant="body">
          Aggregated list of all walet transactions
        </Typography>
      </Box>
      <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
    
       
      />
    </Box>
      {/* <BasicTable data={parsedData} /> */}
    </Box>
  );
};

export default TxListContainer;
