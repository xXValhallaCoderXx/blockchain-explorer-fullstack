import ModalContainer from "../../../components/molecule/Modal";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { useFormik, FormikProvider, Field } from "formik";

const AddTransactionTagModal = ({ isOpen, onClose, handleSubmit, isLoading }) => {
  //   const formik = useFormik({
  //     initialValues: {
  //       address: "",
  //       label: "",
  //     },
  //     validationSchema: object({
  //       address: string()
  //         .required("Wallet address is required")
  //         .matches(/^0x[a-fA-F0-9]{40}$/g, "Please enter a valid wallet address"),
  //       label: string().required("Wallet label is required"),
  //     }),
  //     onSubmit: (values, actions) => {
  //         console.log("hmmm")
  //       handleSubmit && handleSubmit(values);
  //       actions.setSubmitting(false);
  //     },
  //   });

  const handleOnClose = () => {
    // formik.resetForm();
    onClose && onClose();
  };

  return (
    <ModalContainer onClose={handleOnClose} isOpen={isOpen}>
      <Box sx={{ width: 500 }}>
        <AvatarContainer>
          <AvatarIcon sx={{ width: 70, height: 70 }} />
        </AvatarContainer>
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
