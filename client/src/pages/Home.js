import { useQuery } from '@apollo/client';
import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries';

const Home = () => {

  // THESE NEXT LINES SHOULD BE ABLE TO GET 10 RANDOMLY GENERATED USER
  // CREATED RECIPES TO DISPLAY ON THE HOMEPAGE
  // THIS WILL RANDOMLY PICK 10 RANDOM RECIPES MADE BY USERS TO SHOW ON THE HOMEPAGE
  // THIS ACTS AS A TEASER OR A SAMPLE
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
  };
  // console.log("new");
  // console.log(uniqueRecipes);
  

  return (
    <div className="homepage">
      <div className="userrecipes">
        {uniqueRecipes.map((recipe) => (
          <div key={ recipe._id } className="recipepost">
            <Link to={`/recipes/${ recipe._id }`}>
              <h3>{ recipe.title }</h3>
              <p>Servings: { recipe.servings }</p>
              <p>Total Cook Time: { recipe.totalTime } mins</p>
              <p>Chef: { recipe.postAuthor }</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
