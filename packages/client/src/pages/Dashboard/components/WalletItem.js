import { Box, Card, Typography, IconButton } from "@mui/material";
import walletIcon from "../../../assets/image/wallet-icon.png";
import { Delete } from "@mui/icons-material";

const WalletItem = ({
  index,
  wallet,
  onClickDelete,
  onClickCard,
  selectedWallets,
}) => {
  return (
    <Card
      onClick={onClickCard(wallet)}
      elevation={0}
      sx={{
        borderRadius: 5,
        boxShadow: selectedWallets.includes(wallet.address)
          ? "0px 0px 0px 6px #333333"
          : " 0px 0px 0px 3px #999999",
        transition: " box-shadow 0.4s linear",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box style={{ position: "relative" }}>
        <IconButton
          onClick={onClickDelete(wallet)}
          style={{ position: "absolute", right: 20, top: 20 }}
        >
          <Delete />
        </IconButton>
      </Box>

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
  );
};

export default WalletItem;
