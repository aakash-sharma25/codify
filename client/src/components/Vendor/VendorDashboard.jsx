import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import VendorLayout from "./VendorLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const columns = [
//   { field: "name", headerName: "Name", width: 180 },
//   { field: "location", headerName: "Location", width: 150 },
//   { field: "email", headerName: "Email ID", width: 200 },
//   { field: "phone", headerName: "Mobile no", width: 120 },
//   { field: "details", headerName: "Lead For", width: 400 },
//   { field: "isGenuine", headerName: "Is Genuine", width: 120 },
//   { field: "createdAt", headerName: "Date", width: 150 },
//   {
//     field: "actions",
//     headerName: "Actions",
//     width: 150,
//     sortable: false,
//     renderCell: (params) => (
//       <Box>
//         <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
//           <Delete />
//         </IconButton>
//         <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
//           <Edit />
//         </IconButton>
//       </Box>
//     ),
//   },
// ];

// // Function to handle delete action
// const handleDelete = (id) => {
//   alert(`Deleting lead with ID: ${id}`);
// };

// // Function to handle edit action
// const handleEdit = (id) => {
//   alert(`Editing lead with ID: ${id}`);
// };

function VendorDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const fetchdetails = async () => {
    const { data } = await axios.get("/api/v1/vendor/dashboard", {
      withCredentials: true,
    });
    setProfile(data?.vendor);
    setTotalLeads(data?.totalLeads);
    setTotalEmployees(data?.totalEmployees);
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <VendorLayout>
      <Toolbar />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={2}>
          {/* Left Part: Profile Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 400, margin: "auto" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {profile?.firstName} {profile?.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Role: {profile?.role}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Email:</strong> {profile?.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Phone:</strong> {profile?.phone}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Subscription:</strong> {profile?.subscription}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Subscription Ends In:</strong>{" "}
                  {profile?.subscriptionDate
                    ? profile?.subscriptionDate
                    : "Not Valid"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Part: Counts Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 400, margin: "auto" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Employee Info
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Total Employees:</strong> {totalEmployees}
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/vendor/employees")}
                  >
                    View
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Leads Info
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Total Leads:</strong> {totalLeads}
                  <p>
                    <strong>
                      {totalLeads === 0 && "Request leads to get the leads"}
                    </strong>
                  </p>
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/vendor/leads")}
                  >
                    View
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </VendorLayout>
  );
}

export default VendorDashboard;
