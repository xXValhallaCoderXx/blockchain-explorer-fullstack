import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Chart, ArcElement } from "chart.js";

import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement);

const TxOverviewContainer = ({ data }) => {
  const [totalTx, setTotalTx] = useState(0);
  const [recieving, setRecieving] = useState(0);
  const [sending, setSending] = useState(0);

  useEffect(() => {
    if (data) {
      let count = 0;
      let sendingCount = 0;
      let recieveCount = 0;
      for (const [key, value] of Object.entries(data)) {
        const sending = value.filter((item) => item.direction === "sending");
        sendingCount = sending.length;
        recieveCount = value.length - sendingCount;
        count += value.length;
      }
      setTotalTx(count);
      setSending(sendingCount);
      setRecieving(recieveCount);
    }
  }, [data]);

  return (
    <Box p={3}>
      <Typography variant="h5">Transaction Overview</Typography>
      <Grid container>
        <Grid item xs={4} pt={3}>
          <Typography>Total Transactions: {totalTx}</Typography>
          <Typography mt={1} mb={1}>
            Total Outgoing: {sending}
          </Typography>
          <Typography>Total Incoming: {recieving}</Typography>
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
                    data: [recieving, sending],
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
