import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";

import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
// import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_RECIPE } from "../utils/queries";
// import { UPDATE_RECIPE } from "../utils/mutations";

import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// import { Image } from "cloudinary-react";

import UpdateForm from "../components/UpdateForm";

const UpdateRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { recipeId: recipeId },
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Box sx={{ background: "#102542", p: 1 }}>
      <Box>
        <UpdateForm recipe={recipe} />
      </Box>
    </Box>
  );
};

export default UpdateRecipe;
