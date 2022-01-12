import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { ADD_RECIPE } from "../../utils/mutations";
import { QUERY_RECIPES } from "../../utils/queries";
import { QUERY_MYPROFILE } from "../../utils/queries";

import Axios from "axios";
import { Image } from "cloudinary-react";

import Auth from "../../utils/auth";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const RecipeForm = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "",
    mealofday: "",
    cuisine: "",
    diettype: "",
    cookstyle: "",
    servings: "",
    yield: "",
    prepTime: "",
    cookTime: "",
    totalTime: "",
    description: "",
    notes: "",
    ingredients: [""],
    directions: [""],
    imageid: "",
    publicRecipe: "",
  });

  console.log("New Recipe");
  console.log(newRecipe);

  // THIS SHOULD HANDLE THE IMAGES BEING UPLOADED
  // IT SHOULD ALSO GENERATE PUBLIC ID FOR THE IMAGE
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yun8815z");

    Axios.post(
      "https://api.cloudinary.com/v1_1/du119g90a/image/upload",
      formData
    ).then((response) => {
      // console.log("response");
      // console.log(response);
      // console.log("public ID");
      // console.log(response.data.public_id);

      setNewRecipe((prevState) => ({
        ...prevState,
        imageid: response.data.public_id,
      }));
    });
  };

  const handleChange = (event) => {
    setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
    const { name, value } = event.target;

    if (name === "ingredients") {
      let ingredientsarray = [];
      let ingredients = value.split("\n");
      for (let a = 0; a < ingredients.length; a++) {
        ingredientsarray.push(ingredients[a]);
        setNewRecipe((prevState) => ({
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
        setNewRecipe((prevState) => ({
          ...prevState,
          directions: directionssarray,
        }));
      }
    }

    // console.log(newRecipe.prepTime);
    // console.log(newRecipe.cookTime);
    // console.log("totalTime");
    // console.log(
    //   String(parseInt(newRecipe.prepTime) + parseInt(newRecipe.cookTime))
    // );

    setNewRecipe((prevState) => ({
      ...prevState,
      totalTime: String(
        parseInt(newRecipe.prepTime) + parseInt(newRecipe.cookTime)
      ),
    }));
  };

  const [addRecipe] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      try {
        const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

        cache.writeQuery({
          query: QUERY_RECIPES,
          data: { recipes: [addRecipe, ...recipes] },
        });
      } catch (e) {
        console.error(e);
      }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRecipe({
        variables: {
          ...newRecipe,
          postAuthor: Auth.getProfile().data.email,
        },
      });

      setNewRecipe({
        title: "",
        cuisine: "",
        diettype: "",
        category: "",
        servings: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        ingredients: [""],
        directions: [""],
        imageid: "",
        publicRecipe: "",
      });
      console.log(data);

      // Auth.login(data.addRecipe)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ background: "#102B3F", p: 1 }}>
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
                      {imageSelected ? (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id={newRecipe.imageid}
                        />
                      ) : (
                        <Image
                          width="100%"
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1641313202/addimage_uet12f.png"
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
                          setImageSelected(event.target.files[0]);
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
                      onChange={handleChange}
                      placeholder="Category"
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
                      onChange={handleChange}
                      placeholder="Meal of the Day"
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
                      onChange={handleChange}
                      placeholder="Diet Type"
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
                      onChange={handleChange}
                      placeholder="Cuisine"
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
                      onChange={handleChange}
                      placeholder="Cooking Style"
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
                      onChange={handleChange}
                    />
                    <TextField
                      label="Cook Time (mins)"
                      sx={{ width: 250, m: 1 }}
                      name="cookTime"
                      onChange={handleChange}
                    />
                    <TextField
                      label="Servings"
                      sx={{ width: 250, m: 1 }}
                      name="servings"
                      onChange={handleChange}
                    />
                    <TextField
                      label="Recipe Yield"
                      sx={{ width: 250, m: 1 }}
                      name="yield"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <TextField
                  label="Recipe Name"
                  sx={{ m: 1 }}
                  name="title"
                  onChange={handleChange}
                  placeholder="Recipe Name"
                />
                <TextField
                  label="Description"
                  sx={{ m: 1 }}
                  multiline
                  rows={5}
                  name="description"
                  onChange={handleChange}
                />
                <TextField
                  label="Ingredients"
                  sx={{ m: 1 }}
                  multiline
                  rows={8}
                  name="ingredients"
                  onChange={handleChange}
                />
                <TextField
                  label="Directions"
                  sx={{ m: 1 }}
                  multiline
                  rows={8}
                  name="directions"
                  onChange={handleChange}
                />
                <TextField
                  label="Additional Notes"
                  sx={{ m: 1 }}
                  multiline
                  rows={5}
                  name="notes"
                  onChange={handleChange}
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
                  <p>Add Recipe</p>
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

export default RecipeForm;
