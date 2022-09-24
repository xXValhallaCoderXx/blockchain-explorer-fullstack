import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns = [
  { field: "id", fieldName: "ID" },
  {
    field: "date",
    headerName: "Date",
    width: 180,
    valueGetter: (params) =>
      `${format(new Date(params.row.date), "yyyy-MM-dd  HH:mm:ss")}`,
  },
  {
    field: "from",
    headerName: "Source",
    width: 200,
  },
  {
    field: "to",
    headerName: "Destination",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 110,
  },
  {
    field: "direction",
    headerName: "Direction",
    description: "This column has a value getter and is not sortable.",
    width: 110,
  },
];

const TxListContainer = ({ data, selectedWallets }) => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    let flatData = [];
    selectedWallets.forEach((address, index) => {
      const parsedWallets = data[address].map((wallet) => wallet);
      flatData.push(...parsedWallets);
    });

    const indexItems = flatData.map((wallet, index) => ({
      id: index,
      ...wallet,
    }));

    const sortDates = indexItems.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    console.log("SORT DARES ", sortDates);
    setParsedData(sortDates);
  }, [data]);

  return (
    <Box>
      <Box sx={{ marginTop: 2, marginBottom: 5 }}>
        <Typography variant="body">
          Aggregated list of all walet transactions
        </Typography>
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={parsedData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          onCellClick={x => console.log(x)}
        />
      </Box>
      {/* <BasicTable data={parsedData} /> */}
    </Box>
  );
};

export default TxListContainer;
