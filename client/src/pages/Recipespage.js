import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries';

// IMPORTANT FOR CLOUDINARY
// import Axios from 'axios';
import { Image } from 'cloudinary-react';

const Recipespage = () => {
    // THIS GRABS THE RECIPES CREATED BY THE USER OR AT LEAST IS MADE
    // BY THE USER
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];

    // THESE SETS OF CODE SHOULD BE ABLE TO TAKE THE RECIPES SECTION AND
    // CREATE A A NEW RECIPE ARRAY THAT HAS NO DUPLICATES BASED ON THE TITLE
    // THIS CAN RAISE ANOTHER PROBLEM IF TITLES ARE THE SAME BUT ID IS NOT
    const uniqueRecipes = [];
    for (let a = 0; a < recipes.length; a++) {
        let exists = false;
        for (let b = 0; b < uniqueRecipes.length; b++) {
            if (recipes[a].title === uniqueRecipes[b].title) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            uniqueRecipes.push(recipes[a]);
        }
    }
    console.log("uniqueRecipes");
    console.log(uniqueRecipes);
    const [ recipeslist, setRecipeslist ] = useState(uniqueRecipes);
    console.log("recipeslist");
    console.log(recipeslist);

    const test = [];
    const handlefilter = (event) => {
        event.preventDefault();
        console.log(event.target.value);

        for (let a = 0; a < uniqueRecipes.length; a++) {
            if (uniqueRecipes[a].category === event.target.value) {
                test.push(uniqueRecipes[a]);
                console.log("test");
                console.log(test);
            }
        }
        console.log("test");
        console.log(test);
        setRecipeslist(test);
    }
    console.log("testlist");
    console.log(test);
    console.log("newrecipelist");
    console.log(recipeslist);


    return (
        <div className="recipespage">
            <div className="searcharea"> 
                <form className="searchform">
                    <input className="searchbar" type="text"></input>
                    <button className="search-button" type="submit">Search</button>
                </form>
            </div>
            <div className="recipeslist">
                {uniqueRecipes.map((recipe) => (
                    <div key={recipe._id} className="recipecard">
                        { recipe.imageid ? (
                            <Image cloudName="du119g90a" public_id={ recipe.imageid } />
                        ) : (
                            <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg" />
                        )}
                        <Link to={`/recipes/${ recipe._id }`}>
                            <h3>{recipe.title}</h3>
                            <p>Total Servings: {recipe.servings}</p>
                            <p>totalTime: {recipe.totalTime} mins</p>
                            
                            {/* {recipe.recipe.ingredientLines.map((ingredient) => (
                                <div>
                                    {ingredient}
                                </div>
                            ))} */}
                        </Link>
                    </div>
                ))}
            </div>
            <div>
                <button value="Drinks" onClick={handlefilter}>hi</button>
            </div>
        </div>
    )
        
}

export default Recipespage;