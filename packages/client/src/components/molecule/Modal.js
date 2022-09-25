import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";

const ModalContainer = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog PaperProps={{style: {overflow: "visible"}}} onClose={handleClose} open={isOpen}>
     <Box p={3}>
     {children}
     </Box>
    </Dialog>
  );
};

export default ModalContainer;
