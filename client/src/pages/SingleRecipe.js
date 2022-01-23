import React from "react";
// import { useEffect } from 'react';
// import { useState } from 'react';

import { useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";

import { ADD_RECIPE } from "../utils/mutations";
import { QUERY_SINGLE_RECIPE } from "../utils/queries";
import { QUERY_MYPROFILE } from "../utils/queries";

import { Image } from "cloudinary-react";

import Auth from "../utils/auth";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SingleRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { recipeId: recipeId },
  });
  const recipe = data?.recipe || {};

  // THIS SHOULD, ON PAPER ADD THE CURRENT OBJECT WHICH IS THE 'recipe'
  // FROM ABOVE AND ADD TO THE USER THAT IS CURRENTLY LOGGED. THAT'S WHAT THE
  // BELOW CODE SHOULD DO

  const [addRecipe] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
      cache.writeQuery({
        query: QUERY_MYPROFILE,
        data: {
          myprofile: {
            ...myprofile,
            recipes: [...myprofile.recipes, addRecipe],
          },
        },
      });
    },
  });

  const handleAddto = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRecipe({
        variables: {
          ...recipe,
        },
      });

      console.log(data);
    } catch (err) {
      console.log("it didnt work");
      console.error(err);
    }
  };

  const theme = createTheme();

  theme.typography.title = {
    [theme.breakpoints.up("xs")]: {
      fontSize: "2.25em",
      fontFamily: "Arvo",
    },
    [theme.breakpoints.up("1800")]: {
      fontSize: "3em",
    },
  };

  theme.typography.des = {
    [theme.breakpoints.up("xs")]: {
      fontFamily: "Quicksand",
      fontSize: "1.18em",
    },
    [theme.breakpoints.up("1800")]: { fontSize: "1.45em" },
  };

  theme.typography.info = {
    [theme.breakpoints.up("xs")]: { fontFamily: "Dongle", fontSize: "1.15em" },
    [theme.breakpoints.up("1800")]: { fontSize: "2.15em" },
  };

  theme.typography.header = {
    [theme.breakpoints.up("xs")]: { fontFamily: "Arvo", fontSize: "2em" },
    [theme.breakpoints.up("1800")]: { fontSize: "3em" },
  };

  theme.typography.info1 = {
    [theme.breakpoints.up("xs")]: { fontFamily: "Quicksand" },
    [theme.breakpoints.up("1800")]: { fontSize: "1.15em" },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid sx={{ display: "flex" }}>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642637916/wp4696913_ir8uuv.jpg"
        />
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={6}>
          <Paper
            square
            elevation={3}
            sx={{ mt: 4, mb: 2, p: 3.5, background: "#DDF5FF" }}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <ThemeProvider theme={theme}>
                <Typography variant="title"> {recipe.title}</Typography>
              </ThemeProvider>
            </Grid>
            <Grid item sx={{ mt: 3, mb: 3 }}>
              <ThemeProvider theme={theme}>
                <Typography variant="des">
                  Description: {recipe.description}
                </Typography>
              </ThemeProvider>
            </Grid>
            <hr />
            <Grid item sx={{ mt: 1, mb: 1 }}>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  mt: 0.5,
                  mb: 0.5,
                }}
              >
                <ThemeProvider theme={theme}>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">PREP TIME:</Typography>
                    <Typography variant="info">
                      {recipe.prepTime} mins
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">COOK TIME: </Typography>
                    <Typography variant="info">
                      {recipe.cookTime} mins
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">TOTAL TIME: </Typography>
                    <Typography variant="info">
                      {recipe.totalTime} mins
                    </Typography>
                  </Grid>
                </ThemeProvider>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  mt: 0.5,
                  mb: 0.5,
                }}
              >
                <ThemeProvider theme={theme}>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">CATEGORY: </Typography>
                    <Typography variant="info">{recipe.category}</Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">YIELD: </Typography>
                    <Typography variant="info">{recipe.yield}</Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="info">SERVINGS:</Typography>
                    <Typography variant="info">{recipe.servings}</Typography>
                  </Grid>
                </ThemeProvider>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  mt: 0.5,
                  mb: 0.5,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="info">COURSE:</Typography>
                    <Typography variant="info">{recipe.mealofday}</Typography>
                  </ThemeProvider>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="info">CUISINE:</Typography>
                    <Typography variant="info">{recipe.cuisine}</Typography>
                  </ThemeProvider>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="info">COOKING STYLE:</Typography>
                    <Typography variant="info">{recipe.cookstyle}</Typography>
                  </ThemeProvider>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="info">DIET TYPE:</Typography>
                    <Typography variant="info">{recipe.diettype}</Typography>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Grid>
            <hr />
            <br />
            <br />
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item md={6} sx={{ display: "flex" }}>
                {recipe.imageid ? (
                  <Image
                    width="100%"
                    cloudName="du119g90a"
                    public_id={recipe.imageid}
                  />
                ) : (
                  <Image
                    width="100%"
                    cloudName="du119g90a"
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                )}
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item sx={{ mt: 1, mb: 1 }}>
                <ThemeProvider theme={theme}>
                  <Typography variant="header">Ingredidents:</Typography>
                </ThemeProvider>
              </Grid>
              <hr />
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <ThemeProvider theme={theme}>
                  {recipe.ingredients.map((ingredient) => (
                    <Typography variant="info1" sx={{ mt: 1, mb: 1.5 }}>
                      {ingredient}
                    </Typography>
                  ))}
                </ThemeProvider>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <ThemeProvider theme={theme}>
                <Grid item sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="header">Instructions:</Typography>
                </Grid>
                <hr />
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  {recipe.directions.map((direction) => (
                    <Typography variant="info1" sx={{ mt: 1, mb: 1.5 }}>
                      {direction}
                    </Typography>
                  ))}
                </Grid>
              </ThemeProvider>
            </Grid>
            <br />
            <br />
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <ThemeProvider theme={theme}>
                <Grid item sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="header">Additional Notes:</Typography>
                </Grid>
                <hr />
                <Grid>
                  <Typography variant="info1" sx={{ mt: 1, mb: 1.5 }}>
                    {recipe.notes}
                  </Typography>
                </Grid>
              </ThemeProvider>
            </Grid>
          </Paper>
        </Grid>
      </Box>

      {/* <Box sx={{ display: "flex", justifyContent: "center", m: 1.5 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Grid>
                <Grid sx={{ fontSize: 24 }}>
                  <p>{recipe.title}</p>
                  <p>{recipe.createdAt}</p>
                </Grid>
                <br />
                <hr />
                <br />
                <Grid>
                  <Typography sx={{ fontSize: 20 }}>
                    Category: {recipe.category}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    Servings: {recipe.servings}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    Total Cook Time: {recipe.totalTime} mins
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    Cuisine: {recipe.cuisine}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    Diet: {recipe.diettype}
                  </Typography>
                </Grid>
                <br />
              </Grid>
              <Grid md={5.5}>
                {recipe.imageid ? (
                  <Image
                    width="100%"
                    cloudName="du119g90a"
                    public_id={recipe.imageid}
                  />
                ) : (
                  <Image
                    width="100%"
                    cloudName="du119g90a"
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                )}
              </Grid>
            </Grid>
            <br />
            <hr />
            <br />
            <Grid>
              <Grid>
                Ingredients
                {recipe.ingredients.map((ingredient) => (
                  <Typography sx={{ fontSize: 20, pt: 0.7, pb: 0.7 }}>
                    {ingredient}
                  </Typography>
                ))}
              </Grid>
              <br />
              <hr />
              <br />
              <Grid>
                Instructions
                {recipe.directions.map((direction) => (
                  <Typography sx={{ fontSize: 20, pt: 0.7, pb: 0.7 }}>
                    {direction}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <br />
            <hr />
            <br />
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              {Auth.loggedIn() ? (
                <>
                  <Box>
                    <Button
                      onClick={handleAddto}
                      variant="contained"
                      color="error"
                    >
                      <Typography sx={{ color: "white", fontSize: 20 }}>
                        Add to Cookbook
                      </Typography>
                    </Button>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default SingleRecipe;
