// src/pages/SignInPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Tabs, Tab, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'; // Correct import

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: 'auto',
}));

const TabPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SignInPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('signIn');

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
      onClose(); // Close dialog after successful sign-in
    } catch (error) {
      console.error('Sign-In Error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
      onClose(); // Close dialog after successful sign-in
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <StyledContainer component="main">
      <Typography variant="h5" gutterBottom align="center">
        Please Login To Continue
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Sign In and Sign Up Tabs">
          <Tab label="Sign In" value="signIn" />
          <Tab label="Sign Up" value="signUp" />
        </Tabs>
      </Box>
      <TabPanel>
        {activeTab === 'signIn' && (
          <div>
            <TextField
              label="Username or email"
              fullWidth
              margin="normal"
              autoComplete="on"
              InputProps={{
                startAdornment: (
                  <i className="gfg-icon gfg-icon-2 gfg-icon-grey-profile" />
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="on"
              InputProps={{
                startAdornment: (
                  <i className="gfg-icon gfg-icon-2 gfg-icon-grey-lock" />
                ),
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
              <div>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" style={{ fontSize: '12px', lineHeight: 'normal' }}>
                  Remember me
                </label>
              </div>
              <Button variant="text" color="primary">Forgot password</Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignIn}
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </div>
        )}
        {activeTab === 'signUp' && (
          <div>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </div>
        )}
        <Divider sx={{ my: 2 }}>or</Divider>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ flex: 1, mr: 1 }}
            onClick={handleGoogleSignIn}
          >
            <i className="gfg-icon gfg-icon-white-google" /> Google
          </Button>
        </Box>
      </TabPanel>
    </StyledContainer>
  );
};

export default SignInPage;