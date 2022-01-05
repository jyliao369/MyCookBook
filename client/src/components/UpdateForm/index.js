import React from "react";
import { useState } from "react";
// import { useEffect } from "react";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// IMPORTS FOR CLOUDINARY
// import { Image } from "cloudinary-react";
// import Axios from "axios";

const UpdateForm = (props) => {
  let ingredientList = [""];
  if (props.recipe?.ingredients) {
    for (let a = 0; a < props.recipe.ingredients.length; a++) {
      if (a < props.recipe.ingredients.length - 1) {
        ingredientList += props.recipe.ingredients[a] + "\r\n";
      } else if (a === props.recipe.ingredients.length - 1) {
        ingredientList += props.recipe.ingredients[a];
      }
    }
  }

  let directionList = [""];
  if (props.recipe?.directions) {
    for (let a = 0; a < props.recipe.directions.length; a++) {
      if (a < props.recipe.directions.length - 1) {
        directionList += props.recipe.directions[a] + "\r\n";
      } else if (a === props.recipe.directions.length - 1) {
        directionList += props.recipe.directions[a];
      }
    }
  }

  const [updatedRecipe, setupdatedRecipe] = useState({
    title: props.recipe.title,
    cuisine: props.recipe.cuisine,
    diettype: props.recipe.diettype,
    category: props.recipe.category,
    servings: props.recipe.servings,
    prepTime: props.recipe.prepTime,
    cookTime: props.recipe.cookTime,
    totalTime: props.recipe.totalTime,
    ingredients: props.recipe.ingredients,
    directions: props.recipe.directions,
    imageid: props.recipe.imageid,
    publicRecipe: props.recipe.publicRecipe,
  });

  console.log("updatedRecipe");
  console.log(updatedRecipe);

  const handleUpdate = (event) => {
    setupdatedRecipe({
      ...updatedRecipe,
      [event.target.name]: event.target.value,
    });

    const { name, value } = event.target;
    if (name === "ingredients") {
      let ingredientsarray = [];
      let ingredients = value.split("\n");
      for (let a = 0; a < ingredients.length; a++) {
        ingredientsarray.push(ingredients[a]);
        setupdatedRecipe((prevState) => ({
          ...prevState,
          ingredients: ingredientsarray,
        }));
      }
    }

    if (name === "directions") {
      let directionssarray = [];
      let directions = value.split("\n");
      for (let b = 0; b < directions.length; b++) {
        directionssarray.push(directions[b]);
        setupdatedRecipe((prevState) => ({
          ...prevState,
          directions: directionssarray,
        }));
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1.5 }}>
        <Grid item xs={12} md={10}>
          <Paper
            square
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
            elevation={5}
          >
            <Grid item sx={{ display: "flex" }}>
              <Grid
                item
                md={5.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: 2,
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: 440,
                    p: 3,
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Grid
                      item
                      md={6.5}
                      sx={{ display: "flex", justifyContent: "center", p: 1.5 }}
                    >
                      {/* {updatedImage ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={updatedImage}
                        />
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1641313202/addimage_uet12f.png"
                        />
                      )} */}
                    </Grid>
                    <Grid item sx={{ display: "flex" }}>
                      {/* <input
                        title=" "
                        type="file"
                        onChange={(event) => {
                          uploadUpImage(event.target.files[0]);
                          setupdatedImage(event.target.files[0]);
                        }}
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextField
                      select
                      label="Category"
                      sx={{ width: 250, m: 2 }}
                      name="category"
                      onChange={handleUpdate}
                      placeholder="Category"
                      defaultValue={props.recipe.category}
                    >
                      <MenuItem value="Drinks">Drinks</MenuItem>
                      <MenuItem value="Appetizer">Appetizer</MenuItem>
                      <MenuItem value="Entree">Entree</MenuItem>
                      <MenuItem value="Dessert">Dessert</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Cuisine"
                      sx={{ width: 250, m: 2 }}
                      name="cuisine"
                      onChange={handleUpdate}
                      placeholder="Cuisine"
                      defaultValue={props.recipe.cuisine}
                    >
                      <MenuItem value="Homemade">Homemade</MenuItem>
                      <MenuItem value="American">American</MenuItem>
                      <MenuItem value="Chinese">Chinese</MenuItem>
                      <MenuItem value="Mexican">Mexican</MenuItem>
                      <MenuItem value="Thai">Thai</MenuItem>
                      <MenuItem value="Indian">Indian</MenuItem>
                      <MenuItem value="Cajun">Cajun</MenuItem>
                      <MenuItem value="Korean">Korean</MenuItem>
                      <MenuItem value="Japanese">Japanese</MenuItem>
                      <MenuItem value="Cuban">Cuban</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Diet Type"
                      sx={{ width: 250, m: 2 }}
                      name="diettype"
                      onChange={handleUpdate}
                      placeholder="Diet Type"
                      defaultValue={props.recipe.diettype}
                    >
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Low Carb">Low Carb</MenuItem>
                      <MenuItem value="Keto">Keto</MenuItem>
                      <MenuItem value="Vegan">Vegan</MenuItem>
                      <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    </TextField>
                  </Grid>
                  <br />
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextField
                      label="Prep Time (mins)"
                      sx={{ m: 2 }}
                      name="prepTime"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.prepTime}
                    />
                    <TextField
                      label="Cook Time (mins)"
                      sx={{ m: 2 }}
                      name="cookTime"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.cookTime}
                    />
                    <TextField
                      label="Servings"
                      sx={{ m: 2 }}
                      name="servings"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.servings}
                    />
                    <TextField
                      label="Recipe Yield"
                      sx={{ m: 2 }}
                      name="servings"
                      onChange={handleUpdate}
                      //   defaultValue={props.recipe}
                    />
                  </Grid>
                  <br />
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      select
                      md={12}
                      label="Public Recipe"
                      sx={{ width: 500, m: 2 }}
                      name="publicRecipe"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.publicRecipe}
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </TextField>
                    <Grid>
                      Note: This option allows your recipes to be displayed for
                      other users to view. You can choose to make your recipe
                      public for others to see or keep it private for yourself.
                    </Grid>
                  </Grid>
                  <br />
                </Grid>
              </Grid>

              <Grid
                item
                md={6.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <TextField
                  label="Recipe Name"
                  sx={{ m: 2 }}
                  name="title"
                  onChange={handleUpdate}
                  placeholder="Recipe Name"
                  defaultValue={props.recipe.title}
                />
                <TextField
                  label="Description"
                  sx={{ m: 2 }}
                  multiline
                  rows={8}
                  name="description"
                  onChange={handleUpdate}
                  defaultValue={props.recipe.description}
                />
                <TextField
                  label="Ingredients"
                  sx={{ m: 2 }}
                  multiline
                  rows={8}
                  name="ingredients"
                  onChange={handleUpdate}
                  defaultValue={ingredientList}
                />
                <TextField
                  label="Directions"
                  sx={{ m: 2 }}
                  multiline
                  rows={8}
                  name="directions"
                  onChange={handleUpdate}
                  defaultValue={directionList}
                />
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid>
                {/* <button onClick={handleSubmit} type="submit">
                  Add Recipe
                </button> */}
                <button>Update Recipe</button>
                <button>Cancel</button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateForm;
