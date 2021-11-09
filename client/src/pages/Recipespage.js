import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries';

const Recipespage = () => {

    // // THESE LINE OF CODES SHOULD BE ABLE TO GRAB ALL OF THE RECIPES IN THE API
    // // IMPORTANT INFO, WILL HAVE TO MOVE IT TO SOMEWHERE ELSE
    // const APP_ID = "b2a265ec";
    // const APP_KEY = "a8ce17e2a55b2d4b2d802b1792fb480d";

    // const [recipes, setRecipes]  = useState([]);
    // const [search, setSearch] = useState("");
    // const [query, setQuery] = useState("random")

    // useEffect(() => {
    //     getRecipes();
    // }, [query]);
    // // THIS FUNCTION SHOULD GRAB ALL OF THE RECIPES WITHIN THE API DATABASE
    // const getRecipes = async () => {
    //     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=100`);
    //     const data = await response.json();
    //     setRecipes(data.hits);
    // };
    // const updateSearch = (e) => {
    //     setSearch(e.target.value);
    // };
    // const getSearch = (e) => {
    //     e.preventDefault();
    //     setQuery(search);
    // };

    // THIS GRABS THE RECIPES CREATED BY THE USER OR AT LEAST IS MADE
    // BY THE USER
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];

    // console.log("hi");
    // console.log(recipes);

    return (
        <div className="recipespage">
            <div className="search"> 
                <form className="searchform">
                    <input className="searchbar" type="text"></input>
                    <button className="search-button" type="submit">Search</button>
                </form>
            </div>
            <div className="recipeslist">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="recipecard">
                        <Link to={`/recipes/${ recipe._id }`}>
                            <h2>{recipe.title}</h2>
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
        </div>
    )
        
}

export default Recipespage;