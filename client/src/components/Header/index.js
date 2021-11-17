import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">

      <div className="header">

        <Link className="" to="/">
          <h1 className="appTitle">MyCookBook</h1>
        </Link>

        <p className="tagline">
          Let's Turn Up the Heat!!
        </p>

        <div className="dashboard">
          <Link className="" to="/recipes">
            Recipes
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/add">
                Add New Recipe
              </Link>
              <Link className="" to="/myprofile">
                My Cookbook
              </Link>
              <Link className="" onClick={logout} to="/">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
      
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/">
          <h1 className="appTitle">mmmBook</h1>
        </Link>
        {Auth.loggedIn() ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Link className="" to="/add">
                  <Typography sx={{ fontSize: 25 }}>Add New Recipe</Typography>
                </Link>
                <Link className="" to="/myprofile">
                  <Typography sx={{ fontSize: 25 }}>My Cookbook</Typography>
                </Link>
                <Link className="" onClick={logout} to="/">
                 <Typography sx={{ fontSize: 25 }}>Log out</Typography>
                </Link>
              </Box>
            </>
          ) : (
            <>
              <ButtonGroup>
                <Link className="" to="/login">
                  <Typography sx={{ fontSize: 25 }}>Log In</Typography>
                  </Link>
                  <Link className="" to="/signup">
                    <Typography sx={{ fontSize: 25 }}>Sign Up </Typography>
                </Link>
              </ButtonGroup>
            </>
          )}
      </Box>
    </header>
  );
};

export default Header;
