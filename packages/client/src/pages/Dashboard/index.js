import { useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetTransactionListQuery } from "../../api/tx-api";
import { useSearchParams } from "react-router-dom";
import FilterBarContainer from "../../components/organisms/FilterBar";
import { setIsAddModalOpen } from "../../slices/dashboard-slice";
import DashboardView from "./DashboardView";
import AddWalletModal from "./components/AddWalletModal";
import LoadingComponent from "../../components/molecule/LoadingComponent";
import { CircularProgress, Backdrop } from "@mui/material";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [queryParam, setSearchParams] = useSearchParams(); // Unpacking and retrieve id
  const addresses = queryParam.get("addresses");
  const txCount = queryParam.get("txCount");
  const chainId = queryParam.get("chainId");
  const newQueryParameters = new URLSearchParams();
  const isAddModalOpen = useSelector((state) => state.dashboard.isAddModalOpen);
  const [getTxApi, txApiResult] = useLazyGetTransactionListQuery();

  const isRefetching =
    txApiResult.isSuccess && txApiResult.status === "pending";
  const initialLoading = !txApiResult.isSuccess && txApiResult.isLoading;

  
  useEffect(() => {
    if (txCount && chainId && addresses) {
      getTxApi({ addresses, txCount, chainId });
    }
  }, [addresses, txCount, chainId]);

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

  // const handleOnDelete = (removingWallet, values) => {
  //   newQueryParameters.set("txCount", 5);
  //   newQueryParameters.set("chainId", 250);
  //   const filteredWallets = values.wallets.filter(
  //     (wallet) => wallet.address !== removingWallet.address
  //   );
  //   newQueryParameters.set("addresses", filteredWallets.join(","));
  //   setSearchParams(newQueryParameters);
  // };

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
        {initialLoading && (
          <LoadingComponent message={"Fetching wallet data..."} />
        )}
        {!initialLoading && <DashboardView data={txApiResult.data} />}
      </Box>
      <AddWalletModal
        isOpen={isAddModalOpen}
        onClose={handleOnClose}
        handleSubmit={handleSubmit}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isRefetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default DashboardContainer;
