/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useLazyGetTransactionListQuery } from "../../api/tx-api";

import { CircularProgress, Backdrop, Tab, Tabs } from "@mui/material";

import isEmpty from "lodash.isempty";

import WalletOverview from "./WalletOverview";
import TxListContainer from "./TransactionList";

import FilterBarContainer from "../../components/organisms/FilterBar";
import AddWalletModal from "./components/AddWalletModal";
import EmptySearchContainer from "../../components/molecule/EmptySearch";
import TabPanel from "../../components/molecule/TabPanel";
import LoadingComponent from "../../components/molecule/LoadingComponent";

import { removeAddress } from "../../slices/dashboard-slice";
import { setIsAddModalOpen } from "../../slices/dashboard-slice";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const selectedWallets = useSelector(
    (state) => state.dashboard.selectedAddresses
  );
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

  if (isEmpty(txApiResult.data)) {
    return <EmptySearchContainer message="Begin adding wallets" />;
  }

  const handleChange = (event, newValue) => setValue(newValue);

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
        {!initialLoading && (
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
