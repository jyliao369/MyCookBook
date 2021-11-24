import React from 'react';
// import { useContext } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_MYPROFILE } from '../../utils/queries';

import Axios from 'axios';
// import { Image } from 'cloudinary-react';

import Auth from '../../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const RecipeForm = () => {

    const [newRecipe, setNewRecipe] = useState({
        title: '',
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
            let testingredientsarray = value.split("\n");
            for (let a = 0; a < testingredientsarray.length; a++) {
                ingredientsarray.push(testingredientsarray[a]);
                setNewRecipe((prevState) => ({
                    ...prevState,
                    ingredients: ingredientsarray
                }))
            };
        }

        if (name === 'directions') {
            let directionssarray = [];
            let testdirectionsarray = value.split("\n");
            for (let b = 0; b < testdirectionsarray.length; b++) {
                directionssarray.push(testdirectionsarray[b]);
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
        <div>
            <Box sx={{ background: '#6b2737' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p:3 }}>
                    <Grid item xs={12} md={8}>
                    <Paper sx={{ p:2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: 350}}>
                                <TextField 
                                    sx={{ m: 1, width: 95/100 }}
                                    label="Recipe Name"
                                    variant="outlined"
                                    name="title"
                                    onChange={handleChange}                   
                                />
                                <Select
                                    sx={{ m: 1, width: 95/100 }}
                                    // label="Category"
                                    variant="outlined"
                                    name="category"
                                    onChange={handleChange}
                                    placeholder="Category"
                                >
                                    <MenuItem value="Drinks">Drinks</MenuItem>
                                    <MenuItem value="Appetizer">Appetizer</MenuItem>
                                    <MenuItem value="Entree">Entree</MenuItem>
                                    <MenuItem value="Dessert">Dessert</MenuItem>
                                </Select>
                                <TextField 
                                    sx={{ m: 1, width: 95/100 }}
                                    label="Servings"
                                    variant="outlined"                   
                                    name="servings"
                                    onChange={handleChange}
                                    rows={2}
                                />
                                <TextField 
                                    sx={{ m: 1, width: 95/100 }}
                                    label="Total Cook Time (mins)"
                                    variant="outlined"
                                    name="totalTime"         
                                   onChange={handleChange}               
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 285 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1.5, width: 95/100 }}>
                                    {imageSelected ? (
                                        <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                                    ) : (
                                        <h1>No Image</h1>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1.5, width: 250 }}>
                                    <input 
                                        title=" "
                                        type="file" 
                                        onChange={(event) => {
                                        uploadImage(event.target.files[0]);
                                        setImageSelected(event.target.files[0]);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box> 

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <TextField 
                                sx={{ m: 1 }}
                                label="Ingredients"
                                variant="outlined"
                                name="ingredients"
                                onChange={handleChange}
                                multiline  
                                rows={10}                 
                            />
                            <TextField 
                                sx={{ m: 1 }}
                                label="Instructions"
                                variant="outlined"
                                name="directions"
                                onChange={handleChange}
                                multiline
                                rows={10}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p:3 }}>
                            <Button variant="contained" onClick={handleSubmit} type='submit'>Add Recipe</Button>
                        </Box>
                    </Paper>
                    </Grid>
                </Box>
            </Box>
            

        </div>
    );
}

export default RecipeForm;