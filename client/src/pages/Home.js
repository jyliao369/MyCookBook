import { useQuery } from '@apollo/client';
import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import ProfileList from '../components/ProfileList';
import { QUERY_RECIPES } from '../utils/queries';

const Home = () => {

  // THESE NEXT CODES OF LINE SHOULD BE ABLE TO GET ABOUT 10 RANDOMLY
  // SELECTED RECIPES FROM AN API AND PRESENTED
  // const APP_ID = "b2a265ec";
  // const APP_KEY = "a8ce17e2a55b2d4b2d802b1792fb480d";

  // const [APIrecipes, setRecipes]  = useState([]);
  // const [randrecipe, setRandom] = useState([]);

  // useEffect(() => {
  //   getRecipes();
  //   getRandRecipes();
  // },);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=random&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=100`);
  //   const data = await response.json();
  //   setRecipes(data.hits);
  // };

  // const getRandRecipes = async () => {
  //   let list = [];
  //   for (let a = 0; a < 10; a++) {
  //     list.push(APIrecipes[Math.floor(Math.random()*100)]);
  //   }
  //   setRandom(list);
  // };

  // THESE NEXT LINES SHOULD BE ABLE TO GET 10 RANDOMLY GENERATED USER
  // CREATED RECIPES TO DISPLAY ON THE HOMEPAGE
  // THIS WILL RANDOMLY PICK 10 RANDOM RECIPES MADE BY USERS TO SHOW ON THE HOMEPAGE
  // THIS ACTS AS A TEASER OR A SAMPLE
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];
  const randRecipe = [];

  const test = recipes.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) === index;
  });
  
  console.log(test);

  for (let a = 0; a < 5; a++) {
    randRecipe.push(recipes[Math.floor(Math.random() * recipes.length)]);
  }
  // console.log(randRecipe);
  

  return (
    <div className="homepage">
      {/* <div className="onlinerecipes">
        {randRecipe.map((recipe) => (
          <div key={recipe._id} className="recipepost">
            <Link to={`/recipes/${recipe._id}`}>
              <p>{ recipe.title }</p>
              <p>Servings: { recipe.servings } </p>
              <p>Total Cook Time: { recipe.totalTime }</p>
            </Link>
          </div>
        ))} 
      </div> */}
      <div className="userrecipes">
        {recipes.map((recipe) => (
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
