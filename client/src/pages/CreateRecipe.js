import React from "react";
import Recipeform from "../components/RecipeForm";

import Axios from "axios";
import { Image } from "cloudinary-react";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const CreateRecipe = () => {
  return (
    <Grid>
      <Grid sx={{ display: "flex" }}>
        <Image
          width="100%"
          cloudName="du119g90a"
          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1642472594/Ingredients_bcmtg8.jpg"
        />
      </Grid>
      <Grid>
        <Recipeform />
      </Grid>
    </Grid>
  );
};

export default CreateRecipe;
