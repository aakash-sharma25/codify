import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DoneAll, People, Person3 } from "@mui/icons-material";

export default function CompletedLeadThisMonth() {
  const [completedLeads, setCompletedLeads] = useState(0);
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/completed-leads");
      setCompletedLeads(data?.completedLeads);
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
            <DoneAll color="primary" />
          </Avatar>
          <Typography>Completed Leads This month</Typography>
          <Typography color="black" variant="h4">
            {completedLeads}{" "}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

