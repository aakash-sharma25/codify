import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Delete, Edit, EmojiEmotions, ViewInAr, PanoramaFishEye, Visibility } from "@mui/icons-material";
import axios from "axios";
import VendorLayout from "./VendorLayout";

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

  const fetchLeads = async () => {
    const { data } = await axios.get("/api/v1/vendor/all-employee", {
      withCredentials: true,
    });
    setEmployees(data.employee)
    // if (data && data.size > 0) {
    //   setEmployees(data.allVendor);
    // }
  };

  useEffect(() => {
    fetchLeads();
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
        <DataGrid
          rows={employees}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          // checkboxSelection
        />
      </Box>
    </VendorLayout>
  );
}

export default AllEmployee;
