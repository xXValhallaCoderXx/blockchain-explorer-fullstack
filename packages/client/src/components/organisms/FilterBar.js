import {
  Box,
  IconButton,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";

const txCounts = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
];
const networks = [
  { value: 250, label: "Fantom" },
  { value: 1, label: "Ethereum" },
  { value: 137, label: "Polygon" },
  { value: 56, label: "Binance" },
  { value: 43114, label: "Avalanche" },
];

const FilterBarContainer = ({
  onClickAdd,
  onChangeTx,
  onChangeNetwork,
  txCount,
  network,
}) => {
  const handleChange = (event) => {
    if (event.target.name === "tx-count") {
      onChangeTx && onChangeTx(event.target.value);
    } else if (event.target.name === "network") {
      onChangeNetwork && onChangeNetwork(event.target.value);
    }
  };

  return (
    <StyledBar container>
      <Box display="flex" justifyContent="center" alignItems="center" mr={4}>
        <IconButton onClick={onClickAdd}>
          <Add />
        </IconButton>
      </Box>
      <GridItem item container xs={4} sm={2} md={2} lg={1}>
        <Grid item xs={12}>
          <Typography variant="body" sx={{ fontWeight: 600 }}>
            Tx Count:{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            id="tx-count"
            name="tx-count"
            value={txCount}
            size="small"
            onChange={handleChange}
            sx={{ minWidth: 60 }}
          >
            {txCounts.map((tx, index) => (
              <MenuItem key={`tx-count-${index}`} value={tx.value}>
                {tx.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </GridItem>
      <GridItem item container xs={4} sm={2}>
        <Grid item xs={12}>
          <Typography variant="body" sx={{ fontWeight: 600 }}>
            Network:{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            id="network"
            name="network"
            value={network}
            size="small"
            onChange={handleChange}
            sx={{ minWidth: 110 }}
          >
            {networks.map((item, index) => (
              <MenuItem key={`network-${index}`} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </GridItem>
    </StyledBar>
  );
};

export default FilterBarContainer;

const StyledBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  padding: "10px",
}));

const GridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
}));
