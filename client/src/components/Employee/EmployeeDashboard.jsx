import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from "./EmploeeLayout"


function EmployeeDashbord() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const fetchdetails = async () => {
    // const { data } = await axios.get("/api/v1/vendor/dashboard", {
    //   withCredentials: true,
    // });
    // setProfile(data?.vendor);
    // setTotalLeads(data?.totalLeads);
    // setTotalEmployees(data?.totalEmployees);
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <EmployeeLayout>
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
                    onClick={() => navigate("/employee/leads")}
                  >
                    View
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </EmployeeLayout>
  );
}

export default EmployeeDashbord;
