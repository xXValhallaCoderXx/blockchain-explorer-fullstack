import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootRoutes from "./root.routes.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { store } from "./config/store";
import { purple } from '@mui/material/colors';
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#333333"
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#999999',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>

    <BrowserRouter>
      <CssBaseline />
      <RootRoutes />
    </BrowserRouter>
    </ThemeProvider>
  
  </Provider>
);
