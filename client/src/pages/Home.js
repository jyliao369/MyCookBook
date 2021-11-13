import { useQuery } from '@apollo/client';
import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Image } from 'cloudinary-react';
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
  console.log(uniqueRecipes);

  // THESE ARRAYS SHOULD HOLD RECIPES BASED ON THE CATEGORY
  // THINK OF IT LIKE AN FILTERING
  const drinks = [];
  const appetizers =[];
  const entres = [];
  const desserts = [];
  for (let a = 0; a < uniqueRecipes.length; a++) {
    if (uniqueRecipes[a].category === "Drinks") {
      drinks.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Appetizer") {
      appetizers.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Entres") {
      entres.push(uniqueRecipes[a])
    }if (uniqueRecipes[a].category === "Dessert") {
      desserts.push(uniqueRecipes[a])
    }
  }

  const teaserdrinks = [];
  const teaserentres = [];
  const teaseappetizers = [];
  const teaserdesserts = [];
  for (let b = 0; b < 3; b++) {
    teaserdrinks.push(drinks[b])
  }
  for (let b = 0; b < 2; b++) {
    teaserentres.push(entres[b])
  }
  for (let b = 0; b < 2; b++) {
    teaseappetizers.push(appetizers[b])
  }
  for (let b = 0; b < 3; b++) {
    teaserdesserts.push(desserts[b])
  }
  console.log("a");
  console.log(teaserdrinks);
  console.log("b");
  console.log(teaserentres);
  console.log("c");
  console.log(teaseappetizers);
  console.log("d");
  console.log(teaserdesserts);


  
  return (
    <div className="homepage">
      <div className="userrecipes">
        {uniqueRecipes.map((recipe) => (
          <div key={ recipe._id } className="recipepost">
            { recipe.imageid ? (
              <Image cloudName="du119g90a" public_id={ recipe.imageid } />
            ) : (
              <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg" />
            )}
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
