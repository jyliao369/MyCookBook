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

      {/* <div className="header">

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
      </div> */}
      
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, pb: 1}}>
        <Box sx={{ pl: 5 }}>
          <Link to="/">
            <Typography sx={{ fontSize: 35 }}>mmmBook</Typography>
          </Link>
        </Box>
        {Auth.loggedIn() ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', pr: 5 }}>
                <Link to="/recipes">
                  <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Recipes</Typography>
                </Link>
                <Link className="" to="/add">
                  <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Add New Recipe</Typography>
                </Link>
                <Link className="" to="/myprofile">
                  <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>My Cookbook</Typography>
                </Link>
                <Link className="" onClick={logout} to="/">
                 <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Log out</Typography>
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', pr: 5 }}>
                <Link to="/recipes">
                  <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Recipes</Typography>
                </Link>
                <Link className="" to="/login">
                  <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Log In</Typography>
                </Link>
                <Link className="" to="/signup">
                    <Typography sx={{ fontSize: 15, pl: 1.5, pr: 1.5 }}>Sign Up </Typography>
                </Link>
              </Box>
            </>
          )}
      </Box>
    </header>
  );
};

export default Header;
