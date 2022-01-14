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

  const truncate = (str) => {
    return str ? str.substring(0, 90) + "..." : str;
  };

  if (loading) {
    return <Box>Grabbing Recipes...</Box>;
  }

  return (
    <Box sx={{}}>
      <Grid sx={{ mb: 4.5 }}>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642125456/headerimage0_djjzmj.jpg"
        />
      </Grid>

      <Box sx={{ display: "flex" }}>
        <Grid
          item
          md={8.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid item md={3.5} sx={{ ml: 1.5, mr: 1.5, mb: 2.5 }}>
            <Card elevation={5}>
              <Link>
                <Grid item>
                  <CardMedia>
                    {recipes[1].imageid ? (
                      <Image
                        width="100%"
                        cloudName="du119g90a"
                        public_id={recipes[1].imageid}
                        sx={{ display: "flex" }}
                      >
                        <Transformation
                          width="1000"
                          height="1000"
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
                </Grid>

                <Grid item sx={{ height: 100 }}>
                  <CardHeader
                    titleTypographyProps={{
                      fontSize: 20,
                    }}
                    subheaderTypographyProps={{
                      fontSize: 15,
                    }}
                    sx={{ height: 75, p: 1.5 }}
                    title={recipes[1].title}
                    subheader={recipes[1].createdAt}
                  />
                </Grid>
              </Link>
            </Card>
          </Grid>

          <Grid item md={2.75} sx={{ ml: 1.5, mr: 1.5 }}>
            <Card elevation={5}>
              <Link>
                <Grid>
                  <CardMedia>
                    {recipes[2].imageid ? (
                      <Image
                        width="100%"
                        cloudName="du119g90a"
                        public_id={recipes[2].imageid}
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
                      title={recipes[2].title}
                      subheader={recipes[2].createdAt}
                    />
                    <CardContent sx={{ height: 52 }}>
                      <Typography sx={{ fontSize: 12 }}>
                        {truncate(recipes[2].description)}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Link>
            </Card>
          </Grid>

          <Grid item md={2.75} sx={{ ml: 1.5, mr: 1.5 }}>
            <Card elevation={5}>
              <Link>
                <Grid>
                  <CardMedia>
                    {recipes[2].imageid ? (
                      <Image
                        width="100%"
                        cloudName="du119g90a"
                        public_id={recipes[2].imageid}
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
                      title={recipes[2].title}
                      subheader={recipes[2].createdAt}
                    />
                    <CardContent sx={{ height: 52 }}>
                      <Typography sx={{ fontSize: 12 }}>
                        {truncate(recipes[2].description)}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Grid
          item
          md={8.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {drinks.map((drink) => (
            <Grid item md={3} sx={{ ml: 1.5, mr: 1.5 }}>
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
      </Box>

      <br />

      <Box sx={{ display: "flex" }}>
        <Grid
          item
          md={8.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {appetizers.map((appetizer) => (
            <Grid item md={3} sx={{ ml: 1.5, mr: 1.5 }}>
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
      </Box>

      <br />

      <Box sx={{ display: "flex" }}>
        <Grid
          item
          md={8.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {entrees.map((entree) => (
            <Grid item md={3} sx={{ ml: 1.5, mr: 1.5 }}>
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
      </Box>

      <br />

      <Box sx={{ display: "flex" }}>
        <Grid
          item
          md={8.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {desserts.map((dessert) => (
            <Grid item md={3} sx={{ ml: 1.5, mr: 1.5 }}>
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
      </Box>
    </Box>
  );
};

export default Home;
