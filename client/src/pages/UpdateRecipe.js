import React from 'react';
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_RECIPE } from '../utils/queries';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { Image } from 'cloudinary-react';

const UpdateRecipe = () => {

    const { recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });

    const recipe = data?.recipe || {};
    console.log('recipe');
    console.log(recipe);

    let ingredientList = [''];
    // for (let a = 0; a < recipe.ingredients.length; a++) {
    //     ingredientList += (recipe.ingredients[a] + '\r\n');
    //     console.log(ingredientList);
    // }

    console.log(ingredientList);

    let directionList = '';
    // for (let b = 0; b< recipe.directions.length; b++) {
    //     directionList += (recipe.directions[b] + '\r\n');
    //     console.log(directionList);
    // }
    
    if (loading) {
        return <h1>Loading</h1>
    }
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>

            <Grid item xs={6}>
                <Paper sx={{ p: 3 }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField 
                            label="Recipe Name"
                            sx={{ p: 2 }}
                            defaultValue={recipe.title} 
                        ></TextField>
                        <TextField 
                            label="Category"
                            sx={{ p: 2 }}
                            defaultValue={recipe.category} 
                        ></TextField>
                        <TextField 
                            label="Servings"
                            sx={{ p: 2 }}
                            defaultValue={recipe.servings} 
                        ></TextField>
                        <TextField 
                            label="Total Time"
                            sx={{ p: 2 }}
                            defaultValue={recipe.totalTime} 
                        ></TextField>
                    </Grid>
                    <Grid>
                        <Image></Image>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Ingredients"
                            sx={{ p: 2 }}
                            multiline
                            rows={10}
                            defaultValue={ingredientList}
                        ></TextField>
                        <TextField
                            label="Directions"
                            sx={{ p: 2 }}
                            multiline
                            rows={10}
                            defaultValue={directionList}
                        ></TextField>
                    </Grid>
                </Paper>
            </Grid>

            {/* <input defaultValue={`${recipe.title}`}></input> */}

        </Box>
    );
};

export default UpdateRecipe;
