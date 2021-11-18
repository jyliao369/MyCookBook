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
import { typography } from '@mui/system';

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
    }if (uniqueRecipes[a].category === "Dessert" && desserts.length < desnum) {
      desserts.push(uniqueRecipes[a])
    }
  }


  
  return (
    <div className="homepage">

      {/* THIS IS FOR DRINKS */}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {drinks.map((drink) => (
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 200}}>
              <Link to={`/recipes/${ drink._id }`}>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  <CardMedia sx={{ width: 150, p:1 }}>
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
                  <Typography>
                    {drink.title}
                  </Typography>
                </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    
      <br /><br /><br /><br />
      
      {/* THIS IS FOR THE APPETIZERS*/}
      <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} xs={12}>
          {appetizers.map((appetizer) => (
            <Grid item>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300, height: 400}}>
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
                <Typography>
                  {appetizer.title}
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>

      <br /><br />
        
      {/* THIS IS FOR THE ENTREES*/}
      <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} xs={12}>
          {entrees.map((entree) => (
            <Grid item>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300, height: 400}}>
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
                <Typography>
                  {entree.title}
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>
      
      <br /><br /><br /><br />
      
      {/* THIS IS FOR THE DESSERTS*/}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {desserts.map((dessert) => (
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 200}}>
              <Link to={`/recipes/${ dessert._id }`}>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  <CardMedia sx={{ width: 150, p:1 }}>
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
                  <Typography>
                    {dessert.title}
                  </Typography>
                </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
