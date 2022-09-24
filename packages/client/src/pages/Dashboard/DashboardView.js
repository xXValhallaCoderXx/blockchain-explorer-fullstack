import { useState } from "react";
import isEmpty from "lodash.isempty";
import { Box, Tab, Tabs } from "@mui/material";
import EmptySearchContainer from "./components/EmptySearch";
import WalletOverview from "./components/WalletOveriew";

const MainContainer = ({ data }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  if (isEmpty(data)) {
    return <EmptySearchContainer message="Enter wallets to begin" />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab label="Transaction List" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WalletOverview data={data} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>ssssssss</div>
      </TabPanel>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default MainContainer;
