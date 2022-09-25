import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@mui/material";
import TxOverviewContainer from "./components/TxOverview";
import WalletItem from "./components/WalletItem";
import { removeAddress, addAddress } from "../../slices/tagged-tx-slice";

export const WalletOverviewContainer = ({ data }) => {
  const dispatch = useDispatch();
  const selectedWallets = useSelector(
    (state) => state.tagged.selectedAddresses
  );
  const computedData = useMemo(() => {
    const reportData = {
      totalTxCount: 0,
      sendTxCount: 0,
      recieveTxCount: 0,
      sendTxCurrAmount: 0,
      recieveTxCurrAmount: 0,
    };
    Object.keys(data).forEach((item) => {
      reportData.totalTxCount += data[item].length;

      let sendCount = 0;
      let reciveCount = 0;
      let sendAmount = 0;
      let recieveAmounbt = 0;

      data[item].forEach((tx) => {
        if (tx.direction === "sending") {
          sendAmount += parseFloat(tx.amount);
          sendCount++;
        } else {
          recieveAmounbt += parseFloat(tx.amount);
          reciveCount++;
        }
      });

      reportData.sendTxCurrAmount += sendAmount;
      reportData.recieveTxCurrAmount += recieveAmounbt;
      reportData.sendTxCount += sendCount;
      reportData.recieveTxCount += reciveCount;
    });

    return { txOverviewStats: reportData };
  }, [data]);

  const computeWaleltOverview = useMemo(() => {
    let parsedData = [];
    let index = 0;
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
        label: `Wallet #${index++}`,
      });
    }

    return parsedData;
  }, [data]);

  const handleWalletClick = (wallet) => () => {
    if (selectedWallets.includes(wallet.address)) {
      dispatch(removeAddress(wallet.address));
    } else {
      dispatch(addAddress(wallet.address));
    }
  };

  return (
    <Box sx={{ pt: 4 }}>
      <Grid container spacing={4}>
        <Grid container item lg={8} spacing={5}>
          {computeWaleltOverview.map((wallet, index) => (
            <Grid item lg={4}>
              <WalletItem
                key={index}
                index={index}
                wallet={wallet}
                onClickCard={handleWalletClick}
                selectedWallets={selectedWallets}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item lg={4}>
          <TxOverviewContainer data={computedData.txOverviewStats} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletOverviewContainer;
