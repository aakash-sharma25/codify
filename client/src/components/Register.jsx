import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid2,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import illustration from "../assets/Illustration.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = { firstName, lastName, email, password, phone };

    axios
      .post("http://localhost:8000/api/v1/auth/register", data)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={7}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                label="First Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <TextField
            required
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            required
            label="Mobile No"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            required
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Create Account
          </Button>

          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Typography
              component={"span"}
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login now
            </Typography>
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={5}
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <img
            src={illustration} 
            alt="illustration"
            style={{ width: "100%" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
