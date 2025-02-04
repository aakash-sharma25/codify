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
import { Edit, Add, SupervisedUserCircleSharp } from "@mui/icons-material";
import VendorLayout from "./VendorLayout";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateModal = ({
  open,
  setOpen,
  selectedStatus,
  selectedLead,
  fetchLeads,
}) => {
  const [status, setStatus] = useState(selectedStatus);

  const changeStatus = async () => {
    try {
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
      fetchLeads();
    } catch (error) {
      console.log(error)
      toast.error("Internal server error");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <Box sx={{ width: "500px" }}>
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
              variant="contained"
              color="success"
              onClick={() => {
                changeStatus();
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

const RequestModal = ({ open, setOpen, handleRequestLead }) => {
  return (
    <>
      <Dialog open={open}>
        <Box sx={{ width: "500px" }}>
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
              variant="contained"
              color="success"
              onClick={() => {
                handleRequestLead();
              }}
            >
              Request
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

const AssignModal = ({
  open,
  setOpen,
  selectedLeads,
  setSelectedLeads,
  fetchLeads,
}) => {
  const [managerId, setManagerId] = useState("");
  const [managers, setManagers] = useState([]);

  const fetchManagers = async () => {
    const { data } = await axios.get("/api/v1/vendor/all-manager");
    setManagers(data.managers);
  };

  const assignLeads = async () => {
    await axios.post(
      "/api/v1/vendor/assign-leads",
      {
        managerId: managerId,
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
    fetchManagers();
  }, []);

  return (
    <>
      <Dialog open={open}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>Select manager</DialogTitle>
          <DialogContent>
            <Select
              id="manager"
              name="managers"
              fullWidth
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              label="Select Manager"
            >
              {managers?.map((m) => (
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
              variant="contained"
              color="success"
              onClick={() => {
                assignLeads();
              }}
            >
              Assign
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

function AllLeads() {
  
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
      headerName: "Status",
      width: 150,
    },
    {
      field: "manager",
      headerName: "Manager",
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
          <IconButton color="primary" onClick={() => handleEdit(params?.row)}>
            <Edit />
          </IconButton>
        </Box>
      ),
    },
  ];
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedLeadStatus, setSelectedLeadStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/vendor/all-leads", {
        withCredentials: true,
      });
      setLeads(data?.leads);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
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

  const handleSelection = async (selectedId) => {
    setSelectedLeads(selectedId);
  };

  const handleEdit = (params) => {
    setSelectedLeadId(params?._id);
    setSelectedLeadStatus(params?.status);
    setUpdateOpen(true);
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
            onClick={() => setOpen(true)}
            startIcon={<Add />}
            variant="contained"
          >
            Request Leads
          </Button>
          <Button
            onClick={() => setOpenAssign(true)}
            startIcon={<SupervisedUserCircleSharp />}
            variant="outlined"
            disabled={selectedLeads?.length < 1}
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
          loading={loading}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(selectionId) =>
            handleSelection(selectionId)
          }
        />
      </Box>
      {open && (
        <RequestModal
          open={open}
          setOpen={setOpen}
          handleRequestLead={handleRequestLead}
        />
      )}
      {openAssign && (
        <AssignModal
          open={openAssign}
          setOpen={setOpenAssign}
          selectedLeads={selectedLeads}
          setSelectedLeads={setSelectedLeads}
          fetchLeads={fetchLeads}
        />
      )}
      {updateOpen && (
        <UpdateModal
          open={updateOpen}
          setOpen={setUpdateOpen}
          selectedLead={selectedLeadId}
          selectedStatus={selectedLeadStatus}
          fetchLeads={fetchLeads}
        />
      )}
    </VendorLayout>
  );
}

export default AllLeads;
