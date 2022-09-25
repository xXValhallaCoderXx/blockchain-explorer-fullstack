import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTaggedTxQuery } from "api/tx-api";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { TabPanel, LoadingState } from "components/molecule";
import WalletOverviewContainer from "./WalletOverview";
import TaggedList from "./TaggedTxList";

const TaggedTransactionsContainer = () => {
  const selectedWallets = useSelector(
    (state) => state.tagged.selectedAddresses
  );
  const { data, isLoading } = useGetTaggedTxQuery();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  return (
    <Box sx={{ width: "100%" }} p={4}>
      <Typography variant="h4" sx={{ pl: 1 }}>
        Transaction Vault
      </Typography>
      <Box sx={{ mt: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab
            disabled={selectedWallets.length === 0}
            label={`Transaction List - Selected (${selectedWallets.length})`}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoading ? <LoadingState /> : <WalletOverviewContainer data={data} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TaggedList data={data} selectedWallets={selectedWallets} />
      </TabPanel>
    </Box>
  );
};

export default TaggedTransactionsContainer;
