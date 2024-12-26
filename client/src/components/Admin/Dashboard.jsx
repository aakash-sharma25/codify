import { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Delete, Edit } from "@mui/icons-material";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import moment from "moment";

const columns = [
  { field: "name", headerName: "Name", width: 180 },
  { field: "location", headerName: "Location", width: 150 },
  { field: "email", headerName: "Email ID", width: 200 },
  { field: "phone", headerName: "Mobile no", width: 120 },
  { field: "details", headerName: "Lead For", width: 300 },
  // { field: "isGenuine", headerName: "Is Genuine", width: 120 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    renderCell: (params) => (
      <p>{moment(params?.row?.createdAt).format("DD-MM-YYYY")} </p>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
          <Delete />
        </IconButton>
        <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
          <Edit />
        </IconButton>
      </Box>
    ),
  },
];

// Function to handle delete action
const handleDelete = (id) => {
  alert(`Deleting lead with ID: ${id}`);
};

// Function to handle edit action
const handleEdit = (id) => {
  alert(`Editing lead with ID: ${id}`);
};

function Dashboard() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const { data } = await axios.get("/api/v1/admin/all-leads", {
      withCredentials: true,
    });
    if (data && data.size > 0) {
      setLeads(data.leads);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <AdminLayout>
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
          rows={leads}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          disableColumnSelector
          // checkboxSelection
        />
      </Box>
    </AdminLayout>
  );
}

export default Dashboard;
