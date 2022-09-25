import { useEffect, useState } from "react";
import ModalContainer from "components/molecule/Modal";
import {
  Typography,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import walletIcon from "assets/image/wallet-icon.png";
import { useCreateUserTransactionsMutation } from "api/tx-api";

const AddTransactionTagModal = ({
  isOpen,
  onClose,
  handleSubmit,
  isLoading,
  data,
}) => {
  const [filtered, setFiltered] = useState([]);
  const [txApi] = useCreateUserTransactionsMutation({});

  useEffect(() => {
    const taggedTxs = data.filter((tx) => tx.type !== "");
    setFiltered(taggedTxs);
  }, [data]);

  const handleOnSubmit = () => {
    txApi({ data: "s" });
  };
  const handleOnClose = () => {
    onClose && onClose();
  };

  return (
    <ModalContainer onClose={handleOnClose} isOpen={isOpen}>
      <Box sx={{ width: 500, mb: 3 }}>
        <AvatarContainer>
          <AvatarIcon sx={{ width: 70, height: 70, border: "3px solid white" }}>
            <img src={walletIcon} style={{ height: 50 }} alt="" />{" "}
          </AvatarIcon>
        </AvatarContainer>
      </Box>
      <Typography variant="h6">Please confirm tagged transactions</Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Typography>Label</Typography>
        </Grid>
        <Grid item>
          <Typography>Tx Hash</Typography>
        </Grid>
      </Grid>
      <List>
        {filtered.map((tx) => {
          return (
            <ListItem style={{ padding: 0 }}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography>{tx.type}</Typography>
                </Grid>
                <Grid item xs={8} sx={{ overflow: "hidden" }}>
                  <Typography
                    sx={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {" "}
                    {tx.tx_hash}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <ActionButtons>
        <Button variant="outlined" onClick={handleOnClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          sx={{ ml: 3 }}
          variant="contained"
          onClick={handleOnSubmit}
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

const AvatarContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const AvatarIcon = styled(Avatar)`
  position: absolute;
  margin-top: -60px;
`;

// const StyledForm = styled("form")`
//   display: flex;
//   flex-direction: column;
//   margin-top: 10px;
// `;

// const ActionButtons = styled(Box)`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   margin-top: 20px;
// `;

export default AddTransactionTagModal;
