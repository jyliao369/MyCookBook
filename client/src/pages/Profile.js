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
import Button from '@mui/material/Button';
import { Collapse } from '@mui/material';


// IMPORTING COMPONENTS

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

    // THIS DOES THE FILTERING
    let newlist = [];
    const handleFilter = async (event) => {
        let recipecategory = event.target.value;
        newlist = recipes.filter(recipe => recipe.category === recipecategory)

        setUserRecipe(newlist);
    }

    const showAll = async () => {
        setUserRecipe(recipes);
    }

    const handleDelete = async (event) => {
        // event.preventDefault();
        let recipeId = event.target.id;
        console.log( recipeId );
        console.log( typeof recipeId );
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

    // THESE CODES ARE FOR THE EXTEND AND COLLAPSE
    const ExpandMore = styled((props) => {
        
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        // marginLeft: 'auto',
        // transition: theme.transitions.create('transform', {
        //   duration: theme.transitions.duration.shortest,
        // }),
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
            <div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 35, fontWeight: 'bold', position: 'absolute', background: 'white', p: 1, color: '#114b5f', border:2, borderRadius: 10 }}>My Cookbook</Typography>
                    <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/c_crop,h_720,w_1270/v1637261536/headerimage4_kwi90d.jpg"/>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: 1 , background: '#114b5f'}}>
                    <Button variant="contained" color="success" sx={{ fontSize: 15, m:1 }} onClick={showAll}>Show All</Button>
                    <Button variant="contained" color="success" sx={{ fontSize: 15, m:1 }} value="Drinks" onClick={handleFilter}>Drinks</Button>
                    <Button variant="contained" color="success" sx={{ fontSize: 15, m:1 }} value="Appetizers" onClick={handleFilter}>Appetizers</Button>
                    <Button variant="contained" color="success" sx={{ fontSize: 15, m:1 }} value="Entree" onClick={handleFilter}>Entree</Button>
                    <Button variant="contained" color="success" sx={{ fontSize: 15, m:1 }} value="Dessert" onClick={handleFilter}>Dessert</Button>
                </Box>
                
                <Box sx={{ background: '#cbf7ed', p:2 }}>
                    {/* THIS SECTION SHOWS ALL OF THE USERS RECIPE THEY HAVE EITHER CREATED OR SAVED */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', pl: 2, pr: 2 }}>
                        {userrecipe && userrecipe.map((recipe) => (
                            <Card sx={{ display: 'flex', flexDirection: 'column', width: 450, p: 1, m: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link to={`/recipes/${ recipe._id }`}>
                                        <Box>
                                            <CardHeader 
                                                title={ recipe.title } 
                                                subheader={ recipe.createdAt }
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                                <CardMedia sx={{ width: 200 }}>
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
                                                    <Typography sx={{ fontSize: 20 }}>Servings: { recipe.servings } </Typography>
                                                    <Typography sx={{ fontSize: 20 }}>Total Time: { recipe.totalTime }</Typography>
                                                    <Typography sx={{ fontSize: 20 }}>Category: { recipe.category }</Typography>
                                                </CardContent>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <IconButton
                                            onClick={handleDelete}
                                        >
                                            <Typography id={recipe._id} sx={{ fontSize: 20 }}>Remove</Typography>
                                        </IconButton>

                                        <Link to={`/update/${recipe._id}`} >
                                            <IconButton>
                                                <Typography sx={{ fontSize: 20 }}>Update</Typography>
                                            </IconButton>
                                        </Link> 

                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpand}
                                        >
                                            <Typography sx={{ fontSize: 20 }}>Instructions</Typography>
                                        </ExpandMore>
                                    </CardActions>
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
                </Box>
            </div>   
     
    );
    

};

export default Profile;