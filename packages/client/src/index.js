import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootRoutes from "./root.routes";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { store } from "./config/store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#999999",
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
