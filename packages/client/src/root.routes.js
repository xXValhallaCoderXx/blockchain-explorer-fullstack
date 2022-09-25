import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaggedTxPage, DashboardPage } from "./pages";
import AuthLayout from "./components/layout/CoreLayout.js";
import LogoutModal from "./components/organisms/LogoutModal";
import { setIsAuthenticated, setModal } from "./slices/global-slice";
import { Snackbar } from "./components/molecule";

const RootRoutes = () => {
  const dispatch = useDispatch();
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const modals = useSelector((state) => state.global.modals);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt-token");
    // Normally would check stuff like exp etc / reauth with refresh token
    if (!jwtToken) {
      console.log("Not authenticated");
      dispatch(setIsAuthenticated(false));
    } else {
      dispatch(setIsAuthenticated(true));
    }
  }, []);

  const handleLogout = () => {
    setIsSnackOpen(true);
    window.localStorage.setItem("jwt-token", "");
    dispatch(setIsAuthenticated(false));
    dispatch(setModal({ modal: "logout", isOpen: false }));
  };

  const onCloseLogout = () => {
    dispatch(setModal({ modal: "logout", isOpen: false }));
  };

  const onCloseSnackbar = () => setIsSnackOpen(false);
  return (
    <div style={{ height: "100%" }}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/transactions/*" element={<DashboardPage />} />
          <Route path="/tagged-tx" element={<TaggedTxPage />} />
          <Route path="*" element={<Navigate to="/transactions" replace />} />
        </Route>
      </Routes>
      <LogoutModal
        handleSubmit={handleLogout}
        isOpen={modals["logout"]}
        onClose={onCloseLogout}
        i
      />
      <Snackbar
        isOpen={isSnackOpen}
        onClose={onCloseSnackbar}
        type="success"
        message={"You have been logged out"}
      />
    </div>
  );
};

export default RootRoutes;
