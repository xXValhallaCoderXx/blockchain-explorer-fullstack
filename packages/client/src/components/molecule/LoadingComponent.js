import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

const LoadingComponent = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
