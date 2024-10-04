import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Navbar() {
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
              <Avatar src="https://via.placeholder.com/150" alt="User Avatar" />
              <Box ml={2}>
                <Typography variant="body1">Aakash Sharma</Typography>
                <Typography variant="caption">Admin</Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
