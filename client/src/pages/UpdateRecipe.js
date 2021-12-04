import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_SINGLE_RECIPE } from '../utils/queries';
import { UPDATE_RECIPE } from '../utils/mutations';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { Image } from 'cloudinary-react';

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
            if (a < recipe.ingredients.length-1) {
                ingredientList += (recipe.ingredients[a] + '\r\n');
            } else if (a === recipe.ingredients.length - 1){
                ingredientList += (recipe.ingredients[a]);
            }
        }
    }

    let directionList = [''];
    if (recipe?.directions) {
        for (let b = 0; b < recipe.directions.length; b++) {
            if (b < recipe.directions.length-1) {
                directionList += (recipe.directions[b] + '\r\n');
            } else if (b === recipe.directions.length - 1){
                directionList += (recipe.directions[b]);
            }
        }
    }

    // THESE NEXT CODES SHOULD, IN MOST BASIC TERMS, USE A USESTATE TO BASICALLY 
    // CREATE AN UPDATED RECIPE. SHOULD HAVE THE SAME CODE AS THE ADD/CREATE NEW RECIPE
    useEffect(()=> {
        setUpdateRecipe({...recipe})
    }, [recipe]);
    
    const [updatedRecipe, setUpdateRecipe] = useState({
        title: recipe.title,
        category: recipe.cateogry,
        servings: recipe.servings,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        imageid: recipe.imageid
    });

    console.log('updateRecipe');
    console.log(updatedRecipe);

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "title") {
            setUpdateRecipe((prevState) => ({
                ...prevState,
                title: value,
            }))
        }

        if (name === "cuisine") {
            setUpdateRecipe((prevState) => ({
                ...prevState,
                cuisine: value,
            }))
        }

        if (name === "diettype") {
            setUpdateRecipe((prevState) => ({
                ...prevState,
                diettype: value,
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

    // THESE CODES SHOULD HELP UPLOAD A NEW IMAGE JUST IN CASE USERS WANT TO 
    // UPLOAD A NEW IMAGE FOR THE RECIPE
    const [ imageSelected, setImageSelected ] = useState("");


    const [updateRecipe] = useMutation(UPDATE_RECIPE);

    const handleUpdate = async (event) => {
        // event.preventDefault();
        let recipeId = updatedRecipe._id
        console.log("hello")

        try {
            updateRecipe({
                variables : { recipeId, ...updatedRecipe }
            })
        }   catch (e) {
            console.log(e);
        }
    };

    
    if (loading) {
        return <h1>Loading</h1>
    }
    
    return (
        <Box sx={{ background: '#102542', p:1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', m:1.5 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }} elevation={3}>
                        <Grid sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Grid sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>

                                <TextField 
                                    label="Recipe Name"
                                    sx={{ m: 2 }}
                                    defaultValue={recipe.title}
                                    name ="title"
                                    onChange={handleChange}
                                    placeholder="Recipe Name"  
                                />

                                <TextField
                                    select
                                    label="Cuisine"
                                    sx={{ m: 2 }}
                                    defaultValue={`${recipe.cuisine}`}
                                    name="cuisine"
                                    onChange={handleChange}
                                    placeholder="Cuisine"
                                >
                                    <MenuItem value="Homemade">Homemade</MenuItem>
                                    <MenuItem value="American">American</MenuItem>
                                    <MenuItem value="Chinese">Chinese</MenuItem>
                                    <MenuItem value="Mexican">Mexican</MenuItem>
                                    <MenuItem value="Thai">Thai</MenuItem>
                                    <MenuItem value="Indian">Indian</MenuItem>
                                    <MenuItem value="Cajun">Cajun</MenuItem>
                                    <MenuItem value="Korean">Korean</MenuItem>
                                    <MenuItem value="Japanese">Japanese</MenuItem>
                                    <MenuItem value="Cuban">Cuban</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Diet Type"
                                    sx={{ m: 2 }}
                                    defaultValue={`${recipe.diettype}`}
                                    name="diettype"
                                    onChange={handleChange}
                                    placeholder="Diet Type"
                                >
                                    <MenuItem value="Regular">Regular</MenuItem>
                                    <MenuItem value="Low Carb">Low Carb</MenuItem>
                                    <MenuItem value="Keto">Keto</MenuItem>
                                    <MenuItem value="Vegan">Vegan</MenuItem>
                                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                </TextField>
                 
                                <TextField
                                    select
                                    label="Category"
                                    sx={{ m: 2 }}
                                    defaultValue={`${recipe.category}`}
                                    name="category"
                                    onChange={handleChange}
                                    placeholder="Category"
                                >
                                    <MenuItem value="Drinks">Drinks</MenuItem>
                                    <MenuItem value="Appetizer">Appetizer</MenuItem>
                                    <MenuItem value="Entree">Entree</MenuItem>
                                    <MenuItem value="Dessert">Dessert</MenuItem>
                                </TextField>

                                <TextField 
                                    label="Servings"
                                    sx={{ m: 2 }}
                                    defaultValue={recipe.servings}
                                    name="servings" 
                                    onChange={handleChange}  
                                />

                                <TextField 
                                    label="Total Time (mins)"
                                    sx={{ m: 2 }}
                                    defaultValue={recipe.totalTime}
                                    name="totalTime" 
                                    onChange={handleChange} 
                                ></TextField>

                            </Grid>

                            <Grid item xs={10.5} md={4} sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                                <Grid>
                                    {/* THE LOGIC IS THAT IF THERE IS A PREEXISTING IMAGE, SHOW THE IMAGE.
                                    IF THERE IS NO IMAGE, CHECK TO SEE IF THERE IS A NEW IMAGE ADDED.
                                    IF NO NEW IMAGE IS SUPPLIED, 'NO IMAGE' IS RENDERED */}
                                    { (recipe.imageid) ? (
                                        <Image width='100%' cloudName="du119g90a" public_id={recipe.imageid}/>
                                    ) : ( (imageSelected) ? (
                                        <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                                    ) : (
                                        <h1>No Image</h1>
                                    ))} 
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <input 
                                        title=" "
                                        type="file"
                                        onChange={(event) => {
                                            setImageSelected(event.target.files[0]);
                                        }}
                                    />  
                                </Grid>
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
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                            <button onClick={handleUpdate}><Link to={`/recipes/${recipe._id}`}>Update Recipe</Link></button>
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </Box>
    );
};

export default UpdateRecipe;
