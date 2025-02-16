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
  Avatar,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManagerLayout from "./ManagerLayout";
import { DoneAll, People, Subscriptions } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts";
import moment from "moment";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [chartData, setchartData] = useState([]);

  const [remainingDays, setRemainingDays] = useState(null);
  const [subscription, setSubscription] = useState("");
  const [completedLeads, setCompletedLeads] = useState("");

  const [topEmployee, setTopEmployee] = useState([]);
  const [recentCompleted, setrecentCompleted] = useState([]);

  const fetchdetails = async () => {
    const { data } = await axios.get("/api/v1/manager/dashboard", {
      withCredentials: true,
    });
    setProfile(data?.manager);
    setTotalLeads(data?.totalLeads);
    setTotalEmployees(data?.totalEmployees);
    setchartData(data?.chartData);
  };
  const fetchOtherDetails = async () => {
    try {
      const { data: subscription } = await axios.get(
        "/api/v1/manager/subscription-endsIn",
        {
          withCredentials: true,
        }
      );
      setRemainingDays(subscription?.remainingDuration);
      setSubscription(subscription?.subscription);

      const { data: recentLeads } = await axios.get(
        "/api/v1/manager/recent-completed-leads",
        {
          withCredentials: true,
        }
      );
      setrecentCompleted(recentLeads.completedLeads)
      const { data: leadCompleted } = await axios.get(
        "/api/v1/manager/lead-completed",
        {
          withCredentials: true,
        }
      );
      setCompletedLeads(leadCompleted?.completedLeads);

      const { data: topPerformer } = await axios.get(
        "/api/v1/manager/top-performer",
        {
          withCredentials: true,
        }
      );
      setTopEmployee(topPerformer?.topEmployee);
      // setProfile(data?.manager);
      // setTotalLeads(data?.totalLeads);
      // setTotalEmployees(data?.totalEmployees);
      // setchartData(data?.chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdetails();
    fetchOtherDetails();
  }, []);

  return (
    <ManagerLayout>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Card
          elevation={6}
          sx={{
            backgroundImage:
              "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "0px 10px",
              }}
            >
              <Avatar variant="rounded" sx={{ bgcolor: "lightgreen" }}>
                <People color="white" />
              </Avatar>
              <Typography>Total Employees</Typography>
              <Typography color="blue" variant="h4">
                {totalEmployees}{" "}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={6}
          sx={{
            backgroundImage:
              "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "0px 10px",
              }}
            >
              <Avatar variant="rounded" sx={{ bgcolor: "lightgreen" }}>
                <People color="white" />
              </Avatar>
              <Typography>Total Lead</Typography>
              <Typography color="blue" variant="h4">
                {totalLeads}{" "}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={6}
          sx={{
            backgroundImage:
              "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "0px 10px",
              }}
            >
              <Avatar variant="rounded" sx={{ bgcolor: "lightgreen" }}>
                <Subscriptions color="white" />
              </Avatar>
              <Typography>Subscription</Typography>
              <Typography color="blue">
                {" "}
                {remainingDays > 0 ? subscription : "-"}{" "}
              </Typography>
              <Typography
                color={remainingDays > 10 ? "green" : "red"}
                variant="h6"
              >
                {remainingDays > 0 ? `${remainingDays} Days Left` : "Expired"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={6}
          sx={{
            backgroundImage:
              "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "0px 10px",
              }}
            >
              <Avatar variant="rounded" sx={{ bgcolor: "lightgreen" }}>
                <DoneAll color="primary" />
              </Avatar>
              <Typography>Completed Leads This month</Typography>
              <Typography color="black" variant="h4">
                {completedLeads}{" "}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Card elevation={6} sx={{ marginTop: "40px" }}>
          <Typography textAlign={"center"} variant="h6">
            All Lead Count
          </Typography>
          <CardContent>
            <PieChart
              //   sx={{ marginTop: "30px" }}
              series={[
                {
                  data: chartData,
                },
              ]}
              width={400}
              height={200}
            />
          </CardContent>
        </Card>
      </Box> */}

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly",mt:"50px" }}
      >
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Typography variant="h6" color="blue">
            Top performer Of the month
          </Typography>
          <TableContainer component={Paper} elevation={6}>
            <TableContainer aria-label="completed leads table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Completed Leads</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topEmployee?.map((lead) => (
                  <TableRow key={lead?._id?._id}>
                    <TableCell>{lead?._id?.firstName}</TableCell>
                    <TableCell>{lead?._id?.lastName}</TableCell>
                    <TableCell>{lead?._id?.email}</TableCell>
                    <TableCell>{lead?.completedLeads}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>
        </Box>

        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Typography variant="h6" color="blue">
            Recent Completed Lead{" "}
          </Typography>
          <TableContainer component={Paper} elevation={6}>
            <TableContainer aria-label="completed leads table">
              <TableHead>
                <TableRow>
                  <TableCell>Lead Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Details</TableCell> */}
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentCompleted?.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>{lead.masterLead.name}</TableCell>
                    <TableCell>{lead.masterLead.email}</TableCell>
                    {/* <TableCell>{lead.masterLead.details}</TableCell> */}
                    <TableCell>{`${lead.assignedTo.firstName} ${lead.assignedTo.lastName}`}</TableCell>
                    <TableCell>
                      {moment(lead?.updatedAt).format("DD-MM-YYYY ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>
        </Box>
      </Box>
    </ManagerLayout>
  );
}

export default ManagerDashboard;
