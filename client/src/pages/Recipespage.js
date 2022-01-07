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
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Collapse } from "@mui/material";

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

  const [recipeslist, setRecipeslist] = useState([""]);

  useEffect(() => {
    setRecipeslist(uniqueRecipes);
  }, [recipes]);

  console.log("recipeslist");
  console.log(recipeslist);

  let filtered = [];
  const handlefilter = async (event) => {
    let recipecategory = event.target.value;
    console.log(recipecategory);
    filtered = uniqueRecipes.filter(
      (recipe) => recipe.category === recipecategory
    );

    setRecipeslist(filtered);
    // event.preventDefault();
    // console.log(event.target.value);

    // for (let a = 0; a < uniqueRecipes.length; a++) {
    //     if (uniqueRecipes[a].category === event.target.value) {
    //         filtered.push(uniqueRecipes[a]);
    //         console.log("test");
    //         console.log(filtered);
    //     }
    // }
    // console.log("test");
    // console.log(filtered);
    // setRecipeslist(filtered);
  };
  // console.log("testlist");
  // console.log(filtered);
  // console.log("newrecipelist");
  // console.log(recipeslist);

  const handleShowAll = async () => {
    setRecipeslist(uniqueRecipes);
  };

  const AdvExpand = styled((props) => {
    const { advExpand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({}));

  const [advExpand, setadvExpand] = useState(false);

  const handleAdvExpand = () => {
    setadvExpand(!advExpand);
  };

  const ingSearchExpand = styled((props) => {
    const { ingExpand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({}));

  const [ingExpand, setIngExpand] = useState(false);

  const handleIngExpand = () => {
    setIngExpand(!ingExpand);
  };

  const breakpoints = {
    default: 5,
    700: 1,
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Box>
      <Grid
        sx={{
          background: "#F1FFFA",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            p: 1,
          }}
        >
          <Grid
            item
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Grid item sx={{ display: "flex", flexDirection: "row" }}>
              <TextField label="Search" variant="outlined"></TextField>
              <Button variant="contained">Search</Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                expand={ingExpand}
                onClick={() => {
                  handleIngExpand();
                }}
                sx={{ mr: 2, ml: 2 }}
              >
                Search by Ingredients
              </Button>
            </Grid>
          </Grid>

          <Grid>
            <Button
              variant="contained"
              onClick={handleShowAll}
              color="info"
              sx={{ fontSize: 13, m: 1 }}
            >
              Show All
            </Button>
            <Button
              variant="contained"
              value="Drinks"
              onClick={handlefilter}
              sx={{ fontSize: 13, m: 1 }}
            >
              Drinks
            </Button>
            <Button
              variant="contained"
              value="Appetizer"
              onClick={handlefilter}
              sx={{ fontSize: 13, m: 1 }}
            >
              Appetizers
            </Button>
            <Button
              variant="contained"
              value="Entree"
              onClick={handlefilter}
              sx={{ fontSize: 13, m: 1 }}
            >
              Entrees
            </Button>
            <Button
              variant="contained"
              value="Dessert"
              onClick={handlefilter}
              sx={{ fontSize: 13, m: 1 }}
            >
              Desserts
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: 13, m: 1 }}
              expand={advExpand}
              onClick={handleAdvExpand}
            >
              Advance Search
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Collapse in={ingExpand} timeout="auto" unmountOnExit>
            <Grid item sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  sx={{ m: 1 }}
                  label="Recipe with this ingredient"
                ></TextField>
                <TextField
                  sx={{ m: 1 }}
                  label="Recipe without this ingredient"
                ></TextField>
                <Button sx={{ m: 1 }}>Search</Button>
              </Grid>
              <Grid>
                <Grid>Ingredients List</Grid>
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={advExpand} timeout="auto" unmountOnExit>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ m: 1 }}>
                Recipes Based on Time of Day
              </Grid>
              <Grid>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Breakfast
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Brunch
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Lunch
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Dinner
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Snacks
                </Button>
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ m: 1 }}>
                Cuisines from Around the World
              </Grid>
              <Grid>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Chinese
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  German
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Indian
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Japanese
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Russian
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Thai
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Filipino
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Greek
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Italian
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Mexican
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Spanish
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Global
                </Button>
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ m: 1 }}>
                Diet and Healthy Recipes
              </Grid>
              <Grid>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Gluten-Free
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Low-Calorie
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Low Cholesterol
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Low Sodium
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Low Carb
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Low Fat
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Keto Friendly
                </Button>
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ m: 1 }}>
                Cooking Style
              </Grid>
              <Grid>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Baking
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Frying
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Roasting
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Grilling
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Steaming
                </Button>
                <Button variant="contained" sx={{ mr: 1, ml: 1 }}>
                  Boiling
                </Button>
              </Grid>
            </Grid>
            <br />
          </Collapse>
        </Grid>
      </Grid>

      <Box
        sx={{
          background: "#364156",
          display: "flex",
          justifyContent: "center",
          pt: 3,
          pb: 3,
        }}
      >
        <Grid item md={8}>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {recipeslist.map((recipe) => (
              <Grid key={recipe._id} item sx={{ m: 1 }}>
                <Card elevation={3}>
                  <Link to={`/recipes/${recipe._id}`}>
                    <Grid>
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 20,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        title={recipe.title}
                        subheader={recipe.createdAt}
                      />
                      <CardMedia
                        sx={{
                          ml: 1,
                          mr: 1,
                          mt: 0.5,
                          mb: 0.5,
                          display: "flex",
                          borderStyle: "solid",
                          borderWidth: 4,
                          borderColor: "#373F51",
                        }}
                      >
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
                      </CardMedia>
                      <CardContent
                        sx={{
                          ml: 0.5,
                          mr: 0.5,
                          mt: 0.5,
                          mb: 0.5,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography sx={{ fontSize: 18 }}>
                          Category: {recipe.category}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                          Cuisine: {recipe.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                          Diet: {recipe.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                          Servings: {recipe.servings}{" "}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                          Total Time: {recipe.totalTime}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Masonry>
        </Grid>
      </Box>
    </Box>
  );
};

export default Recipespage;
