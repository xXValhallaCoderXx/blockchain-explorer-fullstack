import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PolicyIcon from "@mui/icons-material/Policy";
import { setModal } from "../../slices/global-slice";

const drawerWidth = 240;

const settings = ["Sign-in", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HeaderContainer = ({ open, handleDrawerOpen, isAuthenticated }) => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelectItem = (x) => (y) => {
    if (x === "Sign-in") {
      dispatch(setModal({modal: "login", isOpen: true}))
    } else if (x === "Logout"){
      dispatch(setModal({modal: "logout", isOpen: true}))
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <PolicyIcon
          sx={{
            height: 40,
            width: 40,
            display: { xs: "none", md: "flex" },
            mr: 2,
          }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },

            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Wallet Explorer
        </Typography>

        <Box sx={{ flexGrow: 1, display: {  xs: "flex" } }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, index) => (
              <MenuItem
                disabled={
                  (setting === "Logout" && !isAuthenticated) ||
                  (setting === "Sign-in" && isAuthenticated)
                }
                key={index}
                onClick={handleSelectItem(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderContainer;
