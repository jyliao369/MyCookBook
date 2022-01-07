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
  console.log(recipe.title);

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
    <Box sx={{ background: "#456990", p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1.5 }}>
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
      </Box>
    </Box>
  );
};

export default SingleRecipe;
