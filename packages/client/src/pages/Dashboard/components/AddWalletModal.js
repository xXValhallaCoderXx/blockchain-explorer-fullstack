/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalContainer from "../../../components/molecule/Modal";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { useFormik, FormikProvider, Field } from "formik";
import { setIsAddModalOpen } from "../../../slices/dashboard-slice";
import useMediaQuery from "@mui/material/useMediaQuery";
import walletIcon from "../../../assets/image/wallet-icon.png";

const AddWalletModal = ({
  isOpen,
  onClose,
  handleSubmit,
  isLoading,
  txApiResult,
}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      address: "",
      label: "",
    },
    validationSchema: object({
      address: string()
        .required("Wallet address is required")
        .matches(/^0x[a-fA-F0-9]{40}$/g, "Please enter a valid wallet address"),
      label: string().required("Wallet label is required"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit && handleSubmit(values);
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (!txApiResult.isFetching && txApiResult.isSuccess) {
      formik.resetForm();
      dispatch(setIsAddModalOpen({ isOpen: false }));
    }
  }, [txApiResult.isFetching]);

  const handleOnClose = () => {
    formik.resetForm();
    onClose && onClose();
  };

  return (
    <ModalContainer onClose={handleOnClose} isOpen={isOpen}>
      <Box sx={{ width: matches ? 550 : 350 }}>
        <AvatarContainer>
          <AvatarIcon sx={{ width: 70, height: 70,border: "3px solid white" }}>
            <img src={walletIcon} style={{ height: 50 }} alt="" />{" "}
          </AvatarIcon>
        </AvatarContainer>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" mt={3}>
              Enter a new wallet
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }} variant="caption2">
              Enter a wallet label to easily identify it
            </Typography>
            <StyledForm>
              <Box sx={{ height: 70, mt: 2 }}>
                <Field
                  fullWidth
                  name={`label`}
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  label="Label"
                  component={TextField}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ height: 70, mt: 0.5 }}>
                <Field
                  fullWidth
                  name={`address`}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  label="Address"
                  component={TextField}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
            </StyledForm>
            <ActionButtons>
              <Button
                variant="outlined"
                onClick={handleOnClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                sx={{ ml: 3 }}
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </Button>
            </ActionButtons>
            <input type="submit" hidden />
          </form>
        </FormikProvider>
      </Box>
    </ModalContainer>
  );
};

const AvatarContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const AvatarIcon = styled(Avatar)`
  position: absolute;
  margin-top: -60px;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ActionButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default AddWalletModal;
