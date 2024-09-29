import React from 'react';
import { TextField, Button, Box, Typography, Link, Grid, Paper } from '@mui/material';

const CreateAccountForm = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Side: Form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}
      >
        <Typography component="h1" variant="h4" fontWeight="bold">
          Create Account
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={(e) => { e.preventDefault(); }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile No"
                name="mobile"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white' }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login Now
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Right Side: Illustration */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '60%',
            height: '300px',
            backgroundColor: '#d4f7d4',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '80%',
              height: '60%',
              backgroundColor: '#a0e4a0',
              borderRadius: '5px',
              border: '3px solid #673ab7',
              position: 'absolute',
              top: '10%',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '5px',
              padding: '10px',
            }}
          >
            {/* Simulated Grid Elements */}
            {[...Array(20)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#4caf50' : '#000',
                  borderRadius: '4px',
                  width: '100%',
                  height: '100%',
                }}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateAccountForm;
