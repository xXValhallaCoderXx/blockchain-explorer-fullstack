import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import WalletSearch from "./WalletSearch";
import TxOverview from "./TxOverview";
import { useGetTransactionListQuery } from "../../api/tx-api";
import { useSearchParams } from "react-router-dom";
import LoadingComponent from "../../components/molecule/LoadingComponent";
import MainContainer from "./Main/Main";
const DashboardContainer = () => {
  const [queryParam] = useSearchParams(); // Unpacking and retrieve id
  const addresses = queryParam.get("addresses");
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters = new URLSearchParams();
  const { data, isLoading } = useGetTransactionListQuery({
    chainId: queryParam.get("chainId"),
    txCount: queryParam.get("txCount"),
    addresses,
  });

  const handleOnSubmit = (values) => {
    newQueryParameters.set("txCount", 5);
    newQueryParameters.set("chainId", 250);
    const addresses = values.wallets.map((item) => item.address);

    newQueryParameters.set("addresses", addresses.join(","));
    setSearchParams(newQueryParameters);
  };

  const handleOnDelete = (removingWallet, values) => {
    newQueryParameters.set("txCount", 5);
    newQueryParameters.set("chainId", 250);
    const filteredWallets = values.wallets.filter(
      (wallet) => wallet.address !== removingWallet.address
    );
    newQueryParameters.set("addresses", filteredWallets.join(","));
    setSearchParams(newQueryParameters);
  };
  return (
    <Box p={4} sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container spacing={4} sx={{ height: "100%" }}>
        <Grid
          sx={{ height: "100%" }}
          item
          xs={12}
          xl={8}
          order={{ xs: 2, xl: 1 }}
        >
          <>
            {isLoading ? (
              <LoadingComponent message="Fetching Transactions, Please wait..." />
            ) : (
              <MainContainer data={data} />
            )}
          </>
        </Grid>
        <Grid item xs={12} xl={4} order={{ xs: 1, xl: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} xl={12}>
              <StyledCard elevation={0}>
                <WalletSearch
                  handleOnSubmit={handleOnSubmit}
                  addresses={addresses}
                  onClickRemove={handleOnDelete}
                />
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} xl={12}>
              {/* <StyledCard elevation={0}>
                <TxOverview data={data} />
              </StyledCard> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.5),.05)",
  borderRadius: 15,
  [theme.breakpoints.up("xs")]: {
    maxHeight: 300,
  },
  [theme.breakpoints.up("lg")]: {
    maxHeight: 900,
  },
}));
export default DashboardContainer;
