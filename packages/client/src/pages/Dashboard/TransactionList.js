/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Typography, Box, Card, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import EmptySearchContainer from "../../components/molecule/EmptySearch";

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
    setParsedData(sortDates);
  }, [data]);

  if (parsedData.length === 0) {
    return (
      <EmptySearchContainer message="Please select which wallets to view in Overview" />
    );
  }

  return (
    <Box>
      <Box sx={{ marginTop: 4, marginBottom: 2 }}>
        <Typography variant="body">
          Aggregated list of selected wallet transactions
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} lg={9} xl={7}>
          <Card sx={{ height: 400 }}>
            <DataGrid
              rows={parsedData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10]}
              checkboxSelection
              onCellClick={(x) => console.log(x)}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TxListContainer;
