import React from 'react';
// import { useContext } from 'react';
import { useState } from 'react';

// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_MYPROFILE } from '../../utils/queries';

import Axios from 'axios';
// import { Image } from 'cloudinary-react';

import Auth from '../../utils/auth';

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
            <div className="uploadImage">
                <input 
                    title=" "
                    type="file" 
                    onChange={(event) => {
                        uploadImage(event.target.files[0]);
                        setImageSelected(event.target.files[0]);
                    }}
                />
                <div className="previewImage">
                    {imageSelected ? (
                        <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                    ) : (
                        <h1>No Image</h1>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="recipeform">
                <input placeholder="Recipe Name" name="title" onChange={handleChange}></input>
                <input placeholder="Category" name="category" onChange={handleChange}></input>
                <input placeholder="Servings" name="servings" onChange={handleChange}></input>
                <input placeholder="Total Time to Cook" name="totalTime" onChange={handleChange}></input>
                <textarea placeholder="Ingredients" name="ingredients" onChange={handleChange}></textarea>
                <textarea placeholder="Instructions" name="directions" onChange={handleChange}></textarea>
                <div className="">
                    <button className="recipeformbutton" type="submit">
                        Add Recipe
                    </button>

                </div>
            </form>
            <button onClick={uploadImage}>
                Add Recipe
            </button>
        </div>
    );
}

export default RecipeForm;