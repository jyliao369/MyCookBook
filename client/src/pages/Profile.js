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

const Profile = () => {

    useEffect(() => {
    }, []);

    const { userId } = useParams();
    const { loading, data } = useQuery(
        userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
        {
            variables: { userId: userId },
        }
    );
    const user = data?.myprofile || data?.user || {};
    const recipes = user.recipes;
    // console.log(user);
    // console.log("hi");
    // console.log(recipes);
    
    // THESE NEXT LINES OF CODE SHOULD BE ABLE TO DELETE ANY RECIPES WITHIN
    // THE PROFILE PAGE WHICH MEANS ANY RECIPE HELD IN THE USERS RECIPES ARRAY
    // THIS TECHNICALLY SHOULD'T DELETE ANY DUPLICATES OR WHEN A USER ADDS ANOTHER
    // USERS RECIPE OR BASIALLY IT WONT DELETE THE ORIGINAL POST... I THINK
    const [ removeRecipe ] = useMutation(REMOVE_RECIPE);
    // const [ recipeId, setRecipeID ] = useState('');

    const handleDelete = async (event) => {
        event.preventDefault();
        let recipeId = event.target.id;
        console.log( recipeId );
        console.log( typeof recipeId );

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
    }

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
                <div className="usersrecipes">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="recipes">

                            <Image cloudName="du119g90a" public_id={ recipe.imageid }/>
                            
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
                        <div className="deletebutton">
                            <button id={recipe._id} onClick={handleDelete}>Remove</button>                            
                        </div>
                        </div>
                    ))}
                </div>
            </div>         
    );
    

};

export default Profile;