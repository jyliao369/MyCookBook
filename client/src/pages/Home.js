import React from "react";
// import { useEffect } from 'react';
// import { useState } from 'react';

import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../utils/queries";

import { Image } from "cloudinary-react";
import { Transformation } from "cloudinary-react";

// THESE ARE FOR THE MUI COMPONENTS
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  // THESE NEXT LINES SHOULD BE ABLE TO GET 10 RANDOMLY GENERATED USER
  // CREATED RECIPES TO DISPLAY ON THE HOMEPAGE
  // THIS WILL RANDOMLY PICK 10 RANDOM RECIPES MADE BY USERS TO SHOW ON THE HOMEPAGE
  // THIS ACTS AS A TEASER OR A SAMPLE
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  // THESE SETS OF CODE SHOULD BE ABLE TO TAKE THE RECIPES SECTION AND
  // CREATE A A NEW RECIPE ARRAY THAT HAS NO DUPLICATES BASED ON THE TITLE
  // THIS CAN RAISE ANOTHER PROBLEM IF TITLES ARE THE SAME BUT ID IS NOT
  const uniqueRecipes = [];
  for (let a = 0; a < recipes.length; a++) {
    let exists = false;
    for (let b = 0; b < uniqueRecipes.length; b++) {
      if (recipes[a].title === uniqueRecipes[b].title) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      uniqueRecipes.push(recipes[a]);
    }
  }
  // console.log("unique");
  // console.log(uniqueRecipes);

  // THESE ARRAYS SHOULD HOLD RECIPES BASED ON THE CATEGORY
  // THINK OF IT LIKE AN FILTERING
  const drinks = [];
  const appetizers = [];
  const entrees = [];
  const desserts = [];

  for (let a = 0; a < uniqueRecipes.length; a++) {
    if (uniqueRecipes[a].category === "Drinks") {
      drinks.push(uniqueRecipes[a]);
    } else if (uniqueRecipes[a].category === "Appetizer") {
      appetizers.push(uniqueRecipes[a]);
    } else if (uniqueRecipes[a].category === "Entree") {
      entrees.push(uniqueRecipes[a]);
    } else if (uniqueRecipes[a].category === "Dessert") {
      desserts.push(uniqueRecipes[a]);
    }
  }

  const drinksOfDay = [];
  const appetizersOfDay = [];
  const entreesOfDay = [];
  const dessertsOfDay = [];

  for (let b = 0; b < 4; b++) {
    let drinkNum = Math.floor(Math.random() * drinks.length);
    let appetizerNum = Math.floor(Math.random() * appetizers.length);
    let entreeNum = Math.floor(Math.random() * entrees.length);
    let dessertNum = Math.floor(Math.random() * desserts.length);

    drinksOfDay.push(drinks[drinkNum]);
    drinks.splice(drinkNum, 1);

    appetizersOfDay.push(appetizers[appetizerNum]);
    appetizers.splice(appetizerNum, 1);

    entreesOfDay.push(entrees[entreeNum]);
    entrees.splice(entreeNum, 1);

    dessertsOfDay.push(desserts[dessertNum]);
    desserts.splice(dessertNum, 1);
  }

  console.log(drinksOfDay);
  console.log(appetizersOfDay);
  console.log(entreesOfDay);
  console.log(dessertsOfDay);

  const truncate = (str) => {
    let array = str.split(" ");
    let description = "";
    let deslength = 14;

    for (let a = 0; a < deslength; a++) {
      if (a === deslength - 1) {
        description = description + array[a] + "...";
      } else {
        description = description + array[a] + " ";
      }
    }

    return description;
  };

  const theme = createTheme();

  theme.typography.h2 = {
    // THIS IS FROM 0 - 600
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.45rem",
    },
    // THIS IS FROM 900 - 1200
    [theme.breakpoints.up("md")]: {
      fontSize: ".5rem",
    },
    // THIS IS FROM 1200 - UPWARD
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.34rem",
    },
  };

  theme.typography.subtitle1 = {
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.15rem",
    },
    // THIS IS FROM 900 - 1200
    [theme.breakpoints.up("md")]: {
      fontSize: ".5rem",
    },
    // THIS IS FROM 1200 - UPWARD
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem",
    },
  };

  if (loading) {
    return <Box>Grabbing Recipes...</Box>;
  }

  return (
    <Box sx={{ background: "#D9ECEC" }}>
      <Grid item sx={{ pb: 6 }}>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642125456/headerimage0_djjzmj.jpg"
        />
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "column", pb: 6 }}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            sx={{
              display: "flex",
              background: "black",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                fontSize: 40,
                background: "white",
                p: 2,
              }}
            >
              Coolest Drinks
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {drinksOfDay.map((drink) => (
            <Grid item md={2.25} sx={{ m: 2 }}>
              <Card elevation={5}>
                <Link to={`/recipes/${drink._id}`}>
                  <Grid>
                    <CardMedia>
                      {drink.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={drink.imageid}
                          sx={{ display: "flex" }}
                        >
                          <Transformation
                            width="750"
                            height="750"
                            gravity="center"
                            crop="crop"
                          />
                        </Image>
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                        />
                      )}
                    </CardMedia>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "10.5rem",
                      }}
                    >
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="h2">{drink.title}</Typography>
                        </ThemeProvider>
                      </Grid>
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="subtitle1">
                            {truncate(drink.description)}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "column", pb: 6 }}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            sx={{
              display: "flex",
              background: "black",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                fontSize: 40,
                background: "white",
                p: 2,
              }}
            >
              Tasty Appetizers
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {appetizersOfDay.map((appetizer) => (
            <Grid item md={2.25} sx={{ m: 2 }}>
              <Card elevation={5}>
                <Link to={`/recipes/${appetizer._id}`}>
                  <Grid>
                    <CardMedia>
                      {appetizer.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={appetizer.imageid}
                          sx={{ display: "flex" }}
                        >
                          <Transformation
                            width="750"
                            height="750"
                            gravity="center"
                            crop="crop"
                          />
                        </Image>
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                        />
                      )}
                    </CardMedia>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "10.5rem",
                      }}
                    >
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="h2">
                            {appetizer.title}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="subtitle1">
                            {truncate(appetizer.description)}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "column", pb: 6 }}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            sx={{
              display: "flex",
              background: "black",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                fontSize: 40,
                background: "white",
                p: 2,
              }}
            >
              Savory Entrees
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {entreesOfDay.map((entree) => (
            <Grid item md={2.25} sx={{ m: 2 }}>
              <Card elevation={5}>
                <Link to={`/recipes/${entree._id}`}>
                  <Grid>
                    <CardMedia>
                      {entree.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={entree.imageid}
                          sx={{ display: "flex" }}
                        >
                          <Transformation
                            width="750"
                            height="750"
                            gravity="center"
                            crop="crop"
                          />
                        </Image>
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                        />
                      )}
                    </CardMedia>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "10.5rem",
                      }}
                    >
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="h2">{entree.title}</Typography>
                        </ThemeProvider>
                      </Grid>
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="subtitle1">
                            {truncate(entree.description)}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "column", pb: 6 }}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            sx={{
              display: "flex",
              background: "black",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                fontSize: 40,
                background: "white",
                p: 2,
              }}
            >
              Delicious Desserts
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {dessertsOfDay.map((dessert) => (
            <Grid item md={2.25} sx={{ m: 2 }}>
              <Card elevation={5}>
                <Link to={`/recipes/${dessert._id}`}>
                  <Grid>
                    <CardMedia>
                      {dessert.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={dessert.imageid}
                          sx={{ display: "flex" }}
                        >
                          <Transformation
                            width="750"
                            height="750"
                            gravity="center"
                            crop="crop"
                          />
                        </Image>
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                          sx={{ display: "flex" }}
                        >
                          <Transformation
                            width="750"
                            height="750"
                            gravity="center"
                            crop="crop"
                          />
                        </Image>
                      )}
                    </CardMedia>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "10.5rem",
                      }}
                    >
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="h2">{dessert.title}</Typography>
                        </ThemeProvider>
                      </Grid>
                      <Grid item sx={{ m: 1.5 }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="subtitle1">
                            {truncate(dessert.description)}
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
    </Box>
  );
};

export default Home;
