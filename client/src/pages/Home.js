import { useQuery } from '@apollo/client';
import React, {useEffect, useState } from 'react';
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
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  console.log(recipes);

  return (
    <div className="homepage">
      {/* <div className="onlinerecipes">
        {randrecipe.map((recipe) => (
          <div key={recipe._id} className="recipepost">
            <p>{ recipe.recipe.label }</p>
            <p>Servings: { recipe.recipe.yield } </p>
            <p>Total Cook Time: { recipe.recipe.totalTime }</p>
          </div>
        ))} 
      </div> */}
      <div className="userrecipes">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipepost">
            <h3>{ recipe.title }</h3>
            <p>Servings: { recipe.servings }</p>
            <p>Total Cook Time: { recipe.totalTime } mins</p>
            <p>Chef: { recipe.postAuthor }</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
