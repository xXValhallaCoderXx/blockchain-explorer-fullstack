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
import { removeAddress } from "../../slices/dashboard-slice";

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

  useEffect(() => {
    if (!txApiResult.isFetching && txApiResult.isSuccess) {
      dispatch(setIsAddModalOpen({ isOpen: false }));
    }
  }, [txApiResult.isFetching]);

  const handleOnClickAdd = () => {
    dispatch(setIsAddModalOpen({ isOpen: true }));
  };

  const handleOnClose = () => {
    dispatch(setIsAddModalOpen({ isOpen: false }));
  };

  const handleSubmit = ({ address, label }) => {
    chainId && newQueryParameters.set("chainId", chainId);
    txCount && newQueryParameters.set("txCount", txCount);
    let tempAddress = queryParam.get("addresses");
    if (!tempAddress) {
      newQueryParameters.set("addresses", address);
      setSearchParams(newQueryParameters);
    } else {
      if (tempAddress.includes(",")) {
      } else {
        newQueryParameters.set("addresses", `${tempAddress},${address}`);
        setSearchParams(newQueryParameters);
      }
    }
  };

  const handleOnDelete = ({ address }) => {
    chainId && newQueryParameters.set("chainId", chainId);
    txCount && newQueryParameters.set("txCount", txCount);
    const splitUrl = queryParam.get("addresses").split(",")
    const filteredWallets = splitUrl.find(wallet => wallet !== address)
    newQueryParameters.set("addresses", filteredWallets);
    dispatch(removeAddress(address));
    setSearchParams(newQueryParameters);
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
    <Box >
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
        {!initialLoading && (
          <DashboardView
            data={txApiResult.data}
            onClickDelete={handleOnDelete}
          />
        )}
      </Box>
      <AddWalletModal
        isOpen={isAddModalOpen}
        onClose={handleOnClose}
        handleSubmit={handleSubmit}
        isLoading={isRefetching || initialLoading}
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
