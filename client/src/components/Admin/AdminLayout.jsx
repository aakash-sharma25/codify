import { Assignment, Group, PlaylistAdd } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { bgDark, listItemsColor } from "../../constants/ColorConstant";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
              backgroundColor: bgDark,
              color: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItemButton
                style={{
                  borderRadius: "0 40px 40px 0",
                  backgroundColor:
                    pathname === "/superadmin/dashboard"
                      ? "Highlight"
                      : "transparent",
                }}
                onClick={() => navigate("/superadmin/dashboard")}
              >
                <ListItemIcon>
                  <Assignment style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "0 40px 40px 0",
                  backgroundColor:
                    pathname === "/superadmin/vendors" ? "Highlight" : "transparent",
                }}
                onClick={() => navigate("/superadmin/vendors")}
              >
                <ListItemIcon>
                  <Group style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Vendors" />
              </ListItemButton>
              {/* <ListItem button onClick={() => navigate("/superadmin/dashboard")}>
                <ListItemIcon>
                  <PlaylistAdd style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Requested Lead" />
              </ListItem> */}
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

export default AdminLayout;
