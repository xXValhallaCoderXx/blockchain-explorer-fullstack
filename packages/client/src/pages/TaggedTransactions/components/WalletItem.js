import { Box, Card, Typography, Chip, Avatar, Grid } from "@mui/material";
import walletIcon from "assets/image/wallet-icon.png";

const WalletItem = ({ index, wallet, onClickCard, selectedWallets }) => {
  const tagKeys = Object.keys(wallet.tags);
  return (
    <Card
      onClick={onClickCard(wallet)}
      elevation={0}
      sx={{
        padding: 2,
        borderRadius: 5,
        boxShadow: selectedWallets.includes(wallet.address)
          ? "0px 0px 0px 6px #999999"
          : " 0px 0px 0px 3px #999999",
        transition: " box-shadow 0.4s linear",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={walletIcon} alt="" />
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography sx={{ fontWeight: 600, color: "#999999" }}>
                Label
              </Typography>
              {wallet.label || `Wallet ${index}`}
            </Box>
            <Box sx={{ mt: 2, overflow: "hidden" }}>
              <Typography sx={{ fontWeight: 600, color: "#999999" }}>
                Address
              </Typography>
              {wallet.address}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                textAlign: "right",
                marginRight: 10,
                fontWeight: 600,
                color: "#999999",
                marginBottom: 2,
              }}
            >
              Tags
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              pr={2}
            >
              {tagKeys.map((item) => {
                return (
                  <Typography variant="caption">
                    {item}: {wallet.tags[item]}
                  </Typography>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box p={2}>
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ mr: 5 }}>
            <Chip
              sx={{
                backgroundColor: "#ef6b6b",
                color: "white",
                fontWeight: 600,
              }}
              avatar={<Avatar> {wallet.sendingCount}</Avatar>}
              label="Sending"
            />
          </Box>
          <Box>
            <Chip
              sx={{
                backgroundColor: "#62c960",
                color: "white",
                fontWeight: 600,
              }}
              avatar={<Avatar> {wallet.recieveCount}</Avatar>}
              label="Recieving"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default WalletItem;
