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
  const drinknum = 4;
  const appetizers =[];
  const appnum = 4;
  const entres = [];
  const entresnum = 4;
  const desserts = [];
  const desnum = 5;
  for (let a = 0; a < uniqueRecipes.length; a++) {
    if (uniqueRecipes[a].category === "Drinks" && drinks.length < drinknum) {
      drinks.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Appetizer" && appetizers.length < appnum) {
      appetizers.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Entres" && entres.length < entresnum) {
      entres.push(uniqueRecipes[a])
    }if (uniqueRecipes[a].category === "Dessert" && desserts.length < desnum) {
      desserts.push(uniqueRecipes[a])
    }
  }


  
  return (
    <div className="homepage">
      <div className="userrecipes">
        <div>

        </div>
        <div className="drinkstease">
          {drinks.map((drink) => (
            <div key={ drink._id } className="recipepost">
              { drink.imageid ? (
                <Image cloudName="du119g90a" public_id={ drink.imageid } />
              ) : (
                <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg" />
              )}
              <Link to={`/recipes/${ drink._id }`}>
                <h3>{ drink.title }</h3>
                <p>Servings: { drink.servings }</p>
                <p>Total Time: { drink.totalTime } mins</p>
                <p>Chef: { drink.postAuthor }</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="seperators"></div>

        <div className="entrestease">
          {entres.map((recipe) => (
            <div key={ recipe._id } className="recipepost">
              { recipe.imageid ? (
                <Image cloudName="du119g90a" public_id={ recipe.imageid } />
              ) : (
                <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg" />
              )}
              <Link to={`/recipes/${ recipe._id }`}>
                <h3>{ recipe.title }</h3>
                <p>Servings: { recipe.servings }</p>
                <p>Total Time: { recipe.totalTime } mins</p>
                <p>Chef: { recipe.postAuthor }</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="seperators"></div>

        <div className="desserttease">
          {desserts.map((dessert) => (
            <div key={ dessert._id } className="recipepost">
              { dessert.imageid ? (
                <Image cloudName="du119g90a" public_id={ dessert.imageid } />
              ) : (
                <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg" />
              )}
              <Link to={`/recipes/${ dessert._id }`}>
                <h3>{ dessert.title }</h3>
                <p>Servings: { dessert.servings }</p>
                <p>Total Time: { dessert.totalTime } mins</p>
                <p>Chef: { dessert.postAuthor }</p>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
