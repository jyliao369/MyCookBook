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

import Auth from "../utils/auth";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Collapse } from "@mui/material";

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

  // THESE NEXT LINES OF CODE SHOULD BE ABLE TO DELETE ANY RECIPES WITHIN
  // THE PROFILE PAGE WHICH MEANS ANY RECIPE HELD IN THE USERS RECIPES ARRAY
  // THIS TECHNICALLY SHOULD'T DELETE ANY DUPLICATES OR WHEN A USER ADDS ANOTHER
  // USERS RECIPE OR BASIALLY IT WONT DELETE THE ORIGINAL POST... I THINK
  const [removeRecipe] = useMutation(REMOVE_RECIPE);

  // THIS DOES THE FILTERING
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
    // event.preventDefault();
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

  // THESE CODES ARE FOR THE EXTEND AND COLLAPSE
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const ExpandIng = styled((props) => {
    const { expandIng, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  }));

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

  return (
    <Box>
      <Grid
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          sx={{
            fontSize: 35,
            fontWeight: "bold",
            position: "absolute",
            background: "white",
            p: 1,
            color: "#114b5f",
            border: 2,
            borderRadius: 10,
          }}
        >
          My Cookbook
        </Typography>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/c_crop,h_720,w_1270/v1637261536/headerimage4_kwi90d.jpg"
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          md={10}
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {userrecipe &&
            userrecipe.map((recipe) => (
              <Grid item md={6}>
                <Card
                  key={recipe._id}
                  elevation={5}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Link to={`/recipes/${recipe._id}`}>
                    <Grid item sx={{ display: "flex" }}>
                      <Grid item md={4.2} sx={{ display: "flex", p: 1.25 }}>
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
                      <Grid item md={8.5}>
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
                          <Grid item md={5.5}>
                            <Typography sx={{ fontSize: 18 }}>
                              Prep Time:{" "}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Cook Time:{" "}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Total Time: {recipe.totalTime}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                              Servings: {recipe.servings}
                            </Typography>
                          </Grid>
                          <Grid item md={6.5}>
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
                              Yield Per Serving:{" "}
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Instructions</Typography>
                          {recipe.directions.map((direction) => (
                            <Typography paragraph>{direction}</Typography>
                          ))}
                        </CardContent>
                      </Collapse>
                    </Grid>
                    <Grid>
                      <Collapse in={ingExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Ingredients</Typography>
                          {recipe.ingredients.map((ingredient) => (
                            <Typography paragraph>{ingredient}</Typography>
                          ))}
                        </CardContent>
                      </Collapse>
                    </Grid>
                  </Link>

                  <Grid iem sx={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={handleDelete} id={recipe._id}>
                      <Typography>Delete</Typography>
                    </button>
                    <button>
                      <Link to={`/update/${recipe._id}`}>
                        <Typography>Update</Typography>
                      </Link>
                    </button>
                    <button>
                      <ExpandMore expand={expanded} onClick={handleExpand}>
                        <Typography>Instructions</Typography>
                      </ExpandMore>
                    </button>
                    <button>
                      <ExpandIng expand={ingExpanded} onClick={handleingExpand}>
                        <Typography>Ingredients</Typography>
                      </ExpandIng>
                    </button>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
