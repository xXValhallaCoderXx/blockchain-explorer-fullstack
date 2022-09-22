import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaggedTxPage, DashboardPage } from "./pages";
import AuthLayout from "./components/layout/CoreLayout.js";

const RootRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/transactions/*" element={<DashboardPage />} />
        <Route path="/tagged-tx" element={<TaggedTxPage />} />
        <Route path="*" element={<Navigate to="/transactions" replace />} />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
