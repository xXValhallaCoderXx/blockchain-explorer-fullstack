import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import BasicTable from "../../components/molecule/BasicTable";

const TxListContainer = ({ data }) => {
  const [parsedData, setParsedData] = useState([])

  useEffect(() => {
    const flatData = flattenData(data);
    console.log("FLAT dATa", flatData);
    const sortDates = flatData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    console.log("sort dATa", sortDates);
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
      <Typography variant="h4">Transaction List</Typography>
      <BasicTable data={parsedData} />
    </Box>
  );
};

export default TxListContainer;
