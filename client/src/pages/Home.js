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
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
// import CardActions from '@mui/material/CardActions';

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
  // console.log("new");
  console.log(uniqueRecipes);

  // THESE ARRAYS SHOULD HOLD RECIPES BASED ON THE CATEGORY
  // THINK OF IT LIKE AN FILTERING
  const drinks = [];
  const drinknum = 3;
  const appetizers = [];
  const appnum = 3;
  const entrees = [];
  const entreesnum = 3;
  const desserts = [];
  const desnum = 3;
  for (let a = 0; a < uniqueRecipes.length; a++) {
    if (uniqueRecipes[a].category === "Drinks" && drinks.length < drinknum) {
      drinks.push(uniqueRecipes[a]);
    }
    if (
      uniqueRecipes[a].category === "Appetizer" &&
      appetizers.length < appnum
    ) {
      appetizers.push(uniqueRecipes[a]);
    }
    if (uniqueRecipes[a].category === "Entree" && entrees.length < entreesnum) {
      entrees.push(uniqueRecipes[a]);
    }
    if (uniqueRecipes[a].category === "Dessert" && desserts.length < desnum) {
      desserts.push(uniqueRecipes[a]);
    }
  }

  if (loading) {
    return <Box>Grabbing Recipes...</Box>;
  }

  return (
    <Box sx={{ background: "#5B7B7A" }}>
      {/* <Grid>
        <Typography sx={{ fontSize: 35, fontWeight: 'bold', position: 'absolute', background: '#cbf7ed', p: 3, color: 'primary.dark', border:1, borderRadius: 10 }}>Welcome to mmm!Book!!</Typography>
        <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/c_scale,h_720,w_1270/v1637261149/headerimage0_djjzmj.jpg"/>
      </Grid> */}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {drinks.map((drink) => (
            <Grid item md={2.75}>
              <Card elevation={4} sx={{ m: 2 }}>
                <Link to={`/recipes/${drink._id}`}>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
                    <Grid sx={{ m: 1 }}>
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 20,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        sx={{ height: 75, p: 1.5 }}
                        title={drink.title}
                        subheader={drink.createdAt}
                      />
                      <CardContent>
                        <Typography sx={{ fontSize: 12 }}>
                          Category: {drink.category}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Cuisine: {drink.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Diet: {drink.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Servings: {drink.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Cook Time: {drink.totalTime} min
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <br />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          md={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {appetizers.map((appetizer) => (
            <Grid item md={2.75}>
              <Card elevation={4} sx={{ m: 2 }}>
                <Link to={`/recipes/${appetizer._id}`}>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia>
                      {appetizer.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={appetizer.imageid}
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
                    <Grid sx={{ m: 1 }}>
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 20,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        sx={{ height: 75, p: 1.5 }}
                        title={appetizer.title}
                        subheader={appetizer.createdAt}
                      />
                      <CardContent>
                        <Typography sx={{ fontSize: 12 }}>
                          Category: {appetizer.category}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Cuisine: {appetizer.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Diet: {appetizer.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Servings: {appetizer.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Cook Time: {appetizer.totalTime} min
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          md={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {entrees.map((entree) => (
            <Grid item md={2.75}>
              <Card elevation={4} sx={{ m: 2 }}>
                <Link to={`/recipes/${entree._id}`}>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia>
                      {entree.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={entree.imageid}
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
                    <Grid sx={{ m: 1 }}>
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 20,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        sx={{ height: 75, p: 1.5 }}
                        title={entree.title}
                        subheader={entree.createdAt}
                      />
                      <CardContent>
                        <Typography sx={{ fontSize: 15 }}>
                          {entree.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Category: {entree.category}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Cuisine: {entree.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Diet: {entree.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Servings: {entree.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Cook Time: {entree.totalTime} min
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <br />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {desserts.map((dessert) => (
            <Grid item md={2.75}>
              <Card elevation={4} sx={{ m: 2 }}>
                <Link to={`/recipes/${dessert._id}`}>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia>
                      {dessert.imageid ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={dessert.imageid}
                        />
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                        />
                      )}
                    </CardMedia>
                    <Grid sx={{ m: 1 }}>
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 20,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        sx={{ height: 75, p: 1.5 }}
                        title={dessert.title}
                        subheader={dessert.createdAt}
                      />
                      <CardContent>
                        <Typography sx={{ fontSize: 12 }}>
                          Category: {dessert.category}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Cuisine: {dessert.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Diet: {dessert.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Servings: {dessert.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Total Cook Time: {dessert.totalTime} min
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
