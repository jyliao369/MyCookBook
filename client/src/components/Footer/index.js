import React from "react";

// THESE ARE ALL MUI COMPONENTS
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const theme = createTheme({});

  theme.typography.subtitle1 = {
    [theme.breakpoints.up("xs")]: {
      fontSize: "1em",
      fontFamily: "Quicksand",
    },
    [theme.breakpoints.up("1800")]: {
      fontSize: "1.25em",
    },
  };

  return (
    <Box sx={{ background: "#000060" }}>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
          pb: 3.5,
        }}
      >
        <Grid item sx={{ display: "flex", flexDirection: "row", m: 2 }}>
          <LinkedInIcon
            sx={{
              fontSize: "2.5em",
              m: 1,
              p: 0.5,
              borderRadius: 7,
              background: "#D6F3FF",
            }}
          />
          <GitHubIcon
            sx={{
              fontSize: "2.5em",
              m: 1,
              p: 0.5,
              borderRadius: 7,
              background: "#D6F3FF",
            }}
          />
          <FacebookIcon
            sx={{
              fontSize: "2.5em",
              m: 1,
              p: 0.5,
              borderRadius: 7,
              background: "#D6F3FF",
            }}
          />
          <TwitterIcon
            sx={{
              fontSize: "2.5em",
              m: 1,
              p: 0.5,
              borderRadius: 7,
              background: "#D6F3FF",
            }}
          />
          <InstagramIcon
            sx={{
              fontSize: "2.5em",
              m: 1,
              p: 0.5,
              borderRadius: 7,
              background: "#D6F3FF",
            }}
          />
        </Grid>

        <ThemeProvider theme={theme}>
          <Grid item sx={{ display: "flex", flexDirection: "row", m: 2 }}>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <PhoneIcon
                color="black"
                sx={{
                  mr: 1,
                  fontSize: "2em",
                  background: "#D6F3FF",
                  p: 0.5,
                  borderRadius: 10,
                }}
              />
              <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
                (336-425-9579)
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                m: 1,
              }}
            >
              <EmailIcon
                sx={{
                  mr: 1,
                  fontSize: "2em",
                  background: "#D6F3FF",
                  p: 0.5,
                  borderRadius: 10,
                }}
              />
              <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
                jyliao369@gmail.com
              </Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ display: "flex", flexDirection: "row", m: 1 }}>
            <Grid item sx={{ m: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
                About
              </Typography>
            </Grid>
            <Grid item sx={{ m: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
                Privacy Notice
              </Typography>
            </Grid>
            <Grid item sx={{ m: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
                Terms of Use
              </Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ m: 1 }}>
            <Typography variant="subtitle1" sx={{ color: "#D6F3FF" }}>
              © 2022 mmm!Book, All Rights Reserved
            </Typography>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Box>
  );
};

export default Footer;
