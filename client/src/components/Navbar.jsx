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
import logo from "../assets/logo.png";

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
      await axios.post(
        "/api/v1/auth/logout",
        {
          email: localStorage.getItem("email"),
        },
        {
          withCredentials: true,
        }
      );
      localStorage.clear("userRole");
      localStorage.clear("name");
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
        sx={{
          bgcolor: "transparent",
          color: "black",
          padding: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={0}
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display={"flex"}
              gap={1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar src={logo} alt="companylogo" />
              <Typography color="primary" fontSize={"20px"}>
                Lead{" "}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <Avatar
                onClick={handleOpenUserMenu}
                src="https://mui.com/static/images/avatar/2.jpg"
                alt="User Avatar"
                sx={{
                  ":hover": { cursor: "pointer", border: "1px solid blue" },
                }}
              />
              <Box ml={2}>
                <Typography variant="body1">
                  {localStorage.getItem("name")}
                </Typography>
                <Typography variant="caption">
                  {localStorage.getItem("userRole")}
                </Typography>
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
