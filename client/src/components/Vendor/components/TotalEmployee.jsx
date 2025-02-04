import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { People, Person3 } from "@mui/icons-material";

export default function TotalEmployee() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/total-employees");
      console.log(data);
      setEmployeeCount(data?.employees);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTotalEmployee();
  }, []);
  return (
    <Card
      elevation={6}
      sx={{
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
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
            {employeeCount}{" "}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
