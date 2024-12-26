/* eslint-disable react/prop-types */
import { Assignment, Group } from "@mui/icons-material";
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
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function ManagerLayout({ children }) {
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
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItemButton
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    pathname === "/manager/dashboard" ? "gray" : "transparent",
                }}
                onClick={() => navigate("/manager/dashboard")}
              >
                <ListItemIcon>
                  <Assignment style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    pathname === "/manager/leads" ? "gray" : "transparent",
                }}
                onClick={() => navigate("/manager/leads")}
              >
                <ListItemIcon>
                  <Assignment style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    pathname === "/manager/employees" ? "gray" : "transparent",
                }}
                onClick={() => navigate("/manager/employees")}
              >
                <ListItemIcon>
                  <Group style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Employees" />
              </ListItemButton>
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

export default ManagerLayout;
