import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries';

// IMPORTANT FOR CLOUDINARY
// import Axios from 'axios';
import { Image } from 'cloudinary-react';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import { Collapse } from '@mui/material';

const Recipespage = () => {
    // THIS GRABS THE RECIPES CREATED BY THE USER OR AT LEAST IS MADE
    // BY THE USER
    const { loading, data } = useQuery(QUERY_RECIPES);
    let recipes = data?.recipes || {};

    // THESE SETS OF CODE SHOULD BE ABLE TO TAKE THE RECIPES SECTION AND
    // CREATE A A NEW RECIPE ARRAY THAT HAS NO DUPLICATES BASED ON THE TITLE
    // THIS CAN RAISE ANOTHER PROBLEM IF TITLES ARE THE SAME BUT ID IS NOT
    let uniqueRecipes = [];
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
     // console.log("uniqueRecipes");
    // console.log(uniqueRecipes);

    const [ recipeslist, setRecipeslist ] = useState(['']);

    useEffect(() => {
        setRecipeslist(uniqueRecipes)
    }, []);
    console.log("recipeslist");
    console.log(recipeslist);

    let filtered = [];
    const handlefilter = async (event) => {
        let recipecategory = event.target.value;
        console.log(recipecategory);
        filtered = uniqueRecipes.filter(recipe => recipe.category === recipecategory)

        setRecipeslist(filtered);
        // event.preventDefault();
        // console.log(event.target.value);

        // for (let a = 0; a < uniqueRecipes.length; a++) {
        //     if (uniqueRecipes[a].category === event.target.value) {
        //         filtered.push(uniqueRecipes[a]);
        //         console.log("test");
        //         console.log(filtered);
        //     }
        // }
        // console.log("test");
        // console.log(filtered);
        // setRecipeslist(filtered);
    }
    // console.log("testlist");
    // console.log(filtered);
    // console.log("newrecipelist");
    // console.log(recipeslist);

    const handleShowAll = async () => {
        setRecipeslist(uniqueRecipes);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography sx={{ fontSize: 55, fontWeight: 'bold', position: 'absolute', background: 'white', p: 3, color: 'primary.dark', border:1, borderRadius: 10 }}>ALL DRINKS and RECIPES</Typography>
                <Image height='800' width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/c_scale,h_720,w_1270/v1637260922/headerimage1_abzfej.jpg"/>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p:1, background: '#456990'}}>
                <Button variant="contained" onClick={handleShowAll} color="info" sx={{ fontSize: 13, m: 1}}>Show All</Button>
                <Button variant="contained" value="Drinks" onClick={handlefilter} sx={{ fontSize: 13, m: 1}}>Drinks</Button>
                <Button variant="contained" value="Appetizer" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Appetizers</Button>
                <Button variant="contained" value="Entree" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Entrees</Button>
                <Button variant="contained" value="Dessert" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Desserts</Button>
            </Box>
            
            <Box sx={{ background: '#8ea8c3', pt:5, pb:5 }}>
               <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {recipeslist.map((recipe) => (
                        <Grid item>
                            <Card sx={{ width: 300, m: 1, height: 550, display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/recipes/${ recipe._id }`}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <CardHeader
                                            title={ recipe.title }
                                            subheader={ recipe.createdAt }
                                        />
                                        <CardMedia sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
                                            { recipe.imageid ? (
                                                <Image
                                                    width="175"
                                                    cloudName="du119g90a" 
                                                    public_id={ recipe.imageid }
                                                />
                                            ): (
                                                <Image 
                                                    width="100%"
                                                    cloudName="du119g90a" 
                                                    public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"
                                                />
                                            )}
                                        </CardMedia>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 23 }}>Category: { recipe.category }</Typography>
                                            <Typography sx={{ fontSize: 23 }}>Servings: { recipe.servings } </Typography>
                                            <Typography sx={{ fontSize: 23 }}>Total Time: { recipe.totalTime }</Typography>
                                        </CardContent>
                                    </Box>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid> 
            </Box>
            
        </div>
    );
        
}

export default Recipespage;