import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_RECIPE = gql`
    mutation addRecipe($title:String!, $cuisine:String!, $diettype:String!, $category:String!, $servings:String!, $totalTime:String!, $ingredients:[String]!, $directions:[String]!, $imageid:String ) {
        addRecipe(title:$title, cuisine:$cuisine, diettype:$diettype, category:$category, servings:$servings, totalTime:$totalTime, ingredients:$ingredients, directions:$directions, imageid:$imageid) {
            title
            cuisine
            diettype
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

export const REMOVE_RECIPE = gql`
    mutation removeRecipe($recipeId: String!) {
        removeRecipe(recipeId: $recipeId) {
            _id
            title
            cuisine
            diettype
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

export const UPDATE_RECIPE = gql`
    mutation updateRecipe($recipeId: String!, $title: String, $cuisine: String, $diettype: String, $category: String, $servings: String, $totalTime: String, $ingredients: [String], $directions: [String], $imageid: String) {
        updateRecipe(recipeId:$recipeId, title:$title, cuisine:$cuisine, diettype:$diettype, category:$category, servings:$servings, totalTime:$totalTime, ingredients:$ingredients, directions:$directions, imageid:$imageid) {
            _id
            title
            cuisine
            diettype
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