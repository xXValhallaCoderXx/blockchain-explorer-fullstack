import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { Grid, Avatar, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import { setModal } from "../../slices/global-slice";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  backgroundColor: "#333333",
  ...theme.mixins.toolbar,
}));

export default function PersistentDrawerLeft({ open, handleDrawerClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const navigate = useNavigate();
  const handleOnClick = (path) => () => {
    if (path.value === "tagged-tx" && !isAuthenticated) {
      console.log("not allow");
    } else {
      navigate(`/${path.value}`);
    }
  };
  const onClickSignin = () => {
    dispatch(setModal({ modal: "login", isOpen: true }));
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Grid container>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <IconButton color="secondary" onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexDirection: "column", mb: 3 }}
        >
          <Avatar
            sx={{ height: 90, width: 90, border: "2px solid white", mb: 2 }}
          />
          {isAuthenticated ? (
            <Typography variant="h5" sx={{ fontSize: 16 }} color="white">
              Welcome
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ fontSize: 16 }} color="white">
              <span
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={onClickSignin}
              >
                Sign in
              </span>{" "}
              to tag transactions
            </Typography>
          )}
        </Grid>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          { value: "transactions", label: "Dashboard" },
          { value: "tagged-tx", label: "My Transactions" },
        ].map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            disabled={text.value === "tagged-tx" && !isAuthenticated}
            onClick={handleOnClick(text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {text.value === "transactions" ? (
                  <DashboardIcon />
                ) : (
                  <BookIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
