import React, { Fragment } from "react";
import { array, object, string } from "yup";
import { Formik, Field, FieldArray } from "formik";
import { Typography, Grid, Button, Box } from "@mui/material";
import { TextField } from "formik-material-ui";

const WalletSearchContainer = ({ handleOnSubmit, addresses }) => {
  const walletsGroup =  addresses.split(",").map(address => {return {address: address}})

  return (
    <Box sx={{ padding: 2 }}>
      <Formik
        initialValues={{
          wallets: walletsGroup
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
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Enter Wallets To Search
                    </Typography>
                  </Grid>
                  {values.wallets.map((_, index) => (
                    <Fragment key={index}>
                      <Grid item md={10}>
                        <Field
                          fullWidth
                          name={`wallets.${index}.address`}
                          component={TextField}
                          label="Wallet Address"
                        />
                      </Grid>

                      {index > 0 && (
                        <Grid
                          item
                          md={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      )}
                    </Fragment>
                  ))}{" "}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => push(walletsGroup)}
                    >
                      Add New Wallet
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
            <Box sx={{ marginTop: 2, display: "flex" }}>
              <Button variant="contained" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default WalletSearchContainer;
