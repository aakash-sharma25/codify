import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { bgDark } from "../constants/ColorConstant";
import img from "../assets/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const trimmedPassword = password.trim();
      if (trimmedPassword.length < 6) {
        return;
      }
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userRole", data?.role);
      localStorage.setItem("name", data?.name);
      localStorage.setItem("email", email);
      toast("Login Successfull", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      navigate(`/${data?.role?.toLowerCase()}/dashboard`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast(error?.response?.data?.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("name");
    if (role && name) {
      navigate(`/${role}/dashboard`);
    }
  }, []);
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={4}
        style={{
          backgroundColor: bgDark,
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
        <Box sx={{ position: "absolute", bottom: 0, left: 0 }}>
          <img alt="login Image" src={img} width={200} height={200} />
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
            Welcome to Lead Management System
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
            error={password.trim() !== "" && password.length < 6}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            helperText={
              password.trim() !== "" && password.length < 6
                ? "Password Minimum Length is 6"
                : ""
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Don't have an account?{" "}
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
