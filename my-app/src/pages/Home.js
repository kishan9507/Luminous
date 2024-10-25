import React from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home () {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '40vh',
        borderRadius: '5px',
        borderWidth: '3px',
        borderColor: '#333',
        borderStyle: 'solid',
        // background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Colorful gradient background
      }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
        Sign In
      </Typography>
      <TextField
        label="Phone number, username or email"
        variant="outlined"
        type="text"
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/dashboard')}
        style={{
          backgroundColor: '#0ea5e9',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: '#1e40af',
          },
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default Home;
