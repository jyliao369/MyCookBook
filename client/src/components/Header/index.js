import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

// THESE ARE ALL MUI COMPONENTS
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const theme = createTheme({});

  theme.typography.h1 = {
    fontFamily: "Lobster Two",
  };

  theme.typography.sub1 = {
    // THIS IS FROM 0 - 600
    [theme.breakpoints.up("xs")]: {
      fontSize: "1em",
      fontFamily: "Quicksand",
    },
    // THIS IS FROM 900 - 1200
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25em",
    },
    // THIS IS FROM 1200 - UPWARD
    [theme.breakpoints.up("1800")]: {
      fontSize: "1.4em",
    },
  };

  return (
    <header className="">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-end",
          pt: 1,
          pb: 1,
        }}
      >
        <Box>
          <Link to="/">
            <ThemeProvider theme={theme}>
              <Typography variant="h1" sx={{ fontSize: 50, color: "#1565c0" }}>
                mmm!Book
              </Typography>
            </ThemeProvider>
          </Link>
        </Box>
        {Auth.loggedIn() ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                pt: 1,
                pb: 1,
              }}
            >
              <ThemeProvider theme={theme}>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link to="/recipes">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Recipes
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link className="" to="/add">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Add Recipe
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link className="" to="/myprofile">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      My Cookbook
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link className="" onClick={logout} to="/">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Log Out
                    </Typography>
                  </Link>
                </Grid>
              </ThemeProvider>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                pt: 1,
                pb: 1,
              }}
            >
              <ThemeProvider theme={theme}>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link to="/recipes">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Recipes
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link className="" to="/login">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Log In
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ mr: 0.75, ml: 0.75 }}>
                  <Link className="" to="/signup">
                    <Typography variant="sub1" sx={{ color: "#1565c0" }}>
                      Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </ThemeProvider>
            </Box>
          </>
        )}
      </Box>
    </header>
  );
};

export default Header;
