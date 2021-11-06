import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_RECIPE } from '../utils/queries';


const SingleRecipe = () => {
    const { recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });

    const recipe = data?.recipe || {};

    console.log("for single recipes " + recipe)

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="singlerecipepage">
            <h1>HI</h1>
        </div>
    );
};

export default SingleRecipe;