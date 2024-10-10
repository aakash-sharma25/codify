import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Toolbar,
  Stack,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Search,
  Delete,
  Edit,
  EmojiEmotions,
  ViewInAr,
  PanoramaFishEye,
  Visibility,
  Add,
} from "@mui/icons-material";
import axios from "axios";
import VendorLayout from "./VendorLayout";
import AddEmployeeModal from "../AddEmployeeModal";

const columns = [
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email ID", width: 200 },
  { field: "phone", headerName: "Mobile No", width: 200 },
  { field: "subscription", headerName: "Subscription", width: 200 },
  { field: "role", headerName: "Role", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <IconButton color="error" onClick={() => console.log(params)}>
          <Visibility />
        </IconButton>
      </Box>
    ),
  },
];

const handleDelete = (id) => {
  alert(`Deleting lead with ID: ${id}`);
};

function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchEmployees = async () => {
    const { data } = await axios.get("/api/v1/vendor/all-employee", {
      withCredentials: true,
    });
    setEmployees(data.employee);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <VendorLayout>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>

      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search Lead..."
        fullWidth
        InputProps={{
          startAdornment: (
            <IconButton position="start">
              <Search />
            </IconButton>
          ),
        }}
      />
      <Box style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <Stack alignItems={"flex-end"} m={2}>
          <Button
            onClick={() => setOpen(true)}
            startIcon={<Add />}
            variant="contained"
          >
            Add Employee
          </Button>
        </Stack>
        <DataGrid
          rows={employees}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          // checkboxSelection
          // loading={open}
        />
      </Box>
      {
        open && <AddEmployeeModal open={open} setOpen={setOpen} fetchEmployees={fetchEmployees} />
      }
    </VendorLayout>
  );
}

export default AllEmployee;
