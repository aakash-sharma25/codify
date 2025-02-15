/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Toolbar,
  Stack,
  MenuItem,
  Select,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import EmployeeLayout from "./EmploeeLayout";

const UpdateModal = ({
  open,
  setOpen,
  selectedStatus,
  selectedLead,
  fetchLeads,
}) => {
  const [status, setStatus] = useState(selectedStatus);

  const changeStatus = async () => {
    await axios.post(
      "/api/v1/employee/lead/update-status",
      {
        leadId: selectedLead,
        status: status,
      },
      {
        withCredentials: true,
      }
    );
    setOpen(false);
    fetchLeads();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Select Status</DialogTitle>
        <DialogContent>
          <Select
            name="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem key={"unassigned"} value={"unassigned"}>
              Un-Assigned
            </MenuItem>
            <MenuItem key={"assigned"} value={"assigned"}>
              Assigned
            </MenuItem>
            <MenuItem key={"in-progress"} value={"in-progress"}>
              In-Progress
            </MenuItem>
            <MenuItem key={"completed"} value={"completed"}>
              Completed
            </MenuItem>
          </Select>
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
              changeStatus();
            }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function EmployeeLeads() {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      renderCell: (params) => <p> {params?.row?.masterLead?.name} </p>,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => <p> {params?.row?.masterLead?.location} </p>,
    },
    {
      field: "email",
      headerName: "Email ID",
      width: 200,
      renderCell: (params) => <p> {params?.row?.masterLead?.email} </p>,
    },
    {
      field: "phone",
      headerName: "Mobile no",
      width: 120,
      renderCell: (params) => <p> {params?.row?.masterLead?.phone} </p>,
    },
    {
      field: "details",
      headerName: "Lead For",
      width: 400,
      renderCell: (params) => <p> {params?.row?.masterLead?.details} </p>,
    },
    {
      field: "status",
      headerName: "status",
      width: 250,
    },
    {
      field: "Manager",
      headerName: "Manager / Assigned By",
      width: 250,
      renderCell: (params) => (
        <p>
          {" "}
          {params?.row?.manager?.firstName +
            " " +
            params?.row?.manager?.lastName}{" "}
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
          <IconButton
            color="error"
            onClick={() => handleDelete(params?.row?._id)}
          >
            <Delete />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit(params?.row)}>
            <Edit />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = (id) => {
    alert(`Deleting lead with ID: ${id}`);
  };

  const handleEdit = (data) => {
    setSelectedLead(data._id);
    setSelectedStatus(data.status);
    setOpen(true);
  };
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const fetchLeads = async () => {
    const { data } = await axios.get("/api/v1/employee/all-leads", {
      withCredentials: true,
    });
    setLeads(data?.leads);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <EmployeeLayout>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>

      {/* Search Bar */}
      {/* <TextField
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
      /> */}
      <Box style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <Stack alignItems={"flex-end"} m={2} gap={3}></Stack>
        <DataGrid
          rows={leads}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
      {open && (
        <UpdateModal
          open={open}
          setOpen={setOpen}
          selectedLead={selectedLead}
          selectedStatus={selectedStatus}
          fetchLeads={fetchLeads}
        />
      )}
    </EmployeeLayout>
  );
}

export default EmployeeLeads;
