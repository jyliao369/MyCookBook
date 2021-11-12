import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query allUsers {
        users {
            _id
            username
            email
        }
    }
`;

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            recipes {
                _id
                title
                category
                servings
                totalTime
                ingredients
                directions
                imageid
                createdAt
                postAuthor
            }
        }
    }
`;

export const QUERY_MYPROFILE = gql`
    query myprofile {
        myprofile{
            _id
            username
            email
            recipes {
                _id
                title
                category
                servings
                totalTime
                ingredients
                directions
                imageid
                createdAt
                postAuthor
            }
        }
    }
`;

export const QUERY_RECIPES = gql`
    query getRecipes {
        recipes {
            _id
            title
            category
            servings
            totalTime
            ingredients
            directions
            imageid
            createdAt
            postAuthor
        }
    }
`;

export const QUERY_SINGLE_RECIPE = gql`
    query getSingleRecipe($recipeId: ID!) {
        recipe(recipeId: $recipeId) {
            _id
            title
            category
            servings
            totalTime
            ingredients
            directions
            imageid
            createdAt
            postAuthor
        }
    }
`;
