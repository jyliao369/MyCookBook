import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// IMPORTING EVERYTHING FOR QUERIES AND EVERYTHING FOR MUTATIONS
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER, QUERY_MYPROFILE } from "../utils/queries";
import { REMOVE_RECIPE } from "../utils/mutations";

// IMPORTANT FOR THE USE OF CLOUDINARY
import { Image } from "cloudinary-react";
import { Transformation } from "cloudinary-react";

import Auth from "../utils/auth";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Collapse } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  DeleteForeverOutlined,
  EditOutlined,
  FactCheckOutlined,
  LocalDiningOutlined,
} from "@mui/icons-material";

const Profile = () => {
  const { userId } = useParams();
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
    {
      variables: { userId: userId },
    }
  );

  let user = data?.myprofile || data?.user || {};
  let recipes = user.recipes;

  console.log("User");
  console.log(user);
  console.log("recipes");
  console.log(recipes);

  const [userrecipe, setUserRecipe] = useState("");

  useEffect(() => {
    setUserRecipe(recipes);
  }, [recipes]);

  const [removeRecipe] = useMutation(REMOVE_RECIPE);

  let newlist = [];
  const handleFilter = async (event) => {
    let recipecategory = event.target.value;
    newlist = recipes.filter((recipe) => recipe.category === recipecategory);

    setUserRecipe(newlist);
  };

  const showAll = async () => {
    setUserRecipe(recipes);
  };

  const handleDelete = async (event) => {
    let recipeId = event.target.id;
    console.log(recipeId);
    console.log(typeof recipeId);
    let newlist = recipes.filter((recipe) => recipe._id !== recipeId);

    try {
      await removeRecipe({
        variables: { recipeId },
      });

      console.log("success recipe removed");

      console.log();
    } catch (e) {
      console.error(e);
      console.log("it didnt work");
    }

    setUserRecipe(newlist);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const [ingExpanded, setingExpanded] = useState(false);

  const handleingExpand = () => {
    setingExpanded(!ingExpanded);
  };

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Redirect to="/myprofile" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4 className="profileloggedout">
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  const handleHoverOn = (e) => {
    let element = e.target;
    element.style.color = "red";
  };
  const handleHoverOff = (e) => {
    let element = e.target;
    element.style.color = "black";
  };

  return (
    <Box>
      <Grid sx={{ display: "flex" }}>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642175428/headerimage3_vkbkch.jpg"
        />
      </Grid>
      <Grid
        sx={{
          background: "#4D9DE0",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          pt: 1,
          pb: 1,
          mb: 4.5,
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 15, m: 1 }}
          onClick={showAll}
        >
          Show All
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 15, m: 1 }}
          value="Drinks"
          onClick={handleFilter}
        >
          Drinks
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 15, m: 1 }}
          value="Appetizer"
          onClick={handleFilter}
        >
          Appetizer
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 15, m: 1 }}
          value="Entree"
          onClick={handleFilter}
        >
          Entree
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 15, m: 1 }}
          value="Dessert"
          onClick={handleFilter}
        >
          Dessert
        </Button>
      </Grid>

      <Box>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userrecipe &&
            userrecipe.map((recipe) => (
              <Grid key={recipe._id} item md={5}>
                <Card
                  key={recipe._id}
                  elevation={5}
                  sx={{
                    m: 1.25,
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <Grid item md={3.5} sx={{ display: "flex", p: 1.25 }}>
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
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      md={7.5}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <CardHeader
                        titleTypographyProps={{
                          fontSize: 22,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 15,
                        }}
                        title={recipe.title}
                        subheader={recipe.createdAt}
                      />

                      <CardContent
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Grid sx={{ display: "flex", flexDirection: "row" }}>
                          <Grid item sx={{ mr: 5 }}>
                            <Typography sx={{ fontSize: 18 }}>
                              Prep Time: {recipe.prepTime}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Cook Time: {recipe.cookTime}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Total Time: {recipe.totalTime}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Servings: {recipe.servings}
                            </Typography>
                          </Grid>
                          <Grid>
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
                              Yield Per Serving: {recipe.yield}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                    <Grid
                      item
                      md={1}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <DeleteForeverOutlined
                        id={recipe._id}
                        sx={{ fontSize: 35, display: "flex", p: 1 }}
                        onClick={handleDelete}
                        onMouseOver={handleHoverOn}
                        onMouseOut={handleHoverOff}
                      ></DeleteForeverOutlined>

                      <Link to={`/update/${recipe._id}`}>
                        <EditOutlined
                          sx={{ fontSize: 35, display: "flex", p: 1 }}
                          onMouseOver={handleHoverOn}
                          onMouseOut={handleHoverOff}
                        ></EditOutlined>
                      </Link>

                      <FactCheckOutlined
                        sx={{ display: "flex", p: 1, fontSize: 35 }}
                        expand={ingExpanded}
                        onClick={handleingExpand}
                        onMouseOver={handleHoverOn}
                        onMouseOut={handleHoverOff}
                      ></FactCheckOutlined>

                      <LocalDiningOutlined
                        sx={{ display: "flex", p: 1, fontSize: 35 }}
                        expand={expanded}
                        onClick={handleExpand}
                        onMouseOver={handleHoverOn}
                        onMouseOut={handleHoverOff}
                      ></LocalDiningOutlined>
                    </Grid>
                  </Grid>
                  <Collapse in={ingExpanded} timeout="auto" unmountOnExit>
                    <Grid item sx={{ overflow: "auto" }}>
                      <CardContent>
                        <Typography paragraph>Ingredients</Typography>
                        {recipe.ingredients.map((ingredient) => (
                          <Typography key={ingredient}>{ingredient}</Typography>
                        ))}
                      </CardContent>
                    </Grid>
                  </Collapse>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid item sx={{ overflow: "auto" }}>
                      <CardContent>
                        <Typography paragraph>Instructions</Typography>
                        {recipe.directions.map((direction) => (
                          <Typography key={direction}>{direction}</Typography>
                        ))}
                      </CardContent>
                    </Grid>
                  </Collapse>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
