import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Tabs, Tab, Divider, Dialog } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: 'auto',
}));

const TabPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SignInPage = ({ onSuccess,onUserUpdate }) => { // Accept onSuccess prop
  const [activeTab, setActiveTab] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Send user details to your backend
      const response = await axios.post('http://localhost:4000/auth/firebase-signin', {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // Store the JWT token\
      onUserUpdate({ token });
      onSuccess(); // Close dialog after successful Google sign-in
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('Google Sign-In Error');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/signin', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onUserUpdate({ token }); // Store token in localStorage
      onSuccess(); // Close dialog on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign-In Error';
      setError(errorMessage); // Show error message on the UI
    }
  };

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:4000/auth/signup', { email, password, first_name: firstName, last_name: lastName });
      onSuccess(); // Close dialog on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign-Up Error';
      setError(errorMessage); // Show error message on the UI
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(''); // Clear error message on tab change
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
        {error && <Typography color="error" align="center">{error}</Typography>}
        {activeTab === 'signIn' && (
          <div>
            <TextField
              label="Username or email"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="First Name"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Username or email"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
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
