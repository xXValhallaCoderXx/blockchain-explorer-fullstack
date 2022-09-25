import searchEmpty from "../../assets/image/empty-search.svg";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const EmptySearchContainer = ({ message = "Ehhh" }) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Box
      sx={{ height: "100%" }}
      p={5}
      pt={{xs: 10, md: 6}}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <img
        style={{ maxHeight: matches ? 350 : 250 }}
        src={searchEmpty}
        alt="search-empty"
      />
      <Typography variant="h5" mt={4} textAlign="center">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptySearchContainer;
