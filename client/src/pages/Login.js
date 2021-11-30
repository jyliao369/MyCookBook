import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Login = (props) => {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        }   catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
      <Box sx={{ background: '#006992', pt: 15, pb: 60 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1.5 }}>
          <Grid item  xs={12} md={3}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3 }} elevation={3}>
              <Grid sx={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}>
                Memeber Login
              </Grid>
              <TextField 
                id="outlined-basic"
                sx={{ m:3 }}
                label="Email" 
                variant="outlined"                   
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange} 
              />
              <TextField
                id="outlined-basic"
                sx={{ m:3 }} 
                label="Password" 
                variant="outlined"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ width: 250, borderRadius: 15 }} variant="contained" type='submit' onClick={handleSubmit}>Login</Button>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </Box>
    );
};

export default Login;