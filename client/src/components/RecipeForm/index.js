import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_MYPROFILE } from '../../utils/queries';

import Auth from '../../utils/auth';

const RecipeForm = () => {

    const [newRecipe, setNewRecipe] = useState({
        title: '',
        servings: '',
        totalTime: '',
        ingredients: [''],
        directions: [''],
    });

    console.log("hi");

    console.log(newRecipe);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "title") {
            setNewRecipe((prevState) => ({

                ...prevState,
                title: value,
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
            let testingredientsarray = value.split(".");
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
            let testdirectionsarray = value.split(".");
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
        console.log("auth");
        console.log(Auth.getProfile().data);

        try {
            const { data } = await addRecipe({
                variables: { 
                    ...newRecipe, 
                    postAuthor: Auth.getProfile().data.email,
                },
            });

            setNewRecipe({
                title: '',
                servings: '',
                totalTime: '',
                ingredients: '',
                directions: '',
            });
            
            // Auth.login(data.addRecipe)
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className="recipeformsection">
            <form onSubmit={handleSubmit} className="recipeform">
                <input placeholder="Recipe Name" name="title" onChange={handleChange}></input>
                <input placeholder="Servings" name="servings" onChange={handleChange}></input>
                <input placeholder="Total Time to Cook" name="totalTime" onChange={handleChange}></input>
                <textarea placeholder="Ingredients" name="ingredients" onChange={handleChange}></textarea>
                <textarea placeholder="Instructions" name="directions" onChange={handleChange}></textarea>
                <div className="">
                    <button className ="recipeformbutton" type="submit">
                        Add Recipe
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RecipeForm;