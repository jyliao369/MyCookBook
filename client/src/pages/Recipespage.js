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

  const [advFilter, setadvFilter] = useState(false);
  const handleadvFilterExpand = () => {
    setadvFilter(!advFilter);
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

  const [yesIng, setYesIng] = useState("");
  const [noIng, setNoIng] = useState("");
  const [listYesIng, setListYes] = useState([]);
  const [listNoIng, setListNo] = useState([]);

  const handleYesIng = () => {
    listYesIng.push(yesIng);
    setListYes(listYesIng);
  };
  const handleNoIng = () => {
    listNoIng.push(noIng);
    setListNo(listNoIng);
  };

  const truncate = (str) => {
    return str ? str.substring(0, 75) + "..." : str;
  };

  const breakpoints = {
    default: 4,
    700: 2,
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
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642124879/headerimage1_abzfej.jpg"
        ></Image>
      </Box>

      <Grid item sx={{ background: "#DDF5FF", pb: 1.5 }}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pt: 1.5,
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              pt: 1,
              pb: 1,
            }}
          >
            <TextField
              onChange={(event) => setrecSearchkey(event.target.value)}
              sx={{ ml: 1, mr: 1, background: "white" }}
            />
            <Button
              variant="contained"
              onClick={keySearch}
              sx={{ ml: 1, mr: 1 }}
            >
              Search
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              pt: 1,
              pb: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleShowAll}
              sx={{ ml: 1, mr: 1 }}
            >
              Show All
            </Button>

            <Button
              variant="contained"
              onClick={handleadvFilterExpand}
              sx={{ ml: 1, mr: 1 }}
            >
              Advance search
            </Button>
          </Grid>
        </Grid>

        <Collapse in={advFilter}>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              md={10.5}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <Grid
                item
                xs={12}
                md={5.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 1.5,
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {list1.map((item) => (
                    <Button
                      variant="contained"
                      value={item}
                      onClick={handlefilter}
                      sx={{ m: 0.35, p: 0.45 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Grid>
                <br />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {list2.map((item) => (
                    <Button
                      variant="contained"
                      value={item}
                      onClick={handlefilter}
                      sx={{ m: 0.35, p: 0.45 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Grid>
                <br />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {list3.map((item) => (
                    <Button
                      variant="contained"
                      value={item}
                      onClick={handlefilter}
                      sx={{ m: 0.35, p: 0.45 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Grid>
                <br />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {list4.map((item) => (
                    <Button
                      variant="contained"
                      value={item}
                      onClick={handlefilter}
                      sx={{ m: 0.35, p: 0.45 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Grid>
                <br />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {list5.map((item) => (
                    <Button
                      variant="contained"
                      value={item}
                      onClick={handlefilter}
                      sx={{ m: 0.35, p: 0.45 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={5.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  p: 1.5,
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid>
                    <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                      <TextField onChange={(e) => setYesIng(e.target.value)} />
                      <Button variant="contained" onClick={handleYesIng}>
                        +
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                      <TextField onChange={(e) => setNoIng(e.target.value)} />
                      <Button variant="contained" onClick={handleNoIng}>
                        -
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid>Recipes with these Ingredients: </Grid>
                    <Grid item sx={{ display: "flex" }}>
                      {listYesIng.map((yes) => (
                        <p>{yes}</p>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid>Recipes without these Ingredients:</Grid>
                    <Grid>
                      {listNoIng.map((no) => (
                        <p>{no}</p>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          md={10.5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item md={9}>
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
                        <Grid item>
                          <CardHeader
                            titleTypographyProps={{
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                            title={recipe.title}
                            sx={{
                              height: 50,
                              p: 1,
                              pl: 1.25,
                              pr: 1.25,
                              alignItems: "flex-start",
                            }}
                          />
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              p: 1,
                              pl: 1.25,
                              pr: 1.25,
                            }}
                          >
                            <Grid item sx={{ display: "flex", height: 95 }}>
                              <Typography sx={{ fontSize: 15 }}>
                                {truncate(recipe.description)}
                              </Typography>
                            </Grid>
                            <br />
                            <Grid>
                              <Typography sx={{ fontSize: 16 }}>
                                Cuisine: {recipe.cuisine}
                              </Typography>
                              <Typography sx={{ fontSize: 16 }}>
                                Servings: {recipe.servings}
                              </Typography>
                              <Typography sx={{ fontSize: 16 }}>
                                Total Time: {recipe.totalTime}
                              </Typography>
                            </Grid>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Link>
                    {/* <Grid>
                      <Link to={`/update/${recipe._id}`}>update</Link>
                    </Grid> */}
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
