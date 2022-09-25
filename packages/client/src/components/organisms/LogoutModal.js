/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Box } from "@mui/material";

import ConfirmationModal from "../molecule/ConfirmationModal";
import useMediaQuery from "@mui/material/useMediaQuery";

const LogoutModal = ({ isOpen, onClose, handleSubmit }) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <ConfirmationModal
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <Box sx={{ width: matches ? 350 : 350 }}>
        <Typography variant="h6">Are you sure you want to logout?</Typography>
      </Box>
    </ConfirmationModal>
  );
};

export default LogoutModal;
