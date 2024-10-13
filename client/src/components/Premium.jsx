import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

export default function Premium() {
  const [role, setRole] = useState();
  const handleBuyPremium = async () => {
    const { data } = await axios.post(
      "/api/v1/vendor/buy-subscription",
      {
        plan: role,
      },
      { withCredentials: true }
    );
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: "4rem", paddingBottom: "3rem" }}>
      <Select
        labelId="role-label"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        label="Role"
      >
        <MenuItem value="Gold">Gold</MenuItem>
        <MenuItem value="Diamond">Diamond</MenuItem>
      </Select>
      <Button onClick={handleBuyPremium}>Buy Premium</Button>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Choose Your Premium Plan
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          maxWidth="sm"
          mx="auto"
          mt={1}
        >
          Select the best plan for you. Need more or less? Customize your
          subscription for a seamless fit!
        </Typography>
      </Box>

      {/* Plans Section */}
      <Grid container spacing={4} justifyContent="center">
        {/* Basic Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
              backgroundColor: "#f5f5f5",
              border: "2px solid #000000", // Adding border to Basic Plan
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Basic
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Free Trial
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                ₹0
              </Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Features
              </Typography>
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: 0,
                  lineHeight: "1.8",
                }}
              >
                {[
                  "Employee directory",
                  "Task management",
                  "Calendar integration",
                  "File storage",
                  "Communication tools",
                  "Reporting and analytics",
                ].map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <CheckCircle
                      fontSize="small"
                      sx={{ color: "primary.main", marginRight: "0.5rem" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "0.8rem",
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                marginTop: "auto",
                "&:hover": {
                  backgroundColor: "#1976d2", // Darker shade on hover
                },
              }}
            >
              Get Started
            </Button>
          </Card>
        </Grid>

        {/* Gold Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
              backgroundColor: "#000",
              color: "#fff",
              border: "2px solid #000000", // Adding border to Gold Plan
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Gold
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                For large teams & corporations.
              </Typography>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                ₹200 / month
              </Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Features
              </Typography>
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: 0,
                  lineHeight: "1.8",
                }}
              >
                {[
                  "Advanced employee directory",
                  "Project management",
                  "Resource scheduling",
                  "Version control",
                  "Team collaboration",
                  "Advanced analytics",
                ].map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <CheckCircle
                      fontSize="small"
                      sx={{ color: "primary.main", marginRight: "0.5rem" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                padding: "0.8rem",
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                marginTop: "auto",
                "&:hover": {
                  backgroundColor: "#ff4081", // Darker shade on hover
                },
              }}
            >
              Get Started
            </Button>
          </Card>
        </Grid>

        {/* Diamond Plan */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
              backgroundColor: "#f5f5f5",
              border: "2px solid #000000", // Adding border to Diamond Plan
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Diamond
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Best for business owners.
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                ₹400 / month
              </Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Features
              </Typography>
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: 0,
                  lineHeight: "1.8",
                }}
              >
                {[
                  "Customizable employee directory",
                  "Client project management",
                  "Client meeting scheduling",
                  "Compliance tracking",
                  "Client communication",
                  "Create custom reports tailored",
                ].map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <CheckCircle
                      fontSize="small"
                      sx={{ color: "primary.main", marginRight: "0.5rem" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "0.8rem",
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                marginTop: "auto",
                "&:hover": {
                  backgroundColor: "#1976d2", // Darker shade on hover
                },
              }}
            >
              Get Started
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
