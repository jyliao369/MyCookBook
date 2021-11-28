import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../utils/mutations';
import { QUERY_SINGLE_RECIPE } from '../utils/queries';
import { QUERY_MYPROFILE } from '../utils/queries';

import { Image } from 'cloudinary-react';

import Auth from '../utils/auth';

// MUI COMPONENTS
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const SingleRecipe = () => {
    const { recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });
    const recipe = data?.recipe || {};
    console.log(recipe)
    console.log(recipe.title);

    // THIS SHOULD, ON PAPER ADD THE CURRENT OBJECT WHICH IS THE 'recipe'
    // FROM ABOVE AND ADD TO THE USER THAT IS CURRENTLY LOGGED. THAT'S WHAT THE
    // BELOW CODE SHOULD DO

    // const [ addedrecipe , setAddedrecipe ] = useState({
    //     title: 'hello'
    // });
    // console.log("testing");
    // console.log(addedrecipe);

    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {

            const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
            cache.writeQuery({
                query: QUERY_MYPROFILE,
                data: { myprofile: {
                    ...myprofile,
                    recipes: [ ...myprofile.recipes, addRecipe]
                }},
            });
        },
    });

    const handleAddto = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addRecipe({
                variables: {
                    ...recipe,
                }
            });

            console.log("success");
        } catch (err) {
            console.log("it didnt work");
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Box sx={{ background: '#161925' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3}}>
                    <Grid item xs={12} md={8}>
                    <Paper sx={{p: 2}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: 325 }}>
                                { recipe.imageid ? ( 
                                    <Image width='100%' cloudName="du119g90a" public_id={recipe.imageid} />
                                ) : (
                                    <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"/>
                                )}
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', pl: 3, pr: 2.5, width: 325 }}>
                                <Typography sx={{ fontSize: 25 }}>{ recipe.title }</Typography>
                                <br />
                                <Typography sx={{ fontSize: 20 }}>Category: { recipe.category }</Typography>
                                <Typography sx={{ fontSize: 20 }}>Servings: { recipe.servings }</Typography>
                                <Typography sx={{ fontSize: 20 }}>Total Cook Time: { recipe.totalTime } mins</Typography>
                                <Typography sx={{ fontSize: 20 }}>Cuisine: { recipe.cuisine }</Typography>
                                <Typography sx={{ fontSize: 20 }}>Diet: { recipe.diettype }</Typography>
                            </Box>  
                        </Box>
                        
                        <br/>

                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
                            <Box sx={{ width: 343, p: 1}}>
                                <Typography sx={{ fontSize: 30 }}>Ingredients</Typography>
                                {recipe.ingredients.map((ingredient) => (
                                    <Typography sx={{ fontSize: 18, p: 0.7 }}>{ingredient}</Typography>
                                ))}
                            </Box>

                            <br></br>
                            
                            <Box sx={{width: 350, p: 1 }}>
                                <Typography sx={{ fontSize: 30 }}>Directions</Typography>
                                {recipe.directions.map((direction) => (
                                    <Typography sx={{ fontSize: 15, p: 0.7}}>{direction}</Typography>
                                ))}
                            </Box>
                        </Box>
                        {Auth.loggedIn() ? ( 
                            <>
                                <Box>
                                    <Button onClick={handleAddto} variant="contained" color="error">
                                        <Typography sx={{ color: 'white', fontSize: 20 }}>Add to Cookbook</Typography>
                                    </Button>
                                </Box>
                            </>
                        ) : ( 
                            <>
                            </>
                        )}
                    </Paper>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default SingleRecipe;