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
import { valueFromAST } from 'graphql';

const UpdateRecipe = () => {

    const { recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });

    // THESE CODES HERE SHOULD GRAB THE RECIPE AND LOAD THE PRESET DATA
    // INTO THE RESPECTFUL AREAS OF THE FORM
    const recipe = data?.recipe || {};
    // console.log('recipe');
    // console.log(recipe);

    let ingredientList = [''];
    if (recipe?.ingredients) {
        for (let a = 0; a < recipe.ingredients.length; a++) {
            ingredientList += (recipe.ingredients[a] + '\r\n');
            // console.log(ingredientList);
        }
    }

    let directionList = [''];
    if (recipe?.directions) {
        for (let b = 0; b< recipe.directions.length; b++) {
            directionList += (recipe.directions[b] + '\r\n');
            // console.log(directionList);
        }
    }

    // THESE NEXT CODES SHOULD, IN MOST BASIC TERMS, USE A USESTATE TO BASICALLY 
    // CREATE AN UPDATED RECIPE. SHOULD HAVE THE SAME CODE AS THE ADD/CREATE NEW RECIPE
    const [updateRecipe, setUpdateRecipe] = useState({
        title: recipe.title,
        category: `${recipe.category}`,
        servings: `${recipe.servings}`,
        totalTime: `${recipe.totalTime}`,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        imageid: `${recipe.imageid}`,
    });


    console.log('updateRecipe');
    console.log(updateRecipe);

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "title") {
            setUpdateRecipe((prevState) => ({

                ...prevState,
                title: value,
            }))
        }

        if (name === "category") {
            setUpdateRecipe((prevState) => ({

                ...prevState,
                category: value,
            }))
        }

        if (name === "servings") {
            setUpdateRecipe((prevState) => ({

                ...prevState,
                servings: value,
            }))
        }

        if (name === "totalTime") {
            setUpdateRecipe((prevState) => ({

                ...prevState,
                totalTime: value,
            }))
        }

        if (name === 'ingredients') {
            let ingredientsarray = [];
            let ingredients = value.split("\n");
            for (let a = 0; a < ingredients.length; a++) {
                ingredientsarray.push(ingredients[a]);
                setUpdateRecipe((prevState) => ({
                    ...prevState,
                    ingredients: ingredientsarray
                }))
            };
        }

        if (name === 'directions') {
            let directionssarray = [];
            let directions = value.split("\n");
            for (let b = 0; b < directions.length; b++) {
                directionssarray.push(directions[b]);
                setUpdateRecipe((prevState) => ({
                    ...prevState,
                    directions: directionssarray
                }))
            };
        }
    };

    
    if (loading) {
        return <h1>Loading</h1>
    }
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', width: 400 }}>
                            <TextField 
                                label="Recipe Name"
                                sx={{ m: 2 }}
                                defaultValue={recipe.title}
                                name ="title"
                                onChange={handleChange} 
                            ></TextField>
                            <TextField 
                                label="Category"
                                sx={{ m: 2 }}
                                defaultValue={recipe.category}
                                name="category"
                                onChange={handleChange} 
                            ></TextField>
                            <TextField 
                                label="Servings"
                                sx={{ m: 2 }}
                                defaultValue={recipe.servings}
                                name="servings" 
                                onChange={handleChange}  
                            ></TextField>
                            <TextField 
                                label="Total Time"
                                sx={{ m: 2 }}
                                defaultValue={recipe.totalTime}
                                name="totalTime" 
                                onChange={handleChange} 
                            ></TextField>
                        </Grid>
                        <Grid sx={{ display: 'flex' }}>
                            {recipe.imageid ? (
                                <Image width='100%' cloudName="du119g90a" public_id={recipe.imageid} />
                            ) : ( 
                                <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"/>
                            )}           
                        </Grid>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                        <TextField
                            label="Ingredients"
                            sx={{ m: 2 }}
                            multiline
                            rows={10}
                            defaultValue={ingredientList}
                            name="ingredients" 
                            onChange={handleChange} 
                        ></TextField>
                        <TextField
                            label="Directions"
                            sx={{ m: 2 }}
                            multiline
                            rows={10}
                            defaultValue={directionList}
                            name="directions" 
                            onChange={handleChange} 
                        ></TextField>
                    </Grid>
                </Paper>
            </Grid>

            {/* <input defaultValue={`${recipe.title}`}></input> */}

        </Box>
    );
};

export default UpdateRecipe;
