import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userRole", data?.role);
      // let role = data.role;

      navigate(`/${data?.role?.toLowerCase()}/dashboard`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
   
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={4}
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            bgcolor: "white",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
            Login Now to start your journey with us!!
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            name="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Don't have an account?
            <Typography
              component={"span"}
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Create one
            </Typography>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
