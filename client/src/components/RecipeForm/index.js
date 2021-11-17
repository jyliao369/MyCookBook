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
import InputLabel from '@mui/material/InputLabel'

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
        <div className="recipeformsection">
            
            {/* <form onSubmit={handleSubmit} className="recipeform">
                <div className="tophalf">
                    <div className="basicinfo">
                        <input placeholder="Recipe Name" name="title" onChange={handleChange}></input>
                        <select placeholder="Category" name="category" onChange={handleChange}>
                            <option value="">Choose a Category</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Entres">Entres</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                        <input placeholder="Servings" name="servings" onChange={handleChange}></input>
                        <input placeholder="Total Time in Mins" name="totalTime" onChange={handleChange}></input>
                    </div>
                    <div className="uploadImage">
                        <div className="previewImage">
                            {imageSelected ? (
                                <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                            ) : (
                                <h1>No Image</h1>
                            )}
                        </div>
                        <input 
                            title=" "
                            type="file" 
                            onChange={(event) => {
                                uploadImage(event.target.files[0]);
                                setImageSelected(event.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="ingred-instr">
                    <textarea placeholder="Ingredients" name="ingredients" onChange={handleChange}></textarea>
                    <textarea placeholder="Instructions" name="directions" onChange={handleChange}></textarea>
                </div>
                <div className="">
                    <button className="recipeformbutton" type="submit">
                        Add Recipe
                    </button>
                </div>
            </form> */}
            {/* <br />
            <br />
            <br /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1.5 }}>
                        <TextField 
                            sx={{ m: 1, width: 500 }}
                            label="Recipe Name"
                            variant="outlined"
                            name="title"
                            onChange={handleChange}                   
                        />
                        <Select
                            sx={{ m: 1, width: 500 }}
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
                            sx={{ m: 1, width: 500 }}
                            label="Servings"
                            variant="outlined"                   
                            name="servings"
                            onChange={handleChange}
                        />
                        <TextField 
                            sx={{ m: 1, width: 500 }}
                            label="Total Cook Time (mins)"
                            variant="outlined"
                            name="totalTime"
                            onChange={handleChange}                 
                        />
                    </Box>
                    <Box sx={{ width: 225, p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {imageSelected ? (
                                <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                            ) : (
                                <h1>No Image</h1>
                            )}
                        </Box>
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

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField 
                        sx={{ m: 1, width: 750 }}
                        label="Ingredients"
                        variant="outlined"
                        name="ingredients"
                        onChange={handleChange}
                        multiline  
                        rows={7}                 
                    />
                    <TextField 
                        sx={{ m: 1, width: 750  }}
                        label="Instructions"
                        variant="outlined"
                        name="directions"
                        onChange={handleChange}
                        multiline
                        rows={7}
                    />
                </Box>

                <Button variant="contained" onClick={handleSubmit} type='submit'>Add Recipe</Button>       
            </Box>

        </div>
    );
}

export default RecipeForm;