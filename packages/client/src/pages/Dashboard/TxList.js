import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import BasicTable from "../../components/molecule/BasicTable";

const TxListContainer = ({ data }) => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const flatData = flattenData(data);

    const sortDates = flatData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setParsedData(sortDates);
  }, [data]);

  const flattenData = (obj) => {
    const tempData = [];
    for (var key in obj) {
      const arrayItems = obj[key].map((item) => item);
      tempData.push(...arrayItems);
    }
    return tempData;
  };
  
  return (
    <Box sx={{ padding: 3 }}>
      {parsedData.length === 0 ? (
        <Box
          sx={{ height: 200, display: "flex" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Enter wallets</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h4">Transaction List</Typography>
          <Typography variant="body" ml={0.5}>
            Aggregated list of all walet transactions
          </Typography>
          <BasicTable data={parsedData} />
        </>
      )}
    </Box>
  );
};

export default TxListContainer;
