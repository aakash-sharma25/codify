/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Toolbar,
  Button,
  Stack,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit, Add } from "@mui/icons-material";
import axios from "axios";
import ManagerLayout from "./ManagerLayout";

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
    field: "assignedTo",
    headerName: "Assigned To",
    width: 250,
    renderCell: (params) => (
      <p>
        {" "}
        {params?.row?.assignedTo?.firstName +
          " " +
          params?.row?.assignedTo?.lastName}{" "}
      </p>
    ),
  },
  {
    field: "assignedBy",
    headerName: "Assigned By",
    width: 250,
    renderCell: (params) => (
      <p>
        {" "}
        {params?.row?.assignedBy?.firstName +
          " " +
          params?.row?.assignedBy?.lastName}{" "}
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
        <IconButton
          color="primary"
          onClick={() => handleEdit(params?.row?._id)}
        >
          <Edit />
        </IconButton>
      </Box>
    ),
  },
];

const handleDelete = (id) => {
  alert(`Deleting lead with ID: ${id}`);
};

const handleEdit = (id) => {
  alert(`Editing lead with ID: ${id}`);
};

const AssignModal = ({
  open,
  setOpen,
  selectedLeads,
  setSelectedLeads,
  fetchLeads,
}) => {
  const [employeeId, setemployeeId] = useState("");
  const [employees, setemployees] = useState([]);

  const fetchEmployees = async () => {
    const { data } = await axios.get("/api/v1/manager/all-emp-list", {
      withCredentials: true,
    });
    setemployees(data.employees);
  };

  const assignLeads = async () => {
    await axios.post(
      "/api/v1/manager/assign-leads",
      {
        employeeId: employeeId,
        leads: selectedLeads,
      },
      {
        withCredentials: true,
      }
    );
    setOpen(false);
    setSelectedLeads([]);
    fetchLeads();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Select Employee</DialogTitle>
        <DialogContent>
          <Select
            name="employee"
            fullWidth
            value={employeeId}
            onChange={(e) => setemployeeId(e.target.value)}
            label="employee"
          >
            {employees?.map((m) => (
              <MenuItem key={m?._id} value={m._id}>
                {" "}
                {m.firstName + " " + m.lastName}{" "}
              </MenuItem>
            ))}
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
              assignLeads();
            }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function ManagerLeads() {
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [openAssign, setOpenAssign] = useState(false);

  const fetchLeads = async () => {
    const { data } = await axios.get("/api/v1/manager/all-leads", {
      withCredentials: true,
    });
    setLeads(data?.leads);
  };

  const handleSelection = async (selectedId) => {
    setSelectedLeads(selectedId);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <ManagerLayout>
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
        <Stack alignItems={"flex-end"} m={2} gap={3}>
          <Button
            onClick={() => setOpenAssign(true)}
            startIcon={<Add />}
            variant="outlined"
          >
            Assign To
          </Button>
        </Stack>
        <DataGrid
          rows={leads}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          onRowSelectionModelChange={(selectionId) =>
            handleSelection(selectionId)
          }
        />
      </Box>

      {openAssign && (
        <AssignModal
          open={openAssign}
          setOpen={setOpenAssign}
          selectedLeads={selectedLeads}
          setSelectedLeads={setSelectedLeads}
          fetchLeads={fetchLeads}
        />
      )}
    </ManagerLayout>
  );
}

export default ManagerLeads;
