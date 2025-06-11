import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Paper, Box, Grid, InputAdornment, IconButton, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import ButtonLayout from '../Components/ButtonLayout';
import { validateEmail, validatePassword } from '../Validations/Uservalid';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import axios from 'axios';

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);                     
  const [emailError, setEmailError] = useState('');                
  const [passwordError, setPasswordError] = useState('');         

  const navigate = useNavigate();

  const handleClickShowPassword = () =>  setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const parseData = (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    if(email && password ){
        const user = { email, password };
        axios.post('http://localhost:5007/api/User/login', user)
        .then(res => {
            dispatch(setUser(res.data.user));
            alert(res.data.message);
            navigate('/hotels/user'); 

            if(res.data.user.role === "Admin"){
              navigate('/hotels/admin-dashboard');
            }
        })
        .catch((err) => {
           alert(err.message);
        });
    }
  }

  return (
    <>
      <Grid container component="main" spacing={3}
        sx={{ 
          height: '89vh', 
          backgroundImage: 'url(/images/login.jpg)', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'brightness(0.7)' 
        }}
      >
        
        <Grid item xs={12} sm={6} md={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            color: 'white',
            paddingLeft: 24
          }}
        >
          <Typography variant="h3" fontWeight="bold" mb={7} gutterBottom>
            So,...Let's Start Here
          </Typography>
          <Typography variant="h6" width="400px" fontWeight="bold">
              Let's build something amazing together. Sign in today and start planning your perfect vacation! 🏝️🏖️ 
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={6} component={Box}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper elevation={6} 
            sx={{
              p: 4,
              borderRadius: 4,
              width: '70%',
              minHeight: '60vh',
              maxWidth: 600,
              backgroundColor: 'rgba(245, 240, 240, 0.8)' 
            }}
          >
            <Box component="form" noValidate onSubmit={parseData}>
              <Typography component="h1" variant="h5" fontWeight="bold" textAlign="center" mb={4}>
                Sign In
              </Typography>

              <TextField margin="normal" fullWidth name="email" type="email" placeholder="Email" value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(validateEmail(e.target.value)) }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                required
                error={Boolean(emailError)}
                helperText={emailError}
              />

              <TextField margin="normal" fullWidth name="password" type={showPassword ? 'text' : 'password'} placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(validatePassword(e.target.value)) }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                required
                error={Boolean(passwordError)}
                helperText={passwordError}
              />

              <Box display="flex" justifyContent="center" mt={5} mb={2}>
                <ButtonLayout icon={PersonIcon} name="Sign In" onClick={parseData} />
              </Box>

              <Typography textAlign="center" fontSize="14px">
                Don't have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
