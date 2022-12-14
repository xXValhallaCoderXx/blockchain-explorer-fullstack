/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { TextField } from "formik-material-ui";
import { object, string, ref } from "yup";
import { useFormik, FormikProvider, Field } from "formik";
import ConfirmationModal from "components/molecule/ConfirmationModal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setModal } from "slices/global-slice";
const RegisterModal = ({ isOpen, onClose, handleSubmit, isLoading }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: object({
      email: string().email().required("Email address is required"),
      password: string().required("Password is required"),
      confirmPassword: string()
        .required("Confirm password is required")
        .optional()
        .oneOf([ref("password")], "Passwords must match"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit && handleSubmit(values);
      actions.setSubmitting(false);
    },
  });

  const handleOnClose = () => {
    formik.resetForm();
    onClose && onClose();
  };

  const handleOnSubmit = () => {
    formik.handleSubmit();
  };

  const handleOnClickLogin = () => {
    dispatch(setModal({ modal: "login", isOpen: true }));
    dispatch(setModal({ modal: "register", isOpen: false }));
  };

  return (
    <ConfirmationModal
      onSubmit={handleOnSubmit}
      onClose={handleOnClose}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <Box sx={{ width: matches ? 550 : 320 }}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5">Register Account</Typography>
            <Typography variant="caption">
              By registering an account, you will be able to begin tagging your
              transactions
            </Typography>

            <StyledForm>
              <Box sx={{ height: 70, mt: 2 }}>
                <Field
                  fullWidth
                  name={`email`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label="Email Address"
                  component={TextField}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ height: 70, mt: 0.5 }}>
                <Field
                  fullWidth
                  name={`password`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  label="Password"
                  component={TextField}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ height: 70, mt: 0.5 }}>
                <Field
                  fullWidth
                  name={`confirmPassword`}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  label="Confirm Password"
                  component={TextField}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
            </StyledForm>

            <input type="submit" hidden />
          </form>
        </FormikProvider>
        <Typography variant="caption">
          Already have an account?{" "}
          <span
            onClick={handleOnClickLogin}
            style={{ fontWeight: 600, cursor: "pointer" }}
          >
            Login here
          </span>
        </Typography>
      </Box>
    </ConfirmationModal>
  );
};

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export default RegisterModal;
