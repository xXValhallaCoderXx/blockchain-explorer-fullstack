import { Card, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import WalletSearch from "./WalletSearch";
import TxOverview from "./TxOverview";
import TxList from "./TxList";

const DashboardContainer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Card style={{ height: 930 }}>
            <TxList />
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
                <WalletSearch />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContainer;
