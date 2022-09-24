import searchEmpty from "../../../assets/image/empty-search.svg";
import { Box } from "@mui/material";
const EmptySearchContainer = () => {
  return (
    <Box
      sx={{ height: "100%" }}
      p={5}
      pt={20}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <img
        style={{ maxHeight: 350 }}
        src={searchEmpty}
        alt="search-empty"
      />
    </Box>
  );
};

export default EmptySearchContainer;
