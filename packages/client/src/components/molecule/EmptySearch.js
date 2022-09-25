import searchEmpty from "../../assets/image/empty-search.svg";
import { Box, Typography } from "@mui/material";
const EmptySearchContainer = ({ message = "Ehhh" }) => {
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
      <img style={{ maxHeight: 350 }} src={searchEmpty} alt="search-empty" />
      <Typography variant="h4" mt={4} textAlign="center">{message}</Typography>
    </Box>
  );
};

export default EmptySearchContainer;
