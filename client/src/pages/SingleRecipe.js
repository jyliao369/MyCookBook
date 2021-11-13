import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../utils/mutations';
import { QUERY_SINGLE_RECIPE, QUERY_MYPROFILE } from '../utils/queries';

import { Image } from 'cloudinary-react';

import Auth from '../utils/auth';

const SingleRecipe = () => {
    const { recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });
    const recipe = data?.recipe || {};
    // console.log(recipe)
    // console.log(recipe.title);

    // THIS SHOULD, ON PAPER ADD THE CURRENT OBJECT WHICH IS THE 'recipe'
    // FROM ABOVE AND ADD TO THE USER THAT IS CURRENTLY LOGGED. THAT'S WHAT THE
    // BELOW CODE SHOULD DO

    // const [ addedrecipe , setAddedrecipe ] = useState({
    //     title: 'hello'
    // });
    // console.log("testing");
    // console.log(addedrecipe);

    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {

            const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
            cache.writeQuery({
                query: QUERY_MYPROFILE,
                data: { myprofile: {
                    ...myprofile,
                    recipes: [ ...myprofile.recipes, addRecipe]
                }},
            });
        },
    });

    const handleAddto = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addRecipe({
                variables: {
                    ...recipe,
                }
            });

            console.log("success");
        } catch (err) {
            console.log("it didnt work");
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="singlerecipepage">
            
            <div>
                <div className="titlecard">
                    <h1>{recipe.title}</h1>
                    {Auth.loggedIn() ? (
                        <>
                            <button onClick={handleAddto} enabled>Add to Cookbook</button>
                        </>
                    ): (
                        <>
                            <button disabled>Add to Cookbook</button>
                        </>
                    )}
                </div>
                <hr/>
                <div className="generalInfo">
                    <p>Category: {recipe.category}</p>
                    <p>Number of Servings: {recipe.servings}</p>
                    <p>Total Cook Time: {recipe.totalTime}</p>
                </div>
                <hr/>
                <div className="middlepart">
                    <div className="ingredientsList">
                        <h1>Ingredients</h1>
                        {recipe.ingredients.map((ingredient) => (
                            <p>{ingredient}</p>
                        ))}
                    </div>
                    <div className="recipeImg">
                        <Image cloudName="du119g90a" public_id={recipe.imageid} />
                    </div>
                </div>
                <hr/>
                <div className="directionsList">
                    <h1>Directions</h1>
                    {recipe.directions.map((direction) => (
                        <p>{direction}</p>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default SingleRecipe;