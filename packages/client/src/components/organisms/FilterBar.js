import { Box, IconButton, Select, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";

const txCounts = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
];
const networks = [
  { value: 250, label: "Fantom" },
  { value: 1, label: "Ethereum" },
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
    <FilterBar>
      <Box display="flex" p={2} alignItems="center">
        <IconButton onClick={onClickAdd}>
          <Add />
        </IconButton>
      </Box>
      <Box display="flex" p={2} alignItems="center">
        <Typography variant="body" mr={1}>
          Tx Count:{" "}
        </Typography>
        <Select
          id="tx-count"
          name="tx-count"
          value={txCount}
          size="small"
          onChange={handleChange}
          sx={{minWidth: 70}}
        >
          {txCounts.map((tx, index) => (
            <MenuItem key={`tx-count-${index}`} value={tx.value}>
              {tx.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" p={2} alignItems="center">
        <Typography variant="body" mr={1}>
          Network:{" "}
        </Typography>
        <Select
          id="network"
          name="network"
          value={network}
          size="small"
          onChange={handleChange}
          sx={{minWidth: 120}}
        >
          {networks.map((item, index) => (
            <MenuItem key={`network-${index}`} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FilterBar>
  );
};

export default FilterBarContainer;

const FilterBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
}));
