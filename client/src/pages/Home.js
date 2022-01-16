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

    for (let a = 0; a < 14; a++) {
      if (a === 13) {
        description = description + array[a] + "...";
      } else {
        description = description + array[a] + " ";
      }
    }

    return description;
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
                    <Grid>
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
                          {truncate(drink.description)}
                        </Typography>
                      </CardContent>
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
                    <Grid>
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
                          {truncate(appetizer.description)}
                        </Typography>
                      </CardContent>
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
                    <Grid>
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
                        <Typography sx={{ fontSize: 12 }}>
                          {truncate(entree.description)}
                        </Typography>
                      </CardContent>
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
                    <Grid>
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
                          {truncate(dessert.description)}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
