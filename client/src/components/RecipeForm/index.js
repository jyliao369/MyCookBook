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

  let list1 = ["Drinks", "Appetizer", "Entree", "Dessert"];
  let list2 = ["Breakfast", "Brunch", " Lunch", "Dinner", "Snack"];
  let list3 = [
    "Homemade",
    "Chinese",
    "American",
    "German",
    "Indian",
    "Japanese",
    "Russian",
    "Thai",
    "Filipino",
    "Greek",
    "Italian",
    "Mexican",
    "Spanish",
    "Korean",
    "Cajun",
  ];
  let list4 = [
    "Regular",
    "Keto Friendly",
    "Gluten-Free",
    "Low Carb",
    "Low Calorie",
    "Low Cholesterol",
    "Low Sodium",
    "Low Fat",
    "Vegan",
    "Vegetarian",
  ];
  let list5 = [
    "Baking",
    "Frying",
    "Roasting",
    "Grilling",
    "Steaming",
    "Boiling",
  ];

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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={10}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap-reverse",
              p: 1,
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                  }}
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
              <Grid item>
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    fullWidth
                    label="Prep Time (mins)"
                    name="prepTime"
                    onChange={handleChange}
                    sx={{ m: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Cook Time (mins)"
                    name="cookTime"
                    onChange={handleChange}
                    sx={{ m: 1.5 }}
                  />
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    fullWidth
                    label="Servings"
                    name="servings"
                    onChange={handleChange}
                    sx={{ m: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Recipe Yield"
                    name="yield"
                    onChange={handleChange}
                    sx={{ m: 1.5 }}
                  />
                </Grid>
                <br />
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    onChange={handleChange}
                    placeholder="Category"
                    sx={{ m: 1.5 }}
                  >
                    {list1.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    label="Meal of the Day"
                    name="mealofday"
                    onChange={handleChange}
                    placeholder="Meal of the Day"
                    sx={{ m: 1.5 }}
                  >
                    {list2.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    fullWidth
                    select
                    label="Diet Type"
                    name="diettype"
                    onChange={handleChange}
                    placeholder="Diet Type"
                    sx={{ m: 1.5 }}
                  >
                    {list4.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    label="Cuisine"
                    name="cuisine"
                    onChange={handleChange}
                    placeholder="Cuisine"
                    sx={{ m: 1.5 }}
                  >
                    {list3.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    fullWidth
                    select
                    label="Cooking Style"
                    name="cookstyle"
                    onChange={handleChange}
                    placeholder="Cooking Style"
                    sx={{ m: 1.5 }}
                  >
                    {list5.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    md={12}
                    label="Public Recipe"
                    name="publicRecipe"
                    onChange={handleChange}
                    sx={{ m: 1.5 }}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={handleSubmit} type="submit">
                    Add New Recipe
                  </Button>
                  <Button>
                    <Link to="/myprofile">Cancel</Link>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
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
          </Paper>
        </Grid>
      </Box>

      <br />
      <br />
    </Box>
  );
};

export default RecipeForm;
