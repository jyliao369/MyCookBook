import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';

// IMPORTING EVERYTHING FOR QUERIES
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_MYPROFILE } from '../utils/queries';

// IMPORTING EVERYTHING FOR MUTATIONS
import { useMutation } from '@apollo/client';
import { REMOVE_RECIPE } from '../utils/mutations';

// IMPORTANT FOR THE USE OF CLOUDINARY
import { Image } from 'cloudinary-react';

import Auth from '../utils/auth';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import { Collapse } from '@mui/material';

const Profile = () => {

    const { userId } = useParams();
    const { loading, data } = useQuery(
        userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
        {
            variables: { userId: userId },
        }
    );

    let user = data?.myprofile || data?.user || {};
    let recipes = user.recipes;
    
    // console.log(user);
    // console.log(recipes);

    const [ userrecipe, setUserRecipe ] = useState('');
    
    useEffect(() => {
        setUserRecipe(recipes);
    }, [recipes]);
    
    // THESE NEXT LINES OF CODE SHOULD BE ABLE TO DELETE ANY RECIPES WITHIN
    // THE PROFILE PAGE WHICH MEANS ANY RECIPE HELD IN THE USERS RECIPES ARRAY
    // THIS TECHNICALLY SHOULD'T DELETE ANY DUPLICATES OR WHEN A USER ADDS ANOTHER
    // USERS RECIPE OR BASIALLY IT WONT DELETE THE ORIGINAL POST... I THINK
    const [ removeRecipe ] = useMutation(REMOVE_RECIPE);

    const handleFilter = async (event) => {
        let recipecategory = event.target.value;
        let newlist = recipes.filter(recipe => recipe.category === recipecategory)

        setUserRecipe(newlist);
    }

    const handleDelete = async (event) => {
        // event.preventDefault();
        let recipeId = event.target.id;
        // console.log( recipeId );
        // console.log( typeof recipeId );
        let newlist = recipes.filter(recipe => recipe._id !== recipeId);

        try {
            await removeRecipe({
                variables: { recipeId },
            });

            console.log("success recipe removed");

            console.log()
        } catch (e) {
            console.error(e);
            console.log("it didnt work");
        }

        setUserRecipe(newlist);
    }

    const ExpandMore = styled((props) => {
        
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    }));

    const [ expanded, setExpanded ] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
        return <Redirect to="/myprofile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
          <h4 className="profileloggedout">
            You need to be logged in to see your profile page. Use the navigation
            links above to sign up or log in!
          </h4>
        );
    }

    return (
            <div className="userprofilepage">
                {/* <div className="usersrecipes">
                    {userrecipe && userrecipe.map((recipe) => (
                        <div key={recipe._id} className="recipes">
                            { recipe.imageid ? (
                                <Image cloudName="du119g90a" public_id={ recipe.imageid }/>
                            ): (
                                <Image cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"/>
                            )}

                            
                            
                            <Link to={`/recipes/${recipe._id}`}>
                                <h3>{ recipe.title }</h3>
                                <p>Servings: { recipe.servings }</p>
                                <p>Total Time: { recipe.totalTime }</p>
                            </Link>
                        {/* <div className="ingredientslist">
                            {recipe.ingredients.map((ingredient) => (
                                <p>{ ingredient }</p>
                            ))}    
                        </div> */}
                            {/* <div className="deletebutton">
                                <button id={recipe._id} onClick={handleDelete}>Remove</button>                            
                            </div>
                        </div>
                    ))}
                </div>
                <div className="filterbutton">
                    <button value="Drinks" onClick={handleFilter}>Drinks</button>   
                    <button value="Appetizers" onClick={handleFilter}>Appetizers</button>   
                    <button value="Entres" onClick={handleFilter}>Entres</button>     
                    <button value="Dessert" onClick={handleFilter}>Dessert</button>                          
                </div> */}
            
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    {userrecipe && userrecipe.map((recipe) => (
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: 475, p: 1, m: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardHeader 
                                    title={ recipe.title } 
                                    subheader={ recipe.createdAt }
                                    height='100'
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <CardMedia sx={{ width: 250 }}>
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
                                        <Typography>Servings: { recipe.servings } </Typography>
                                        <Typography>Total Time: { recipe.totalTime }</Typography>
                                        <Typography>Category: { recipe.category }</Typography>
                                    </CardContent>
                                    {/* <CardContent>
                                        <Typography paragraph>
                                            Ingredients
                                        </Typography>
                                        { recipe.ingredients.map((ingredient) => (
                                            <Typography sx={{ lineHeight: 'normal', m: 1 }} paragraph>
                                                { ingredient }
                                            </Typography>
                                        ))}
                                    </CardContent> */}
                                </Box>

                                {/* <Box sx={{ width: 175 }}>
                                    <CardContent>
                                        <Typography>Servings: { recipe.servings } </Typography>
                                        <Typography>Total Time: { recipe.totalTime }</Typography>
                                        <Typography>Category: { recipe.category }</Typography>
                                    </CardContent>

                                    <CardContent>
                                        <Typography paragraph>
                                            Ingredients
                                        </Typography>
                                        { recipe.ingredients.map((ingredient) => (
                                            <Typography paragraph>
                                                { ingredient }
                                            </Typography>
                                        ))}
                                    </CardContent>

                                    <CardActions>
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpand}
                                        >
                                        ^
                                        </ExpandMore>
                                    </CardActions>
                                </Box> */}
                            </Box>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        Instructions
                                    </Typography>
                                    { recipe.directions.map((direction) => (
                                        <Typography paragraph>
                                            { direction }
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}

                </Box> 
            </div>   
     
    );
    

};

export default Profile;