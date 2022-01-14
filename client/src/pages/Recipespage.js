import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import Masonry from "react-masonry-css";

import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../utils/queries";

// IMPORTANT FOR CLOUDINARY
// import Axios from 'axios';
import { Image } from "cloudinary-react";
import { Transformation } from "cloudinary-react";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Collapse } from "@mui/material";
// import Paper from "@mui/material/Paper";

const Recipespage = () => {
  // THIS GRABS THE RECIPES CREATED BY THE USER OR AT LEAST IS MADE
  // BY THE USER
  const { loading, data } = useQuery(QUERY_RECIPES);
  let recipes = data?.recipes || {};

  // THESE SETS OF CODE SHOULD BE ABLE TO TAKE THE RECIPES SECTION AND
  // CREATE A A NEW RECIPE ARRAY THAT HAS NO DUPLICATES BASED ON THE TITLE
  // THIS CAN RAISE ANOTHER PROBLEM IF TITLES ARE THE SAME BUT ID IS NOT
  let uniqueRecipes = [];
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

  const [recipeslist, setRecipeslist] = useState(recipes);

  useEffect(() => {
    setRecipeslist(uniqueRecipes);
  }, [recipes]);

  let filtered = [];
  const handlefilter = async (event) => {
    let key = event.target.value;
    console.log(key);
    filtered = uniqueRecipes.filter(
      (recipe) =>
        recipe.category === key ||
        recipe.mealofday === key ||
        recipe.cuisine === key ||
        recipe.cookstyle === key ||
        recipe.diettype === key
    );

    setRecipeslist(filtered);
  };

  const handleShowAll = async () => {
    setRecipeslist(uniqueRecipes);
  };

  const [comSchExpand, setcomExpand] = useState(false);
  const handleSchExpand = () => {
    setcomExpand(!comSchExpand);
  };

  const [keyExpand, setkeyExpand] = useState(false);
  const handlekeyExpand = () => {
    setkeyExpand(!keyExpand);
  };

  const [ingExpand, setIngExpand] = useState(false);
  const handleIngExpand = () => {
    setIngExpand(!ingExpand);
  };

  const [recSearchKey, setrecSearchkey] = useState("");

  let keyFilter = (recSearchKey) => {
    let search = recSearchKey;
    let hit = false;
    let filterRec = [];

    // THIS PICKS THE RECIPES
    for (let a = 0; a < recipes.length; a++) {
      // THIS PICKS THE INGREDIENTS
      for (let b = 0; b < recipes[a].ingredients.length; b++) {
        // THIS GOES THROUGH EACH INGREDIENTS AND LOOKS FOR A MATCH
        for (let c = 0; c < recipes[a].ingredients[b].split(" ").length; c++) {
          if (search === recipes[a].ingredients[b].split(" ")[c]) {
            // console.log("we got one");
            filterRec.push(recipes[a]);
            hit = true;
            break;
          }
        }

        if (hit === true) {
          hit = false;
          break;
        }
      }
    }
    return filterRec;
  };

  const keySearch = (event) => {
    event.preventDefault();

    setRecipeslist(keyFilter(recSearchKey));
  };

  const truncate = (str) => {
    return str ? str.substring(0, 50) + "..." : str;
  };

  const breakpoints = {
    default: 4,
    700: 1,
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid item sx={{ background: "black", height: 175, mb: 10 }}>
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              item
              md={9}
              sx={{
                fontSize: 75,
                borderStyle: "solid",
                background: "white",
              }}
            >
              Search for a Recipe
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          md={9}
          sx={{
            display: "flex",
          }}
        >
          <Grid
            item
            md={3.25}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              square
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                m: 1.4,
                width: "17%",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 30, p: 1 }}>
                  <p>Filter</p>
                </Typography>
                <Button variant="contained" onClick={handleShowAll}>
                  Show All
                </Button>
              </Grid>
              <hr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2.5,
                  borderRadius: 10,
                  marginTop: 24,
                  marginBottom: 20,
                  width: "85%",
                }}
              />
              <Grid
                item
                sx={{ mt: 0.5, mb: 0.5, maxHeight: 550, overflowY: "auto" }}
              >
                <Grid>
                  <Grid>
                    <Typography
                      onClick={handleSchExpand}
                      sx={{ fontSize: 20, p: 1 }}
                    >
                      <p>Common Search</p>
                    </Typography>
                  </Grid>
                  <Collapse in={comSchExpand}>
                    <Grid item sx={{ p: 1 }}>
                      <Grid>
                        <Button
                          variant="contained"
                          value="Drinks"
                          onClick={handlefilter}
                        >
                          Drinks
                        </Button>
                        <Button
                          variant="contained"
                          value="Appetizer"
                          onClick={handlefilter}
                        >
                          Appetizers
                        </Button>
                        <Button
                          variant="contained"
                          value="Entree"
                          onClick={handlefilter}
                        >
                          Entrees
                        </Button>
                        <Button
                          variant="contained"
                          value="Dessert"
                          onClick={handlefilter}
                        >
                          Desserts
                        </Button>
                      </Grid>
                      <br />
                      <Grid>
                        <Button
                          variant="contained"
                          value="Breakfast"
                          onClick={handlefilter}
                        >
                          Breakfast
                        </Button>
                        <Button
                          variant="contained"
                          value="Brunch"
                          onClick={handlefilter}
                        >
                          Brunch
                        </Button>
                        <Button
                          variant="contained"
                          value="Lunch"
                          onClick={handlefilter}
                        >
                          Lunch
                        </Button>
                        <Button
                          variant="contained"
                          value="Dinner"
                          onClick={handlefilter}
                        >
                          Dinner
                        </Button>
                        <Button
                          variant="contained"
                          value="Snack"
                          onClick={handlefilter}
                        >
                          Snack
                        </Button>
                      </Grid>
                      <br />
                      <Grid>
                        <Button
                          variant="contained"
                          value="Homemade"
                          onClick={handlefilter}
                        >
                          Homemade
                        </Button>
                        <Button
                          variant="contained"
                          value="Chinese"
                          onClick={handlefilter}
                        >
                          Chinese
                        </Button>
                        <Button
                          variant="contained"
                          value="American"
                          onClick={handlefilter}
                        >
                          American
                        </Button>
                        <Button
                          variant="contained"
                          value="German"
                          onClick={handlefilter}
                        >
                          German
                        </Button>
                        <Button
                          variant="contained"
                          value="Indian"
                          onClick={handlefilter}
                        >
                          Indian
                        </Button>
                        <Button
                          variant="contained"
                          value="Japanese"
                          onClick={handlefilter}
                        >
                          Japanese
                        </Button>
                        <Button
                          variant="contained"
                          value="Russian"
                          onClick={handlefilter}
                        >
                          Russian
                        </Button>
                        <Button
                          variant="contained"
                          value="Thai"
                          onClick={handlefilter}
                        >
                          Thai
                        </Button>
                        <Button
                          variant="contained"
                          value="Filipino"
                          onClick={handlefilter}
                        >
                          Filipino
                        </Button>
                        <Button
                          variant="contained"
                          value="Greek"
                          onClick={handlefilter}
                        >
                          Greek
                        </Button>
                        <Button
                          variant="contained"
                          value="Italian"
                          onClick={handlefilter}
                        >
                          Italian
                        </Button>
                        <Button
                          variant="contained"
                          value="Mexican"
                          onClick={handlefilter}
                        >
                          Mexican
                        </Button>
                        <Button
                          variant="contained"
                          value="Spanish"
                          onClick={handlefilter}
                        >
                          Spanish
                        </Button>
                        <Button
                          variant="contained"
                          value="Korean"
                          onClick={handlefilter}
                        >
                          Korean
                        </Button>
                        <Button
                          variant="contained"
                          value="Cajun"
                          onClick={handlefilter}
                        >
                          Cajun
                        </Button>
                      </Grid>
                      <br />
                      <Grid>
                        <Button
                          variant="contained"
                          value="Regular"
                          onClick={handlefilter}
                        >
                          Regular
                        </Button>
                        <Button
                          variant="contained"
                          value="Keto Friendly"
                          onClick={handlefilter}
                        >
                          Keto Friendly
                        </Button>
                        <Button
                          variant="contained"
                          value="Gluten-Free"
                          onClick={handlefilter}
                        >
                          Gluten-Free
                        </Button>
                        <Button
                          variant="contained"
                          value="Low Carb"
                          onClick={handlefilter}
                        >
                          Low Carb
                        </Button>
                        <Button
                          variant="contained"
                          value="Low Calorie"
                          onClick={handlefilter}
                        >
                          Low Calorie
                        </Button>
                        <Button
                          variant="contained"
                          value="Low Cholesterol"
                          onClick={handlefilter}
                        >
                          Low Cholesterol
                        </Button>
                        <Button
                          variant="contained"
                          value="Low Sodium"
                          onClick={handlefilter}
                        >
                          Low Sodium
                        </Button>
                        <Button
                          variant="contained"
                          value="Low Fat"
                          onClick={handlefilter}
                        >
                          Low Fat
                        </Button>
                        <Button
                          variant="contained"
                          value="Vegan"
                          onClick={handlefilter}
                        >
                          Vegan
                        </Button>
                        <Button
                          variant="contained"
                          value="Vegetarian"
                          onClick={handlefilter}
                        >
                          Vegetarian
                        </Button>
                      </Grid>
                      <br />
                      <Grid>
                        <Button
                          variant="contained"
                          value="Baking"
                          onClick={handlefilter}
                        >
                          Baking
                        </Button>
                        <Button
                          variant="contained"
                          value="Frying"
                          onClick={handlefilter}
                        >
                          Frying
                        </Button>
                        <Button
                          variant="contained"
                          value="Roasting"
                          onClick={handlefilter}
                        >
                          Roasting
                        </Button>
                        <Button
                          variant="contained"
                          value="Grilling"
                          onClick={handlefilter}
                        >
                          Grilling
                        </Button>
                        <Button
                          variant="contained"
                          value="Steaming"
                          onClick={handlefilter}
                        >
                          Steaming
                        </Button>
                        <Button
                          variant="contained"
                          value="Boiling"
                          onClick={handlefilter}
                        >
                          Boiling
                        </Button>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
                <hr
                  style={{
                    borderStyle: "solid",
                    borderWidth: 1.75,
                    borderRadius: 11,
                    marginTop: 5,
                    marginBottom: 20,
                    width: "65%",
                  }}
                />
                <Grid item sx={{ mt: 0.5, mb: 0.5 }}>
                  <Grid>
                    <Typography
                      onClick={handlekeyExpand}
                      sx={{ fontSize: 20, p: 1 }}
                    >
                      <p>Search by Keyword</p>
                    </Typography>
                  </Grid>
                  <Collapse in={keyExpand}>
                    <Grid sx={{ p: 1, display: "flex" }}>
                      <TextField
                        onChange={(event) => {
                          setrecSearchkey(event.target.value);
                        }}
                      />
                      <Button onClick={keySearch}>Search</Button>
                    </Grid>
                  </Collapse>
                </Grid>
                <hr
                  style={{
                    borderStyle: "solid",
                    borderWidth: 1.75,
                    borderRadius: 11,
                    marginTop: 5,
                    marginBottom: 20,
                    width: "65%",
                  }}
                />
                <Grid item sx={{ mt: 0.5, mb: 0.5 }}>
                  <Grid>
                    <Typography
                      onClick={handleIngExpand}
                      sx={{ fontSize: 20, p: 1 }}
                    >
                      <p>Ingredients</p>
                    </Typography>
                  </Grid>
                  <Collapse in={ingExpand}>
                    <Grid
                      item
                      sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                      <Grid
                        sx={{ p: 1, display: "flex", flexDirection: "column" }}
                      >
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <TextField />
                          <Button variant="outlined">+</Button>
                        </Grid>
                        <br />
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <TextField />
                          <Button variant="outlined">+</Button>
                        </Grid>
                      </Grid>
                      <Grid sx={{ p: 1, display: "flex" }}>
                        <Button variant="outlined">Search</Button>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
                <hr
                  style={{
                    borderStyle: "solid",
                    borderWidth: 1.75,
                    borderRadius: 11,
                    marginTop: 4,
                    marginBottom: 20,
                    width: "65%",
                  }}
                />
              </Grid>

              <Grid>
                <Button onClick={keyFilter}>Search</Button>
              </Grid>
            </Card>
          </Grid>

          <Grid item md={8.75}>
            <Masonry
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {recipeslist.map((recipe) => (
                <Grid
                  item
                  key={recipe._id}
                  md={12}
                  sx={{ m: 1, mt: 1.5, mb: 1.5 }}
                >
                  <Card elevation={3}>
                    <Link to={`/recipes/${recipe._id}`}>
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Grid>
                          <CardMedia>
                            {recipe.imageid ? (
                              <Image
                                width="100%"
                                cloudName="du119g90a"
                                public_id={recipe.imageid}
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
                        </Grid>
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <CardHeader
                            titleTypographyProps={{
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                            subheaderTypographyProps={{
                              fontSize: 15,
                            }}
                            sx={{
                              p: 1.25,
                              height: 60,
                              alignItems: "center",
                            }}
                            title={recipe.title}
                            subheader={recipe.createdAt}
                          />
                          <CardContent sx={{ p: 1.25 }}>
                            <Typography sx={{ fontSize: 15, height: 60 }}>
                              Description:
                              {" " + truncate(recipe.description)}
                            </Typography>
                            <Typography sx={{ fontSize: 16 }}>
                              Cuisine: {recipe.cuisine}
                            </Typography>
                            <Typography sx={{ fontSize: 16 }}>
                              Servings: {recipe.servings}
                            </Typography>
                            <Typography sx={{ fontSize: 16 }}>
                              Total Time: {recipe.totalTime}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Link>
                    <Link to={`/update/${recipe._id}`}>Update</Link>
                  </Card>
                </Grid>
              ))}
            </Masonry>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Recipespage;
