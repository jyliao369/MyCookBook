import React from "react";
import { useState } from "react";
// import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { UPDATE_RECIPE } from "../../utils/mutations";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// IMPORTS FOR CLOUDINARY
import { Image } from "cloudinary-react";
import Axios from "axios";

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
    category: props.recipe.category,
    mealofday: props.recipe.mealofday,
    cuisine: props.recipe.cuisine,
    diettype: props.recipe.diettype,
    cookstyle: props.recipe.cookstyle,
    servings: props.recipe.servings,
    yield: props.recipe.yield,
    prepTime: props.recipe.prepTime,
    cookTime: props.recipe.cookTime,
    totalTime: props.recipe.totalTime,
    description: props.recipe.description,
    notes: props.recipe.description,
    ingredients: props.recipe.ingredients,
    directions: props.recipe.directions,
    imageid: props.recipe.imageid,
    publicRecipe: props.recipe.publicRecipe,
  });

  console.log("updatedRecipe");
  console.log(updatedRecipe);

  const [imageUpdate, setImageUpdate] = useState("");

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yun8815z");

    Axios.post(
      "https://api.cloudinary.com/v1_1/du119g90a/image/upload",
      formData
    ).then((response) => {
      console.log("response");
      console.log(response);
      console.log("public ID");
      console.log(response.data.public_id);

      setupdatedRecipe((prevState) => ({
        ...prevState,
        imageid: response.data.public_id,
      }));
    });
  };

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

  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let recipeId = props.recipe._id;
    try {
      await updateRecipe({
        variables: {
          recipeId,
          ...updatedRecipe,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <br />
      <br />
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
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
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
                      md={7}
                      sx={{ display: "flex", justifyContent: "center", p: 2 }}
                    >
                      {imageUpdate ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={updatedRecipe.imageid}
                        />
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={props.recipe.imageid}
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      sx={{ display: "flex", justifyContent: "center", p: 2 }}
                    >
                      <input
                        title=" "
                        type="file"
                        onChange={(event) => {
                          uploadImage(event.target.files[0]);
                          setImageUpdate(event.target.files[0]);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextField
                      select
                      label="Category"
                      sx={{ width: 250, m: 1 }}
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
                      label="Meal of the Day"
                      sx={{ width: 250, m: 1 }}
                      name="mealofday"
                      onChange={handleUpdate}
                      placeholder="Meal of the Day"
                      defaultValue={props.recipe.mealofday}
                    >
                      <MenuItem value="Breakfast">Breakfast</MenuItem>
                      <MenuItem value="Brunch">Brunch</MenuItem>
                      <MenuItem value="Lunch">Lunch</MenuItem>
                      <MenuItem value="Dinner">Dinner</MenuItem>
                      <MenuItem value="Snack">Snack</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Diet Type"
                      sx={{ width: 250, m: 1 }}
                      name="diettype"
                      onChange={handleUpdate}
                      placeholder="Diet Type"
                      defaultValue={props.recipe.diettype}
                    >
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Keto Friendly">Keto Friendly</MenuItem>
                      <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
                      <MenuItem value="Low Carb">Low Carb</MenuItem>
                      <MenuItem value="Low Calorie">Low Calorie</MenuItem>
                      <MenuItem value="Low Cholesterol">
                        Low Cholesterol
                      </MenuItem>
                      <MenuItem value="Low Sodium">Low Sodium</MenuItem>
                      <MenuItem value="Low Fat">Low Fat</MenuItem>
                      <MenuItem value="Vegan">Vegan</MenuItem>
                      <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Cuisine"
                      sx={{ width: 250, m: 1 }}
                      name="cuisine"
                      onChange={handleUpdate}
                      placeholder="Cuisine"
                      defaultValue={props.recipe.cuisine}
                    >
                      <MenuItem value="Homemade">Homemade</MenuItem>
                      <MenuItem value="Chinese">Chinese</MenuItem>
                      <MenuItem value="American">American</MenuItem>
                      <MenuItem value="German">German</MenuItem>
                      <MenuItem value="Indian">Indian</MenuItem>
                      <MenuItem value="Japanese">Japanese</MenuItem>
                      <MenuItem value="Russian">Russian</MenuItem>
                      <MenuItem value="Thai">Thai</MenuItem>
                      <MenuItem value="Filipino">Filipino</MenuItem>
                      <MenuItem value="Greek">Greek</MenuItem>
                      <MenuItem value="Italian">Italian</MenuItem>
                      <MenuItem value="Mexican">Mexican</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="Korean">Korean</MenuItem>
                      <MenuItem value="Cajun">Cajun</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Cooking Style"
                      sx={{ width: 250, m: 1 }}
                      name="cookstyle"
                      onChange={handleUpdate}
                      placeholder="Cooking Style"
                      defaultValue={props.recipe.cookstyle}
                    >
                      <MenuItem value="Baking">Baking</MenuItem>
                      <MenuItem value="Frying">Frying</MenuItem>
                      <MenuItem value="Roasting">Roasting</MenuItem>
                      <MenuItem value="Stir-Fry">Stir-Fry</MenuItem>
                      <MenuItem value="Grilling">Grilling</MenuItem>
                      <MenuItem value="Steaming">Steaming</MenuItem>
                      <MenuItem value="Boiling">Boiling</MenuItem>
                    </TextField>
                  </Grid>
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
                      sx={{ width: 250, m: 1 }}
                      name="prepTime"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.prepTime}
                    />
                    <TextField
                      label="Cook Time (mins)"
                      sx={{ width: 250, m: 1 }}
                      name="cookTime"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.cookTime}
                    />
                    <TextField
                      label="Servings"
                      sx={{ width: 250, m: 1 }}
                      name="servings"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.servings}
                    />
                    <TextField
                      label="Recipe Yield"
                      sx={{ width: 250, m: 1 }}
                      name="yield"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.yield}
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
                      sx={{ width: 500, m: 1 }}
                      name="publicRecipe"
                      onChange={handleUpdate}
                      defaultValue={props.recipe.publicRecipe}
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </TextField>
                    <Grid>
                      This recipe is set as "{props.recipe.publicRecipe}" right
                      now.
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
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <TextField
                  label="Recipe Name"
                  sx={{ m: 1 }}
                  name="title"
                  onChange={handleUpdate}
                  placeholder="Recipe Name"
                  defaultValue={props.recipe.title}
                />
                <TextField
                  label="Description"
                  sx={{ m: 1 }}
                  multiline
                  rows={7}
                  name="description"
                  onChange={handleUpdate}
                  defaultValue={props.recipe.description}
                />
                <TextField
                  label="Ingredients"
                  sx={{ m: 1 }}
                  multiline
                  rows={7}
                  name="ingredients"
                  onChange={handleUpdate}
                  defaultValue={ingredientList}
                />
                <TextField
                  label="Directions"
                  sx={{ m: 1 }}
                  multiline
                  rows={7}
                  name="directions"
                  onChange={handleUpdate}
                  defaultValue={directionList}
                />
                <TextField
                  label="Additional Notes"
                  sx={{ m: 1 }}
                  multiline
                  rows={5}
                  name="notes"
                  onChange={handleUpdate}
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
                <Button onClick={handleSubmit} type="submit">
                  <p>Update Recipe</p>
                </Button>
                <Button>
                  <Link to="/myprofile">Cancel</Link>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
      <br />
      <br />
    </Box>
  );
};

export default UpdateForm;
