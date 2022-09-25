import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Chart, ArcElement } from "chart.js";

import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement);

const TxOverviewContainer = ({ data }) => {

  return (
    <Box p={3}>
      <Typography variant="h5">Transaction Overview</Typography>
      <Grid container>
        <Grid item xs={4} pt={3}>
          <Typography>Total Transactions: {data.totalTxCount}</Typography>
          <Typography mt={1} mb={1}>
            Total Outgoing: {data.sendTxCount}
          </Typography>
          <Typography>Total Incoming: {data.recieveTxCount}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Box style={{ height: 200 }}>
            {" "}
            <Doughnut
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              data={{
                labels: ["Incoming", "Outgoing"],
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [data.recieveTxCount, data.sendTxCount],
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default TxOverviewContainer;
