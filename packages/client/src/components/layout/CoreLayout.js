import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "../organisms/Header";
import { useMediaQuery } from "@mui/material";

import SideDraw from "../organisms/SideBar";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    backgroundColor: "#EFF3F8",
    flexGrow: 1,

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

const CoreLayout = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const isTaggedTx = useMatch("/tagged-tx");
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (isTaggedTx && !isAuthenticated) {
      navigate("/transactions");
    }
  }, [isAuthenticated]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Header
        isAuthenticated={isAuthenticated}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <SideDraw open={open} handleDrawerClose={handleDrawerClose} />
      {matches ? (
        <Main open={open}>
          {" "}
          <DrawerHeader />
          <Outlet />
        </Main>
      ) : (
        <div>
          <DrawerHeader />
          <Outlet />
        </div>
      )}
    </Container>
  );
};

const Container = styled("div")`
  height: 100%;
  background-color: #eff3f7;
`;

export default CoreLayout;
