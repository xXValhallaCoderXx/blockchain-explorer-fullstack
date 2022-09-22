import React, { Fragment } from "react";
import { array, object, string } from "yup";
import { Formik, Field, FieldArray } from "formik";
import { Typography, Grid, Button, Box } from "@mui/material";
import { TextField } from "formik-material-ui";
import { DeleteOutlineOutlined, Add } from "@mui/icons-material";
import debounce from "lodash.debounce";
const WalletSearchContainer = ({ handleOnSubmit, addresses }) => {
  const wallets = addresses ? addresses : "";

  const walletsGroup = wallets?.split(",").map((address) => {
    return { address: address };
  });

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      console.log("hmmm");
    }, 300)
  ).current;

  async function handleChange(e) {
    debouncedSearch(e.target.value);
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Formik
        initialValues={{
          wallets: walletsGroup,
        }}
        validationSchema={object({
          wallets: array(
            object({
              address: string().required("Address is required"),
            })
          ),
        })}
        onSubmit={async (values, actions) => {
          handleOnSubmit(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <FieldArray name="wallets">
              {({ push, remove }) => (
                <Grid container spacing={2}>
                  <Grid container item xs={12} mb={1}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: "#2D2D2C" }}
                    >
                      Wallet Explorer
                    </Typography>
                  </Grid>
                  <Grid container pl={2}>
                    <Grid item xs={10}>
                      <Typography variant="caption" sx={{ color: "#2D2D2C" }}>
                        Enter valid EVM wallet addresses to retrieve their most
                        recent transactions
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Add
                        sx={{ fontSize: 30, marginLeft: 2 }}
                        onClick={() => push(walletsGroup)}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    mt={2}
                    pl={2}
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
                    {values.wallets.map((_, index) => (
                      <Grid container key={index} mb={4}>
                        <Grid item xs={10} sm={11}>
                          <Field
                            fullWidth
                            name={`wallets.${index}.address`}
                            component={TextField}
                            label="Address"
                            size="small"
                            sx={{ backgroundColor: "white" }}
                          />
                        </Grid>

                        {index > 0 && (
                          <Grid item xs={2} sm={1} pt={1} pl={2}>
                 
                            <DeleteOutlineOutlined
                              onClick={() => remove(index)}
                            />
                          </Grid>
                        )}
                      </Grid>
                    ))}
                  </Box>
                </Grid>
              )}
            </FieldArray>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default WalletSearchContainer;
