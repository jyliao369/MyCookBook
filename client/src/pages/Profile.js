import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RecipeForm from '../components/RecipeForm';

import { QUERY_SINGLE_USER, QUERY_MYPROFILE } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {
    const { userId } = useParams();

    const { loading, data } = useQuery(
        userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
        {
            variables: { userId: userId },
        }
    );
    
    const user = data?.myprofile || data?.user || {};
    const recipes = user.recipes;

    if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
        return <Redirect to="/myprofile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see your profile page. Use the navigation
            links above to sign up or log in!
          </h4>
        );
    }

    let testsample = "An ambulance takes Perry away, and the police demand Lori's help to catch Max. Later that night, Max returns and kills the officers watching the house. In an attempt to get him back, Jarret kidnaps Lori and Spike in hopes that Max will follow them to the EMAX building which he does. She first discovers him in the laboratory. Max relinquishes his aggressive, homicidal nature and begins to kiss Lori's hand. Jarret shoots Max with a shotgun before being knocked onto a large electrical cage, which kills him. Lori pets Max's head as he dies."

    let result = testsample.split(". ");

    const sentencearray = [];

    console.log(result.length)

    for (let a = 0; a < result.length; a++) {
        sentencearray.push(result[a]);
    };

    console.log(sentencearray);


    return (
            <div className="userprofile">
                <div className="usersrecipes">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="recipes">
                            <div className="recipeinfo">
                                <h3>{ recipe.title }</h3>
                                <p>Servings: { recipe.servings }</p>
                                <p>Total Time: { recipe.totalTime }</p>
                            </div>
                            <div className="ingredientslist">
                                {recipe.ingredients.map((ingredient) => (
                                    <p>{ ingredient }</p>
                                ))}    
                            </div>
                            <div className="directionlist">
                                {recipe.directions.map((direction) => (
                                    <p>{ direction }</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <RecipeForm />

            </div>         
    );
    

};

export default Profile;