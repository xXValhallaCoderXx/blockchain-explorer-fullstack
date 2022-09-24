import { Grid, Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import walletIcon from "../../../assets/image/wallet-icon.png";

const WalletOverview = ({ data }) => {
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    let parsedData = [];
    for (const wallet in data) {
      let sendingCount = 0;
      let recieveCount = 0;
      let count = 0;

      const sending = data[wallet].filter(
        (item) => item.direction === "sending"
      );
      sendingCount = sending.length;
      recieveCount = data[wallet].length - sendingCount;
      count += data[wallet].length;
      parsedData.push({
        count,
        recieveCount,
        sendingCount,
        address: wallet,
        label: "Wallet #",
      });
    }
    setWallets(parsedData);
  }, [data]);

  return (
    <Box mt={4}>
      <Typography sx={{ mb: 4 }}>
        Select which wallet to view in the transaction list
      </Typography>
      <Grid container spacing={5}>
        {wallets.map((wallet, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card elevation={0} sx={{ borderRadius: 5 }}>
                <Box p={2}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img src={walletIcon} alt="" />
                  </Box>
                  <Box mt={2}>
                    <Typography sx={{ fontWeight: 600 }}>Label</Typography>
                    {wallet.label || `Wallet ${index}`}
                  </Box>
                  <Box mt={2}>
                    <Typography sx={{ fontWeight: 600 }}>Address</Typography>
                    {wallet.address}
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box>
                      <Typography>Sending</Typography>
                      {wallet.sendingCount}
                    </Box>
                    <Box>
                      <Typography>Recieving</Typography>
                      {wallet.recieveCount}
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WalletOverview;
