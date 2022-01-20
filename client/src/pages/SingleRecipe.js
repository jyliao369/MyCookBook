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

const SingleRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { recipeId: recipeId },
  });
  const recipe = data?.recipe || {};

  console.log(recipe);

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
              <Typography sx={{ fontSize: 25, pr: 1.5, pl: 1.5 }}>
                {recipe.title}
              </Typography>
            </Grid>
            <Grid>
              <Typography sx={{ fontSize: 20, pb: 3, pt: 2 }}>
                Description: {recipe.description}
              </Typography>
            </Grid>
            <hr />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                pt: 2,
                pb: 2,
              }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>PREP TIME:</Typography>
                <Typography>{recipe.prepTime} mins</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>COOK TIME: </Typography>
                <Typography>{recipe.cookTime} mins</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>TOTAL TIME: </Typography>
                <Typography>{recipe.totalTime}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                pt: 2,
                pb: 2,
              }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>CATEGORY: </Typography>
                <Typography>{recipe.category}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>YIELD: </Typography>
                <Typography>{recipe.yield}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>SERVINGS:</Typography>
                <Typography>{recipe.servings}</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                pt: 2,
                pb: 2,
              }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>COURSE:</Typography>
                <Typography>{recipe.mealofday}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>CUISINE:</Typography>
                <Typography>{recipe.cuisine}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>COOKING STYLE: </Typography>
                <Typography>{recipe.cookstyle}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 15 }}>DIET TYPE: </Typography>
                <Typography>{recipe.diettype}</Typography>
              </Grid>
            </Grid>
            <hr />
            <br />
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
            <br />
            <Grid
              item
              sx={{ display: "flex", flexDirection: "column", pt: 4.5 }}
            >
              <Grid>
                <Typography sx={{ fontSize: 40 }}>Ingredidents:</Typography>
              </Grid>
              <hr />
              <Grid>
                {recipe.ingredients.map((ingredient) => (
                  <Typography sx={{ fontSize: 20, pt: 1, pb: 1.5 }}>
                    {ingredient}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Grid>
                <Typography sx={{ fontSize: 40 }}>Instructions:</Typography>
              </Grid>
              <hr />
              <Grid>
                {recipe.directions.map((direction) => (
                  <Typography sx={{ fontSize: 20, pt: 1, pb: 1.5 }}>
                    {direction}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Grid>
                <Typography sx={{ fontSize: 40 }}>Additional Notes:</Typography>
              </Grid>
              <hr />
              <Grid>
                <Typography sx={{ fontSize: 20, pt: 1, pb: 1 }}>
                  {recipe.notes}
                </Typography>
              </Grid>
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
