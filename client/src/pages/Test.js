import React from 'react';

// MUI COMPONENTS FOR CARDS
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import TextField from '@mui/material/TextField';

import { QUERY_RECIPES } from '../utils/queries';
import { useQuery } from '@apollo/client';

// CLOUDINDARY MODULES AND STUFF
import { Image } from 'cloudinary-react';

const Test = () => {

    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];

    console.log(recipes);

    return (
        <div>
            <div>
                {recipes.map((recipe) => (
                    <Card sx={{ maxWidth: 250 }}>
                        <CardHeader
                            title={recipe.title}
                            subheader={recipe.createdAt}
                        ></CardHeader>
                        <CardMedia 
                            component="img"
                            height="150"
                            image=""
                            alt=""
                        ></CardMedia>
                        <CardContent>
                            <Typography>
                                {recipe.category}
                                <br/>
                                {recipe.servings}
                                {recipe.totalTime}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <br/>
            <div>
                {recipes.map((recipe) => (
                    <Card sx={{ maxWidth: 300, display: "flex" }}>
                        <Box>
                            <CardHeader
                                title={recipe.title}
                                subheader={recipe.createdAt}
                            ></CardHeader>
                            <CardContent>
                                <Typography>
                                    {recipe.category}
                                    {recipe.servings}
                                    {recipe.totalTime}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia 
                            component="img"
                            height="150"
                            image=""
                            alt=""
                        ></CardMedia>
                    </Card>
                ))}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {/* CREATING THE LOGIN AND SIGNUP FORM */}
            <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="********" variant="outlined"/>
                </Box>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                <h1>Hello</h1>
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="********" variant="outlined"/>
                </Box>
            </div>
        </div>
    );
};

export default Test;