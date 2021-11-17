import { useQuery } from '@apollo/client';
import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Image } from 'cloudinary-react';
// import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries';

// THESE ARE FOR THE MUI COMPONENTS
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

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
  const entrees = [];
  const entreesnum = 4;
  const desserts = [];
  const desnum = 5;
  for (let a = 0; a < uniqueRecipes.length; a++) {
    if (uniqueRecipes[a].category === "Drinks" && drinks.length < drinknum) {
      drinks.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Appetizer" && appetizers.length < appnum) {
      appetizers.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Entres" && entrees.length < entreesnum) {
      entrees.push(uniqueRecipes[a])
    }if (uniqueRecipes[a].category === "Dessert" && desserts.length < desnum) {
      desserts.push(uniqueRecipes[a])
    }
  }


  
  return (
    <div className="homepage">
      
      {/* THIS IS FOR THE DRINKS */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around'}}>
        {drinks.map((drink) => (
          <Card sx={{ width: 400, height: 250, m: 1/4, display: 'flex', alignItems: 'center' }}>
            <Link to={`/recipes/${ drink._id }`}>
              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                <CardMedia sx={{ width: 250, p:0.5 }}>
                  {drink.imageid ? (
                    <Image 
                      width='100%'
                      cloudName="du119g90a"
                      public_id={ drink.imageid }
                    />
                  ) : (
                    <Image 
                    cloudName="du119g90a"
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                  )}
                </CardMedia>
                <CardHeader
                  title={drink.title}
                />
              </Box>
            </Link>
          </Card>
        ))}
      </Box>

      <br /><br /><br /><br />

      {/* THIS IS FOR THE ENTREES  AND FOR APPETIZERS IN THEIR OWN BOXES*/}
      <Box sx={{ display: 'flex'}}>
        {/* THIS IS FOR APPETIZERS */}
        {/* <h1>Appetizers</h1> */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: 1/2, mr: 25/2 }}>
          {appetizers.map((appetizer) => (
          <Card sx={{ width: 2/5, p: 1/2, m: 1/2 }}>
            <Link to={`/recipes/${ appetizer._id }`}>
              <CardMedia>
                {appetizer.imageid ? (
                  <Image
                    width="100%" 
                    cloudName="du119g90a" 
                    public_id={ appetizer.imageid }
                  />
                ) : ( 
                  <Image 
                    width="100%"
                    cloudName="du119g90a" 
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                )}
              </CardMedia>
              <CardHeader 
                title={ appetizer.title }
              />
            </Link>
          </Card>
          ))}
        </Box>

        {/* THIS IS FOR ENTREE */}
        {/* <h1>Entrees</h1> */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: 1/2, ml: 25/2 }}>
          {entrees.map((entree) => (
            <Card sx={{ width: 2/5, p: 1/2, m: 1/2 }}>
              <CardMedia>
                {entree.imageid ? (
                  <Image
                    width="100%" 
                    cloudName="du119g90a" 
                    public_id={ entree.imageid }
                  />
                ) : ( 
                  <Image 
                    width="100%"
                    cloudName="du119g90a" 
                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                )}
              </CardMedia>
              <CardHeader 
                title={ entree.title }
              />
            </Card>
          ))}
        </Box>
      </Box>

      <br /><br /><br /><br />
      
      {/* THIS IS FOR THE DESSERTS*/}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        {desserts.map((dessert) => (
          <Card sx={{ width: 1.1/5, height: 230, m: 2, mr: 3, ml: 3, display: 'flex', alignItems: 'center' }}>
            <Link to={`/recipes/${ dessert._id }`}>
              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                <CardMedia sx={{ width: 250, p:1.5 }}>
                  {dessert.imageid ? (
                    <Image 
                      width='100%'
                      cloudName="du119g90a"
                      public_id={ dessert.imageid }
                    />
                  ) : (
                    <Image
                      width='100%' 
                      cloudName="du119g90a"
                      public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                  />
                  )}
                </CardMedia>
                <CardHeader
                  title={dessert.title}
                />
              </Box>
            </Link>
          </Card>
        ))}
      </Box>


      <div className="userrecipes">
        {/* <div className="drinkstease">
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
        </div> */}

        {/* <div className="seperators"></div>

        <div className="entrestease">
          {entrees.map((entree) => (
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
        </div> */}

        {/* <div className="seperators"></div> */}

        {/* <div className="desserttease">
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
        </div> */}
      </div>
  

    </div>
  );
};

export default Home;
