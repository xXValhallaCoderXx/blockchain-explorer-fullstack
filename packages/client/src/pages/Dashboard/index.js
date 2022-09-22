import { Card, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import WalletSearch from "./WalletSearch";
import TxOverview from "./TxOverview";
import TxList from "./TxList";
import { useGetTransactionListQuery } from "../../api/tx-api";
import { useSearchParams } from "react-router-dom";
import LoadingComponent from "../../components/molecule/LoadingComponent";

const DashboardContainer = () => {
  const [queryParam] = useSearchParams(); // Unpacking and retrieve id
  const addresses = queryParam.get("addresses");
  const { data, isLoading } = useGetTransactionListQuery({
    chainId: queryParam.get("chainId"),
    txCount: queryParam.get("txCount"),
    addresses,
  });

  console.log("IS LOAIND: ", data);
  const handleOnSubmit = () => {};
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} xl={9} order={{ xs: 2, xl: 1 }}>
          <StyledCard elevation={0}>
            {isLoading ? (
              <LoadingComponent message="Crypto Goblins are calculating, please wait..." />
            ) : (
              <TxList data={data} />
            )}
          </StyledCard>
        </Grid>
        <Grid item xs={12} xl={3} order={{ xs: 1, xl: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} xl={12}>
              <StyledCard elevation={0}>
              <WalletSearch
                  handleOnSubmit={handleOnSubmit}
                  addresses={addresses}
                
                />
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} xl={12}>
              <StyledCard elevation={0}>
              <TxOverview   data={data} />
           
              </StyledCard>
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
