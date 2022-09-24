import { useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetTransactionListQuery } from "../../api/tx-api";
import { useSearchParams } from "react-router-dom";
import FilterBarContainer from "../../components/organisms/FilterBar";
import { setIsAddModalOpen } from "../../slices/dashboard-slice";
import DashboardView from "./DashboardView";
import AddWalletModal from "./components/AddWalletModal";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [queryParam, setSearchParams] = useSearchParams(); // Unpacking and retrieve id
  const addresses = queryParam.get("addresses");
  const txCount = queryParam.get("txCount");
  const chainId = queryParam.get("chainId");
  const newQueryParameters = new URLSearchParams();

  const isAddModalOpen = useSelector((state) => state.dashboard.isAddModalOpen);

  const [getTxApi, txApiResult] = useLazyGetTransactionListQuery();
  console.log("TX API: ", txApiResult )
  useEffect(() => {
    console.log("TX API USE EFFECT: ", txApiResult);
    if (txCount && chainId && addresses) {
      console.log("TX API USE EFFSSSSSECT: ", addresses);
      getTxApi({addresses, txCount, chainId})
    }
  }, [addresses, txCount, chainId]);

  // const handleOnSubmit = (values) => {
  //   newQueryParameters.set("txCount", 5);
  //   newQueryParameters.set("chainId", 250);
  //   const addresses = values.wallets.map((item) => item.address);

  //   newQueryParameters.set("addresses", addresses.join(","));
  //   setSearchParams(newQueryParameters);
  // };

  // const handleOnDelete = (removingWallet, values) => {
  //   newQueryParameters.set("txCount", 5);
  //   newQueryParameters.set("chainId", 250);
  //   const filteredWallets = values.wallets.filter(
  //     (wallet) => wallet.address !== removingWallet.address
  //   );
  //   newQueryParameters.set("addresses", filteredWallets.join(","));
  //   setSearchParams(newQueryParameters);
  // };

  const handleOnClickAdd = () => {
    dispatch(setIsAddModalOpen({ isOpen: true }));
  };

  const handleOnClose = () => {
    dispatch(setIsAddModalOpen({ isOpen: false }));
  };

  const handleSubmit = (values) => {
    // newQueryParameters.set("txCount", 5);
    // newQueryParameters.set("chainId", 250);
    // const addresses = values.wallets.map((item) => item.address);
    // newQueryParameters.set("addresses", addresses.join(","));
    // setSearchParams(newQueryParameters);
  };

  const handleOnChangeNetwork = (value) => {
    txCount && newQueryParameters.set("txCount", txCount);
    addresses && newQueryParameters.set("addresses", addresses);
    newQueryParameters.set("chainId", value);
    setSearchParams(newQueryParameters);
  };

  const handleOnClickTx = (value) => {
    newQueryParameters.set("txCount", value);
    chainId && newQueryParameters.set("chainId", chainId);
    addresses && newQueryParameters.set("addresses", addresses);
    setSearchParams(newQueryParameters);
  };
  return (
    <Box>
      <FilterBarContainer
        onClickAdd={handleOnClickAdd}
        onChangeTx={handleOnClickTx}
        onChangeNetwork={handleOnChangeNetwork}
        txCount={txCount}
        network={chainId}
      />
      <Box p={5}>
        <DashboardView data={txApiResult.data} />
      </Box>
      <AddWalletModal
        isOpen={isAddModalOpen}
        onClose={handleOnClose}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default DashboardContainer;

// <Grid container spacing={4} sx={{ height: "100%" }}>
// <Grid
//   sx={{ height: "100%" }}
//   item
//   xs={12}
//   xl={8}
//   order={{ xs: 2, xl: 1 }}
// >
//   <>
//     {isLoading ? (
//       <LoadingComponent message="Fetching Transactions, Please wait..." />
//     ) : (
//       <MainContainer data={data} />
//     )}
//   </>
// </Grid>
// <Grid item xs={12} xl={4} order={{ xs: 1, xl: 2 }}>
//   <Grid container spacing={4}>
//     <Grid item xs={12} sm={6} xl={12}>
//       <StyledCard elevation={0}>
//         <WalletSearch
//           handleOnSubmit={handleOnSubmit}
//           addresses={addresses}
//           onClickRemove={handleOnDelete}
//         />
//       </StyledCard>
//     </Grid>
//     <Grid item xs={12} sm={6} xl={12}>
//       {/* <StyledCard elevation={0}>
//         <TxOverview data={data} />
//       </StyledCard> */}
//     </Grid>
//   </Grid>
// </Grid>
// </Grid>
