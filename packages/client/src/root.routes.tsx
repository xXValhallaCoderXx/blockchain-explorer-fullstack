import React from "react";
import { Routes, Route } from "react-router-dom";
import { TaggedTxPage, DashboardPage } from "./pages";
import AuthLayout from "./components/layout/CoreLayout.js";

const RootRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tagged-tx" element={<TaggedTxPage />} />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
