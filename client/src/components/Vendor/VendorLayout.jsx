import { Assignment, Group, PlaylistAdd } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function VendorLayout({ children }) {

  const navigate = useNavigate();

  return (
    <>
      <Box display={"flex"}>
        <Navbar />
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem
                button
                onClick={() => navigate("/vendor/dashboard")}
              >
                <ListItemIcon>
                  <Assignment style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>
              <ListItem button onClick={() => navigate("/vendor/employees")}>
                <ListItemIcon>
                  <Group style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Employees" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: `calc(100% - ${240}px)`,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default VendorLayout;
