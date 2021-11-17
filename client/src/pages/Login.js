import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

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
      <div className="loginpage">

        {/* THIS IS THE ORINGAL LOGIN CARD THROUGH CSS */}
        {/* <div className="logincard">
          <h4 className="card-header">Login</h4>
          
          <div className="loginbody">
            { data ? (
              <p>Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="loginform" onSubmit={handleSubmit}>
                <input 
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="********"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="loginbutton" type="submit">
                  Submit
                </button>
              </form>
            )}
            
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div> */}

        {/* THIS IS THE LOGIN FORM BASED ON MUI */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TextField 
            sx={{ m: 1, width: 500 }}
            id="outlined-basic"
            label="Email" 
            variant="outlined"                   
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange} 
          />
          <TextField
            sx={{ m: 1, width: 500 }} 
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />  
          <Button variant="contained" type='submit' onClick={handleSubmit}>Login</Button>
        </Box>
        
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
        
      </div>
    );
};

export default Login;