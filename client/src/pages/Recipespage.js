import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Masonry from 'react-masonry-css';

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
import Button from '@mui/material/Button';

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
    }, [recipes]);

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


    const breakpoints = {
        default: 4,
        700: 1
    }

    if (loading) {
        return <h1>Loading</h1>
    }

    return (
        <Box>
            <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 35, fontWeight: 'bold', position: 'absolute', background: 'white', p: 1.5, color: 'primary.dark', border:2, borderRadius: 10 }}>ALL DRINKS and RECIPES</Typography>
                <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/c_scale,h_720,w_1270/v1637260922/headerimage1_abzfej.jpg"/>
            </Grid>
            <Grid sx={{ background: '#F1FFFA', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', pt: 1, pb: 1 }}>
                <Button variant="contained" onClick={handleShowAll} color="info" sx={{ fontSize: 13, m: 1}}>Show All</Button>
                <Button variant="contained" value="Drinks" onClick={handlefilter} sx={{ fontSize: 13, m: 1}}>Drinks</Button>
                <Button variant="contained" value="Appetizer" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Appetizers</Button>
                <Button variant="contained" value="Entree" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Entrees</Button>
                <Button variant="contained" value="Dessert" onClick={handlefilter} sx={{ fontSize: 13, m: 1 }}>Desserts</Button>
            </Grid>

            {/* <Box sx={{ background: '#364156', display: 'flex', justifyContent: 'center', pt: 3, pb: 3 }}>
                <Grid item xs={12} md={8.5} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    <Masonry
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                    {recipeslist.map((recipe) => (
                        <Grid item xs={11} md={2.4} sx={{ p: 1 }}>
                            <Card>
                                <Link to={`/recipes/${ recipe._id }`}>
                                    <Grid>
                                        <CardHeader
                                            titleTypographyProps={{
                                                fontSize: 20
                                            }}
                                            subheaderTypographyProps={{
                                                fontSize: 15
                                            }}
                                            title={ recipe.title }
                                            subheader={ recipe.createdAt }
                                        />
                                        <CardMedia sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
                                            { recipe.imageid ? (
                                                <Image
                                                    width="100%"
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
                                            <Typography sx={{ fontSize: 18 }}>Category: { recipe.category }</Typography>
                                            <Typography sx={{ fontSize: 18 }}>Cuisine: { recipe.cuisine }</Typography>
                                            <Typography sx={{ fontSize: 18 }}>Diet: { recipe.diettype }</Typography>
                                            <Typography sx={{ fontSize: 18 }}>Servings: { recipe.servings } </Typography>
                                            <Typography sx={{ fontSize: 18 }}>Total Time: { recipe.totalTime }</Typography>
                                        </CardContent>
                                    </Grid>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                    </Masonry>
                </Grid>
            </Box> */}

            <Box sx={{ background: '#364156', display: 'flex', justifyContent: 'center', pt: 3, pb: 3 }}>
                <Grid item md={8}>
                    <Masonry
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {recipeslist.map((recipe) => (
                            <Grid item sx={{ m: 2 }}>
                                <Card
                                    elevation={3}
                                >
                                    <Link to={`/recipes/${ recipe._id }`}>
                                        <Grid>
                                            <CardHeader
                                                titleTypographyProps={{
                                                    fontSize: 20
                                                }}
                                                subheaderTypographyProps={{
                                                    fontSize: 15
                                                }}
                                                title={ recipe.title }
                                                subheader={ recipe.createdAt }
                                            />
                                            <CardMedia sx={{ ml: 2, mr: 2, mt: 0.5, mb: 0.5, display: 'flex', borderStyle: 'solid', borderWidth: 4, borderColor: '#373F51' }}>
                                                { recipe.imageid ? (
                                                    <Image
                                                        width="100%"
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
                                            <CardContent sx={{ ml: 0.5, mr: 0.5, mt: 0.5, mb: 0.5, display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ fontSize: 18 }}>Category: { recipe.category }</Typography>
                                                <Typography sx={{ fontSize: 18 }}>Cuisine: { recipe.cuisine }</Typography>
                                                <Typography sx={{ fontSize: 18 }}>Diet: { recipe.diettype }</Typography>
                                                <Typography sx={{ fontSize: 18 }}>Servings: { recipe.servings } </Typography>
                                                <Typography sx={{ fontSize: 18 }}>Total Time: { recipe.totalTime }</Typography>
                                            </CardContent>
                                        </Grid>
                                    </Link>
                                </Card>
                            </Grid>
                        ))}
                    </Masonry>
                </Grid>
            </Box>


            
        </Box>
    );
        
}

export default Recipespage;