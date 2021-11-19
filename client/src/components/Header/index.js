import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

// THESE ARE ALL MUI COMPONENTS
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">
      <Box sx={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'flex-end', pt: 1, pb: 1}}>
        <Box>
          <Link to="/">
            <Typography sx={{ fontSize: 35, fontWeight: 'bold', color: 'primary.dark' }}>mmmBook</Typography>
          </Link>
        </Box>
        {Auth.loggedIn() ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 1, pb: 1 }}>
                <Link to="/recipes">
                  <Typography sx={{ fontSize: 17, mr: .7, ml: .7, color: 'primary.dark', fontWeight: 'bold' }}>Recipes</Typography>
                </Link>
                <Link className="" to="/add">
                  <Typography sx={{ fontSize: 17, mr: .7, ml: .7, color: 'primary.dark', fontWeight: 'bold' }}>Add Recipe</Typography>
                </Link>
                <Link className="" to="/myprofile">
                  <Typography sx={{ fontSize: 17, mr: .7, ml: .7, color: 'primary.dark', fontWeight: 'bold' }}>My Cookbook</Typography>
                </Link>
                <Link className="" onClick={logout} to="/">
                 <Typography sx={{ fontSize: 17, mr: .7, ml: .7, color: 'primary.dark', fontWeight: 'bold' }}>Log Out</Typography>
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 1, pb: 1 }}>
                <Link to="/recipes">
                  <Typography sx={{ fontSize: 17, mr: .7, ml: .7 }}>Recipes</Typography>
                </Link>
                <Link className="" to="/login">
                  <Typography sx={{ fontSize: 17, mr: .7, ml: .7 }}>Log In</Typography>
                </Link>
                <Link className="" to="/signup">
                    <Typography sx={{ fontSize: 17, mr: .7, ml: .7 }}>Sign Up </Typography>
                </Link>
              </Box>
            </>
          )}
      </Box>
    </header>
  );
};

export default Header;
