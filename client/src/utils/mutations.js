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
    mutation addRecipe($title: String!, $servings: String!, $totalTime: String!, $ingredients: [String]!, $directions:[String]!) {
        addRecipe(title: $title, servings: $servings, totalTime: $totalTime, ingredients: $ingredients, directions: $directions) {
            _id
            title
            servings
            totalTime
            ingredients
            directions
            createdAt
            postAuthor
        }
    }
`;
