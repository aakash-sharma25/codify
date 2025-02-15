import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Delete, Edit } from "@mui/icons-material";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";

const columns = [
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "email", headerName: "Email ID", width: 200 },
  { field: "phone", headerName: "Mobile No", width: 200 },
  { field: "subscription", headerName: "Subscription", width: 200 },
  {
    field: "createdAt",
    headerName: "Joined",
    width: 200,
    renderCell: (params) => (
      <p>{moment(params?.row?.createdAt).format("DD-MM-YYYY")} </p>
    ),
  },
  {
    field: "",
    headerName: "Subscription Date",
    width: 200,
    renderCell: (params) => (
      <p>
        {" "}
        {params?.row?.subscriptionDate
          ? moment(params?.row?.subscriptionDate).format("DD-MM-YYYY")
          :"-"}{" "}
      </p>
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
      </Box>
    ),
  },
];

const handleDelete = (id) => {
  alert(`Deleting lead with ID: ${id}`);
};

function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/admin/vendor-list", {
        withCredentials: true,
      });
      if (data && data.size > 0) {
        setVendors(data.allVendor);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("internal server error");
      setLoading(false);
    }
  };
  const searchVendor = async (search) => {
    try {
      if (search == "") {
        fetchLeads();
        return;
      }
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/admin/vendor-search",
        {
          search,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        setVendors(data.user);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("internal server error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <AdminLayout>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        All Vendors
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search Vendors ..."
        fullWidth
        onChange={(e) => searchVendor(e.target.value)}
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
          rows={vendors}
          getRowId={(row) => row._id}
          columns={columns}
          disableRowSelectionOnClick
          pageSize={5}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20]}
          // checkboxSelection
        />
      </Box>
    </AdminLayout>
  );
}

export default AllVendors;
