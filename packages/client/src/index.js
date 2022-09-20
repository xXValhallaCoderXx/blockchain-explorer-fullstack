import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootRoutes from "./root.routes.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <RootRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
