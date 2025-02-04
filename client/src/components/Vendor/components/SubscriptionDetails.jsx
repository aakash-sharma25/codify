import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { People, Subscriptions } from "@mui/icons-material";
export default function SubscriptionDetails() {
  const [remainingDays, setRemainingDays] = useState(null);
  const [subscription, setSubscription] = useState("");
  const fetchTotalEmployee = async () => {
    try {
      const { data } = await axios.get("/api/v1/vendor/subscription-endsIn");
      console.log(data);
      setRemainingDays(data?.remainingDuration);
      setSubscription(data?.subscription);
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
            <Subscriptions color="white" />
          </Avatar>
          <Typography>Subscription</Typography>
          <Typography color="blue"> {subscription} </Typography>
          <Typography color={remainingDays > 10 ? "green" : "red"} variant="h6">
            {remainingDays} Days Left
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
