import React from 'react';
import { useAuth } from './auth.jsx';
import { Box, Button, Typography, Avatar, Stack, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function AuthGate({ children }) {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        {user ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <Typography variant="body1">{user.displayName}</Typography>
            <Button variant="outlined" onClick={signOutUser} size="small">Sign Out</Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
            sx={{ textTransform: 'none' }}
          >
            Continue with Google
          </Button>
        )}
      </Box>
      {children}
    </Box>
  );
}
