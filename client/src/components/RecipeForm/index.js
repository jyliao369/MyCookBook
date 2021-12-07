import React from 'react';
import { useState } from 'react';

// import {Link} from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES } from '../../utils/queries';
import { QUERY_MYPROFILE } from '../../utils/queries'

import Axios from 'axios';
// import { Image } from 'cloudinary-react';

import Auth from '../../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const RecipeForm = () => {

    const [newRecipe, setNewRecipe] = useState({
        title: '',
        cuisine: '',
        diettype: '',
        category: '',
        servings: '',
        totalTime: '',
        ingredients: [''],
        directions: [''],
        imageid: '',
    });

    console.log("New Recipe");
    console.log(newRecipe);
    // console.log(newRecipe.directions);

    // THIS SHOULD HANDLE THE IMAGES BEING UPLOADED
    // IT SHOULD ALSO GENERATE PUBLIC ID FOR THE IMAGE
    const [imageSelected, setImageSelected] = useState("");
    // const [imageID, setImageID] = useState("");

    const uploadImage = (file) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "yun8815z");

        Axios.post(
            "https://api.cloudinary.com/v1_1/du119g90a/image/upload", 
            formData
        ).then((response) => {
            console.log("response");
            console.log(response);
            console.log("public ID");
            console.log(response.data.public_id);
            
            setNewRecipe((prevState) => ({

                ...prevState,
                imageid: response.data.public_id,
            }))
        });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "title") {
            setNewRecipe((prevState) => ({

                ...prevState,
                title: value,
            }))
        }

        if (name === "cuisine") {
            setNewRecipe((prevState) => ({

                ...prevState,
                cuisine: value,
            }))
        }

        if (name === "diettype") {
            setNewRecipe((prevState) => ({

                ...prevState,
                diettype: value,
            }))
        }

        if (name === "category") {
            setNewRecipe((prevState) => ({
                
                ...prevState,
                category: value,
            }))
        }

        if (name === "servings") {
            setNewRecipe((prevState) => ({

                ...prevState,
                servings: value,
            }))
        }

        if (name === "totalTime") {
            setNewRecipe((prevState) => ({

                ...prevState,
                totalTime: value,
            }))
        }

        if (name === 'ingredients') {
            let ingredientsarray = [];
            let ingredients = value.split("\n");
            for (let a = 0; a < ingredients.length; a++) {
                ingredientsarray.push(ingredients[a]);
                setNewRecipe((prevState) => ({
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
                setNewRecipe((prevState) => ({
                    ...prevState,
                    directions: directionssarray
                }))
            };
        }
    };

    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {
            try {
                const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

                cache.writeQuery({
                    query: QUERY_RECIPES,
                    data: { recipes: [addRecipe, ...recipes] },
                });
            } catch (e) {
                console.error(e);
            }

            const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
            cache.writeQuery({
                query: QUERY_MYPROFILE,
                data: { myprofile: { ...myprofile, recipes: [...myprofile.recipes, addRecipe] } },
            });
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addRecipe({
                variables: { 
                    ...newRecipe, 
                    postAuthor: Auth.getProfile().data.email,
                },
            });

            setNewRecipe({
                title: '',
                category: '',
                servings: '',
                totalTime: '',
                ingredients: '',
                directions: '',
                imageid: '',
            });
            
            // Auth.login(data.addRecipe)
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ background: '#102B3F', p:1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', m:1.5}}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }} elevation={3}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Grid sx={{ display: 'flex', flexDirection:'column', width: 500 }}>
                            
                            <TextField 
                                label="Recipe Name"
                                sx={{ m: 2 }}
                                name="title"
                                onChange={handleChange}   
                                placeholder="Recipe Name"          
                            />

                            <TextField
                                select
                                label="Cuisine"
                                sx={{ m: 2 }}
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
                                name="servings"
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Total Time (mins)"
                                sx={{ m: 2 }}
                                name="totalTime"         
                                onChange={handleChange}               
                            />
                        </Grid>

                        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                            <Grid>
                                {imageSelected ? (
                                    <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                                ) : (
                                    <h1>No Image</h1>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <input 
                                    title=" "
                                    type="file" 
                                    onChange={(event) => {
                                    uploadImage(event.target.files[0]);
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
                            name="ingredients"
                            onChange={handleChange}                
                        />
                        <TextField 
                            label="Directions"
                            sx={{ m: 2 }}
                            multiline
                            rows={10}
                            name="directions"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={handleSubmit} type='submit'>Add Recipe</button>
                    </Grid>
                </Paper>
            </Grid>
        </Box>
        </Box>
    );
}

export default RecipeForm;