/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { setIsAuthenticated, setModal } from "slices/global-slice";
import { removeAddress } from "slices/dashboard-slice";
import { setIsAddModalOpen } from "slices/dashboard-slice";

import {
  useLazyGetTransactionListQuery,
  useLoginUserMutation,
} from "api/tx-api";

import {
  EmptySearchState,
  TabPanel,
  LoadingState,
  Snackbar,
} from "components/molecule";
import { CircularProgress, Backdrop, Tab, Tabs } from "@mui/material";

import { FilterBar } from "components/organisms";

import WalletOverview from "./WalletOverview";
import TxListContainer from "./TransactionList";

import AddWalletModal from "./components/AddWalletModal";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [loginUserApi, loginUserApiResult] = useLoginUserMutation();
  const [value, setValue] = useState(0);
  const [localError, setLocalError] = useState({});
  const selectedWallets = useSelector(
    (state) => state.dashboard.selectedAddresses
  );
  const [queryParam, setSearchParams] = useSearchParams(); // Unpacking and retrieve id
  const addresses = queryParam.get("addresses");
  const txCount = queryParam.get("txCount");
  const chainId = queryParam.get("chainId");
  const newQueryParameters = new URLSearchParams();
  const isAddModalOpen = useSelector((state) => state.dashboard.isAddModalOpen);

  const modals = useSelector((state) => state.global.modals);

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
    if (loginUserApiResult.isSuccess) {
      window.localStorage.setItem(
        "jwt-token",
        loginUserApiResult.data.access_token
      );
      setLocalError({
        severity: "success",
        message: "Login success",
      });
      dispatch(setIsAuthenticated(true));
      dispatch(setModal({ modal: "login", isOpen: false }));
    } else if (loginUserApiResult?.error?.status === 400) {
      setLocalError({
        severity: "error",
        message: "Wrong credentials provided",
      });
    }
  }, [loginUserApiResult]);

  const handleOnClickAdd = () => {
    dispatch(setIsAddModalOpen({ isOpen: true }));
  };

  const handleOnClose = () => {
    dispatch(setIsAddModalOpen({ isOpen: false }));
  };

  const handleSubmitCreateTx = (transactions) => {
    console.log("container: ");
  };

  const handleOnDelete = ({ address }) => {
    chainId && newQueryParameters.set("chainId", chainId);
    txCount && newQueryParameters.set("txCount", txCount);
    const splitUrl = queryParam.get("addresses").split(",");
    const filteredWallets = splitUrl.find((wallet) => wallet !== address);
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

  const handleChange = (event, newValue) => setValue(newValue);

  const handleCloseLoginModal = () => {
    dispatch(setModal({ modal: "login", isOpen: false }));
  };

  const handleCloseRegisterModal = () => {
    dispatch(setModal({ modal: "register", isOpen: false }));
  };

  const onLoginSubmit = (values) => {
    loginUserApi(values);
  };
  console.log("LOGIN USER: ", loginUserApiResult);
  const handleCloseSnackbar = () => {
    setLocalError({});
  };

  return (
    <Box>
      <FilterBar
        onClickAdd={handleOnClickAdd}
        onChangeTx={handleOnClickTx}
        onChangeNetwork={handleOnChangeNetwork}
        txCount={txCount}
        network={chainId}
      />
      <Box p={5}>
        {initialLoading ? (
          <LoadingState message={"Fetching wallet data..."} />
        ) : isEmpty(txApiResult.data) ? (
          <EmptySearchState message="Add Wallets to find the transactions that matter" />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Overview" />
                <Tab
                  disabled={selectedWallets.length === 0}
                  label={`Transaction List - Selected (${selectedWallets.length})`}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <WalletOverview
                data={txApiResult.data}
                onClickDelete={handleOnDelete}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TxListContainer
                data={txApiResult.data}
                selectedWallets={selectedWallets}
              />
            </TabPanel>
          </Box>
        )}
      </Box>
      <AddWalletModal
        isOpen={isAddModalOpen}
        onClose={handleOnClose}
        handleSubmit={handleSubmitCreateTx}
        isLoading={isRefetching || initialLoading}
        txApiResult={txApiResult}
      />
      <LoginModal
        handleSubmit={onLoginSubmit}
        isOpen={modals["login"]}
        onClose={handleCloseLoginModal}
      />
      <RegisterModal
        isOpen={modals["register"]}
        onClose={handleCloseRegisterModal}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isRefetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        onClose={handleCloseSnackbar}
        isOpen={!isEmpty(localError)}
        message={localError?.message}
        severity={localError?.severity}
      />
    </Box>
  );
};

export default DashboardContainer;
