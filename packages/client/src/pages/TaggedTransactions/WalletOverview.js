import { useMemo } from "react";
import isEmpty from "lodash.isempty";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import TxOverviewContainer from "./components/TxOverview";
import WalletItem from "./components/WalletItem";
import { removeAddress, addAddress } from "../../slices/tagged-tx-slice";
import EmptySearchContainer from "../../components/molecule/EmptySearch";

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

      const tagCount = {};

      for (const element of data[wallet]) {
        if (tagCount.hasOwnProperty(element.tag)) {
          tagCount[element.tag]++;
        } else {
          tagCount[element.tag] = 1;
        }
      }

      parsedData.push({
        count,
        recieveCount,
        sendingCount,
        address: wallet,
        label: `Wallet #${index++}`,
        tags: tagCount,
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

  if (isEmpty(data)) {
    return (
      <Box mt={4}>
        <EmptySearchContainer message="Please tag some transactions via Dashboard" />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 4 }}>
      <Typography sx={{mb: 2}}>Select which wallet to view their transactions</Typography>
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          lg={8}
          spacing={5}
          order={{ xs: 2, md: 1 }}
        >
          {computeWaleltOverview.map((wallet, index) => (
            <Grid item xs={12} md={5} xl={4}>
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
        <Grid item xs={12} lg={4} order={{ xs: 1, md: 2 }}>
          <TxOverviewContainer data={computedData.txOverviewStats} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletOverviewContainer;
