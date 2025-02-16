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

export default function TopPerformer({employeeCount=0}) {

  const [topEmployee, setTopEmployee] = useState([]);

  const fetchTopPerformer = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/top-performer");
      console.log(data);
      setTopEmployee(data?.topEmployee);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTopPerformer();
  }, []);
  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"} >
      <Typography variant="h6" color="blue">Top performer Of the month</Typography>
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
    </>
    // <Box display={"flex"} alignItems={"center"} flexDirection={"column"} >
    // <Typography variant="h6" color="blue">Recent Completed Lead </Typography>
    //   <TableContainer component={Paper} elevation={6}>
    //     <TableContainer aria-label="completed leads table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Lead Name</TableCell>
    //           <TableCell>Email</TableCell>
    //           {/* <TableCell>Details</TableCell> */}
    //           <TableCell>Assigned To</TableCell>
    //           <TableCell>Date</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {completedLeads.map((lead) => (
    //           <TableRow key={lead._id}>
    //             <TableCell>{lead?.firstName}</TableCell>
    //             <TableCell>{lead?.masterLead?.email}</TableCell>
    //             {/* <TableCell>{lead.masterLead.details}</TableCell> */}
    //             <TableCell>{`${lead?.assignedTo?.firstName} ${lead?.assignedTo?.lastName}`}</TableCell>
    //             {/* <TableCell>{moment(lead?.updatedAt).format('DD-MM-YYYY ')}</TableCell> */}
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </TableContainer>
    //   </TableContainer>
    // </Box>
  );
}

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Box, Avatar, Typography } from "@mui/material";
// import People from "@mui/icons-material/People";

// const TopPerformer = () => {
//   // Set initial login time to 10 hours and 0 minutes
//   const [loginTime, setLoginTime] = useState({ hours: 10, minutes: 0 });

//   // Update the login time every minute (60000 ms = 1 minute)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLoginTime(prevTime => {
//         // Increment the minutes
//         let newMinutes = prevTime.minutes + 1;
//         let newHours = prevTime.hours;

//         // If minutes reach 60, reset to 0 and increment the hour
//         if (newMinutes === 60) {
//           newMinutes = 0;
//           newHours += 1;
//         }

//         return { hours: newHours, minutes: newMinutes };
//       });
//     }, 60000); // 60000ms = 1 minute

//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, []);

//   return (
//     <Card
//       elevation={6}
//       sx={{
//         backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
//       }}
//     >
//       <CardContent>
//         <Box
//           sx={{
//             width: "150px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             padding: "0px 10px",
//           }}
//         >
//           <Avatar variant="rounded" sx={{ bgcolor: "lightgreen" }}>
//             <People color="white" />
//           </Avatar>
//           <Typography>Total Login Time</Typography>
//           <Typography color="blue" variant="h4">
//             {loginTime.hours}h {loginTime.minutes}m
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default TopPerformer;
