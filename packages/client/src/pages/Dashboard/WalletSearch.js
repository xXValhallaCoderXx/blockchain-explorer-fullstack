import React, { useRef } from "react";
import { array, object, string } from "yup";
import { useFormik, FormikProvider, FieldArray, Field } from "formik";
import { Typography, Grid, Box } from "@mui/material";
import { TextField } from "formik-material-ui";
import { DeleteOutlineOutlined, Add } from "@mui/icons-material";

const WalletSearchContainer = ({ handleOnSubmit, addresses }) => {
  const useArrayHelperRef = useRef(null);
  const wallets = addresses ? addresses : "";
  const walletsGroup = wallets?.split(",").map((address) => {
    return { address: address };
  });

  const formik = useFormik({
    initialValues: { wallets: walletsGroup },
    validationSchema: object({
      wallets: array(
        object({
          address: string()
            .required("Wallet address is required")
            .matches(
              /^0x[a-fA-F0-9]{40}$/g,
              "Please enter a valid wallet address"
            ),
        })
      ),
    }),
    onSubmit: (values, actions) => {
      handleOnSubmit(values);
      actions.setSubmitting(false);
    },
  });

  const onClickAdd = () => {
    useArrayHelperRef.current.push({ address: "" });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" component="h2" sx={{ color: "#2D2D2C" }}>
        Wallet Explorer
      </Typography>
      <Typography variant="caption" sx={{ color: "#2D2D2C" }}>
        Enter valid EVM wallet addresses to retrieve their most recent
        transactions
      </Typography>
      <Add sx={{ fontSize: 30, marginLeft: 2 }} onClick={onClickAdd} />
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="wallets"
            render={(arrayHelpers) => {
              useArrayHelperRef.current = arrayHelpers;
              return (
                <Box
                  mt={2}
                  sx={{
                    maxHeight: 130,
                    overflowY: "scroll",
                    width: "100%",
                    "&::-webkit-scrollbar": {
                      width: "0.5em",
                      borderRadius: "25px",
                    },
                    "&::-webkit-scrollbar-track": {
                      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                      borderRadius: "25px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,.1)",
                      outline: "1px solid slategrey",
                      borderRadius: "25px",
                    },
                  }}
                >
                  {formik.values.wallets.map((_, index) => (
                    <Grid
                      container
                      key={index}
                      sx={{
                        mt: index === 0 ? 1 : 0,
                      }}
                      mb={2}
                    >
                      <Grid item xs={10} sm={11}>
                        <Field
                          fullWidth
                          name={`wallets.${index}.address`}
                          value={formik.values.wallets[index].address}
                          onChange={formik.handleChange}
                          label="Address"
                          component={TextField}
                          size="small"
                          sx={{ backgroundColor: "white" }}
                        />
                      </Grid>

                      {index > 0 && (
                        <Grid item xs={2} sm={1} pt={1} pl={2}>
                          <DeleteOutlineOutlined
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </Grid>
                      )}
                    </Grid>
                  ))}
                </Box>
              );
            }}
          />
          <input type="submit" hidden />
        </form>
      </FormikProvider>
    </Box>
  );
};

export default WalletSearchContainer;
