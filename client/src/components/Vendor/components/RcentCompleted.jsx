import {
  Avatar,
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DoneAll, People, Person3 } from "@mui/icons-material";
import moment from "moment";

export default function RcentCompleted() {
  const [completedLeads, setCompletedLeads] = useState([]);
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/recent-completed-leads");
      console.log(data);
      setCompletedLeads(data?.completedLeads);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTotalEmployee();
  }, []);
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} >
    <Typography variant="h6" color="blue">Recent Completed Lead </Typography>
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
            {completedLeads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.masterLead.name}</TableCell>
                <TableCell>{lead.masterLead.email}</TableCell>
                {/* <TableCell>{lead.masterLead.details}</TableCell> */}
                <TableCell>{`${lead.assignedTo.firstName} ${lead.assignedTo.lastName}`}</TableCell>
                <TableCell>{moment(lead?.updatedAt).format('DD-MM-YYYY ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
    </Box>
  );
}
