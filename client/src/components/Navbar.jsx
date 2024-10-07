import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("error in loggout ");
    }
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6" noWrap component="div">
              Lead Management
            </Typography>
            <Box display="flex" alignItems="center">
              <Avatar
                onClick={handleOpenUserMenu}
                src="https://via.placeholder.com/150"
                alt="User Avatar"
              />
              <Box ml={2}>
                <Typography variant="body1">Aakash Sharma</Typography>
                <Typography variant="caption">Admin</Typography>
              </Box>

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
                <MenuItem onClick={() => navigate("/profile")}>
                  <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/premium")}>
                  <Typography sx={{ textAlign: "center" }}>Premium</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
