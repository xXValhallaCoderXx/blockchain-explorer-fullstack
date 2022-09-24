import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import BasicTable from "../../../components/molecule/BasicTable";

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
      <BasicTable data={parsedData} />
    </Box>
  );
};

export default TxListContainer;
