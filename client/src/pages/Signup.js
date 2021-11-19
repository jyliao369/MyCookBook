import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '', 
    });
    
    const [addUser, { error, data }] = useMutation(ADD_USER);

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
            const { data } = await addUser({
              variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        }   catch (e) {
            console.error(e);
        }
    };

    return (
      <div className="signuppage">

        {/* THIS IS BASED ON MUI CSS */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField 
            sx={{ m: 1, width: 3/4 }}
            id="outlined-basic"
            label="Username" 
            variant="outlined"                   
            name="username"
            type="username"
            value={formState.username}
            onChange={handleChange} 
          />
          <TextField 
            sx={{ m: 1, width: 3/4 }} 
            id="outlined-basic" 
            label="Email" 
            variant="outlined"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}            
          />
          <TextField
            sx={{ m: 1, width: 3/4 }} 
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange} 
          />
          <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        </Box>

      </div>
    );
};

export default Signup;