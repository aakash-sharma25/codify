import { Checklist, People } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TotalLeads() {
  const [leadCount, setLeadCount] = useState(0);
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/total-leads");
      console.log(data);
      setLeadCount(data?.leads);
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
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
      }}
    >
      <CardContent>
        <Box
          sx={{
            width:"150px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0px 10px",
          }}
        >
          <Avatar variant="rounded" sx={{ bgcolor: "pink" }}>
            <Checklist color="info" />
          </Avatar>
          <Typography>Total Leads</Typography>
          <Typography color="blue" variant="h4">
            {leadCount}{" "}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
