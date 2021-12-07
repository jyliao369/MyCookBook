import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

import {Link} from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries';

import { Image } from 'cloudinary-react';

// THESE ARE FOR THE MUI COMPONENTS
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';

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
  const drinknum = 5;
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
    if (uniqueRecipes[a].category === "Entree" && entrees.length < entreesnum) {
      entrees.push(uniqueRecipes[a])
    }
    if (uniqueRecipes[a].category === "Dessert" && desserts.length < desnum) {
      desserts.push(uniqueRecipes[a])
    }
  }


  
  return (
    <div>
      <Box sx={{ background: '#406e8e' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{ fontSize: 35, fontWeight: 'bold', position: 'absolute', background: '#cbf7ed', p: 3, color: 'primary.dark', border:1, borderRadius: 10 }}>Welcome to mmm!Book!!</Typography>
          <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/c_scale,h_720,w_1270/v1637261149/headerimage0_djjzmj.jpg"/>
        </Box>
        {/* THIS IS FOR DRINKS */}
        <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: 2 }}>
          {drinks.map((drink) => (
            <Grid item xs={12} sm={6} lg={3.5}>
              <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 225}}>
                <Link to={`/recipes/${ drink._id }`}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CardMedia sx={{ width: 150, p:1, pl: 3 }}>
                      {drink.imageid ? (
                        <Image 
                          width='100%'
                          cloudName="du119g90a"
                          public_id={ drink.imageid }
                        />
                      ) : (
                        <Image 
                          width='100%' 
                          cloudName="du119g90a"
                          public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                        />
                      )}
                    </CardMedia>
                    <Box sx={{ p:2 }}>
                      <Typography sx={{ fontSize: 20 }}>
                        {drink.title}
                      </Typography>
                      <br/>
                      <Typography sx={{ fontSize: 15 }}>
                        Category: {drink.category}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Cuisine: {drink.cuisine}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Diet: {drink.diettype}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Servings: {drink.servings}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Total Cook Time: {drink.totalTime} min
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      
        <br /><br />
        
        {/* THIS IS FOR THE APPETIZERS*/}
        <Grid container spacing={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} xs={12}>
            {appetizers.map((appetizer) => (
              <Grid item>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300, height: 450}}>
                  <Link to={`/recipes/${ appetizer._id }`}>
                    <CardMedia sx={{ p: 2 }}>
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
                    <Box sx={{ p:2, pl: 2.5, pr: 2.5 }}>
                        <Typography sx={{ fontSize: 20 }}>
                          {appetizer.title}
                        </Typography>
                        <br/>
                        <Typography sx={{ fontSize: 15 }}>
                          Category {appetizer.category}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Cuisine: {appetizer.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Diet: {appetizer.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Servings: {appetizer.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Total Cook Time: {appetizer.totalTime} min
                        </Typography>
                      </Box>
                  </Link>
                </Card>
              </Grid>
            ))}
        </Grid>

        <br /><br />
          
        {/* THIS IS FOR THE ENTREES*/}
        <Grid container spacing={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} xs={12}>
            {entrees.map((entree) => (
              <Grid item>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300, height: 450}}>
                  <Link to={`/recipes/${ entree._id }`}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <CardMedia sx={{ p: 2 }}>
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
                      <Box sx={{ p:2, pl: 2.5, pr: 2.5 }}>
                        <Typography sx={{ fontSize: 20 }}>
                          {entree.title}
                        </Typography>
                        <br/>
                        <Typography sx={{ fontSize: 15 }}>
                          Category {entree.category}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Cuisine: {entree.cuisine}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Diet: {entree.diettype}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Servings: {entree.servings}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }}>
                          Total Cook Time: {entree.totalTime} min
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Card>
              </Grid>
            ))}
        </Grid>
        
        <br /><br />
        
        {/* THIS IS FOR THE DESSERTS*/}
        <Grid container spacing={5} sx={{ p:2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {desserts.map((dessert) => (
            <Grid item xs={12} sm={6} lg={3.5}>
              <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 250}}>
                <Link to={`/recipes/${ dessert._id }`}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <CardMedia sx={{ width: 150, p:1, pl: 3 }}>
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
                    <Box sx={{ p:2 }}>
                      <Typography sx={{ fontSize: 20 }}>
                        {dessert.title}
                      </Typography>
                      <br/>
                      <Typography sx={{ fontSize: 15 }}>
                        Category {dessert.category}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Cuisine: {dessert.cuisine}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Diet: {dessert.diettype}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Servings: {dessert.servings}
                      </Typography>
                      <Typography sx={{ fontSize: 15 }}>
                        Total Cook Time: {dessert.totalTime} min
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
