import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

export default function AllLeadsPieChart() {
  const [chartData, setChartData] = useState([]);
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/individual-lead-count");
      setChartData(data?.chartData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTotalEmployee();
  }, []);
  return (
    <Card elevation={6} sx={{marginTop:"40px"}}>
    <Typography textAlign={"center"} variant="h6">All Lead Count</Typography>
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
  );
}
