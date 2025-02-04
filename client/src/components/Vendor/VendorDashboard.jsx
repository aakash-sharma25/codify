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
import VendorLayout from "./VendorLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TotalLeads from "./components/TotalLeads";
import TotalEmployee from "./components/TotalEmployee";
import SubscriptionDetails from "./components/SubscriptionDetails";
import CompletedLeadThisMonth from "./components/CompletedLeadThisMonth";
import RcentCompleted from "./components/RcentCompleted";
import AllLeadsPieChart from "./components/AllLeadsPieChart";

function VendorDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [chartData, setChartData] = useState([]);

  const fetchdetails = async () => {
    const { data } = await axios.get("/api/v1/vendor/dashboard", {
      withCredentials: true,
    });

    setProfile(data?.vendor);
    setTotalLeads(data?.totalLeads);
    setTotalEmployees(data?.totalEmployees);
    setChartData(data?.chartData);
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <VendorLayout>
      <Toolbar />
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TotalEmployee />
          <TotalLeads />
          <SubscriptionDetails />
          <CompletedLeadThisMonth />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <RcentCompleted />
          <AllLeadsPieChart/>
          {/* <TotalEmployee />
          <TotalLeads />
          <SubscriptionDetails />
          <CompletedLeadThisMonth /> */}
        </Box>
      </Box>
      {/* <Box sx={{ flexGrow: 1, padding: 4 }}> */}
      {/* <Grid container spacing={2}> */}

      {/* <Grid item xs={12} md={6}>
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
                  <strong>Subscription Date:</strong>{" "}
                  {profile?.subscriptionDate
                    ? profile?.subscriptionDate
                    : "Not Valid"}
                </Typography>
              </CardContent>
            </Card>

            <PieChart
              sx={{ marginTop: "30px" }}
              series={[
                {
                  data: chartData,
                },
              ]}
              width={400}
              height={200}
            />
          </Grid> */}

      {/* <Grid item xs={12} md={6}>
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
          </Grid> */}

      {/* </Grid> */}
      {/* </Box> */}
    </VendorLayout>
  );
}

export default VendorDashboard;
