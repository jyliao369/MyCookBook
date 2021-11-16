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
                            <div className="deletebutton">
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
                </div>
            </div>         
    );
    

};

export default Profile;