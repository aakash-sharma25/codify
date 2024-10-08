import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Toolbar,
  Button,
  Stack,
  Modal,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Delete, Edit, Add } from "@mui/icons-material";
import VendorLayout from "./VendorLayout";
import axios from "axios";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params) => <p> {params.row.masterLead.name} </p>,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    renderCell: (params) => <p> {params.row.masterLead.location} </p>,
  },
  {
    field: "email",
    headerName: "Email ID",
    width: 200,
    renderCell: (params) => <p> {params.row.masterLead.email} </p>,
  },
  {
    field: "phone",
    headerName: "Mobile no",
    width: 120,
    renderCell: (params) => <p> {params.row.masterLead.phone} </p>,
  },
  {
    field: "details",
    headerName: "Lead For",
    width: 400,
    renderCell: (params) => <p> {params.row.masterLead.details} </p>,
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

const RequestModal = ({ open, setOpen, handleRequestLead }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Enter category for of leads</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            name="category"
            label="Enter Category"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleRequestLead();
            }}
          >
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchLeads = async () => {
    const { data } = await axios.get("/api/v1/vendor/all-leads", {
      withCredentials: true,
    });
    setLeads(data?.leads);
  };
  const handleRequestLead = async () => {
    try {
      await axios.get("/api/v1/vendor/request-leads", {
        withCredentials: true,
      });
      fetchLeads();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
        <Stack alignItems={"flex-end"} m={2}>
          <Button
            onClick={() => setOpen(true)}
            startIcon={<Add />}
            variant="contained"
          >
            Request Leads
          </Button>
        </Stack>
        <DataGrid
          rows={leads}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </Box>
      {open && (
        <RequestModal
          open={open}
          setOpen={setOpen}
          handleRequestLead={handleRequestLead}
        />
      )}
    </VendorLayout>
  );
}

export default AllLeads;
