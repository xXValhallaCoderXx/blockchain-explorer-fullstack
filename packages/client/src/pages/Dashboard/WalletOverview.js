import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, removeAddress } from "slices/dashboard-slice";
import WalletItem from "./components/WalletItem";


const WalletOverview = ({ data, onClickDelete }) => {
  const dispatch = useDispatch();
  const selectedWallets = useSelector(
    (state) => state.dashboard.selectedAddresses
  );
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

  const handleWalletClick = (wallet) => () => {
    if (selectedWallets.includes(wallet.address)) {
      dispatch(removeAddress(wallet.address));
    } else {
      console.log("no");
      dispatch(addAddress(wallet.address));
    }
  };

  const handleOnClickDelete = (wallet) => (e) => {
    e.stopPropagation();
    onClickDelete && onClickDelete(wallet);
  };

  return (
    <Box mt={4}>
      <Typography sx={{ mb: 4 }}>
        Select which wallet to view in the transaction list
      </Typography>
      <Grid container spacing={5}>
        {wallets.map((wallet, index) => {
          return (
            <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <WalletItem
                index={index}
                data={data}
                wallet={wallet}
                selectedWallets={selectedWallets}
                onClickDelete={handleOnClickDelete}
                onClickCard={handleWalletClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WalletOverview;
