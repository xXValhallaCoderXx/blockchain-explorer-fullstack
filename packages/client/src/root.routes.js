import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { TaggedTxPage, DashboardPage } from "./pages";
import AuthLayout from "./components/layout/CoreLayout.js";
import LogoutModal from "./components/organisms/LogoutModal";
import { setIsAuthenticated, setModal } from "./slices/global-slice";

const RootRoutes = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.global.modals);
  console.log("MODALS: ", modals);
  const handleLogout = () => {
    window.localStorage.setItem("jwt-token", "");
    dispatch(setIsAuthenticated(false));
    dispatch(setModal({ modal: "logout", isOpen: false }));
  };

  const onCloseLogout = () => {
    dispatch(setModal({ modal: "logout", isOpen: false }));
  };
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/transactions/*" element={<DashboardPage />} />
          <Route path="/tagged-tx" element={<TaggedTxPage />} />
          {/* <Route path="*" element={<Navigate to="/transactions" replace />} /> */}
        </Route>
      </Routes>
      <LogoutModal
        handleSubmit={handleLogout}
        isOpen={modals["logout"]}
        onClose={onCloseLogout}
      />
    </div>
  );
};

export default RootRoutes;
