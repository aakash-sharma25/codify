import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Illustration  from "../assets/Illustration.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/v1/auth/login", { email, password })
      .then((response) => {
        console.log("Login successful:", response.data);
        // Handle success (e.g., redirect)
      })
      .catch((error) => {
        console.error("Login error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // <Grid container style={{ height: "100vh" }}>
    //   {/* Left side - Form */}
    //   <Grid
    //     item
    //     xs={12}
    //     md={8}
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       backgroundColor: "#ffff", // Red background
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         width: 500,
    //         backgroundColor: "#fff",
    //         padding: 3,
    //         borderRadius: 2,
    //         // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    //       }}
    //     >
    //       <Typography variant="h5" align="center" gutterBottom>
    //         Create Account
    //       </Typography>

    //       <Box component="form" noValidate autoComplete="off">
    //         <Box sx={{ display: "flex", gap: 2 }}>
    //           <TextField
    //             margin="normal"
    //             fullWidth
    //             id="firstName"
    //             label="First Name"
    //             variant="outlined"
    //             required
    //           />
    //           <TextField
    //             margin="normal"
    //             fullWidth
    //             id="lastName"
    //             label="Last Name"
    //             variant="outlined"
    //             required
    //           />
    //         </Box>
    //         <TextField
    //           margin="normal"
    //           fullWidth
    //           id="email"
    //           label="Email"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           margin="normal"
    //           fullWidth
    //           id="mobileNo"
    //           label="Mobile No"
    //           variant="outlined"
    //           required
    //         />
    //         <TextField
    //           margin="normal"
    //           fullWidth
    //           id="password"
    //           label="Password"
    //           type="password"
    //           variant="outlined"
    //           required
    //         />
    //         <Button
    //           variant="contained"
    //           fullWidth
    //           sx={{ marginTop: 2, backgroundColor: "#333" }}
    //         >
    //           Create Account
    //         </Button>
    //       </Box>

    //       <Box mt={2} textAlign="center">
    //         <Typography variant="body2">
    //           Already have an account?{" "}
    //           <Link href="#" underline="hover">
    //             Login Now
    //           </Link>
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Grid>

    //   {/* Right side - Image */}
    //   <Grid
    //     item
    //     xs={12}
    //     md={4}
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       backgroundColor: "#1E1E1E", // Dark background
    //     }}
    //   >
    //     {/* Placeholder for the image */}
    //     <Box
    //       sx={{
    //         width: 300,
    //         height: 300,
    //         // backgroundColor: "#E0F7FA", // Placeholder light blue
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <img src={Illustration} />
    //     </Box>
    //   </Grid>
    // </Grid>
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
