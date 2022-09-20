import { Card, Box } from "@mui/material";
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
        <Grid item xs={9}>
          <Card style={{ height: 930 }}>
            {isLoading ? <LoadingComponent message="Crypto Goblins are calculating, please wait..." /> : <TxList data={data} />}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card style={{ height: 300 }}>
                <TxOverview />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ height: 600 }}>
                <WalletSearch
                  handleOnSubmit={handleOnSubmit}
                  addresses={addresses}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContainer;
