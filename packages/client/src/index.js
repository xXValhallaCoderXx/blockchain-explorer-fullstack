import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootRoutes from "./root.routes.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter } from "react-router-dom";
import { store } from "./config/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <RootRoutes />
    </BrowserRouter>
  </Provider>
);
