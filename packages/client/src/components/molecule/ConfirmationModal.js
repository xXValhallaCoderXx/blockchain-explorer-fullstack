/* eslint-disable react-hooks/exhaustive-deps */
import ModalContainer from "../molecule/Modal";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const ConfirmationModal = ({ isOpen, onClose, onSubmit, isLoading, children }) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen}>
      {children}
      <ActionButtons>
        <Button variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          sx={{ ml: 3 }}
          variant="contained"
          type="submit"
          onClick={onSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      </ActionButtons>
    </ModalContainer>
  );
};

const ActionButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default ConfirmationModal;
