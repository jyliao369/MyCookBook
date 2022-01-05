import { gql } from "@apollo/client";

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
  mutation addRecipe(
    $title: String!
    $cuisine: String!
    $diettype: String!
    $category: String!
    $servings: String!
    $prepTime: String!
    $cookTime: String!
    $totalTime: String!
    $ingredients: [String]!
    $directions: [String]!
    $imageid: String
    $publicRecipe: String!
  ) {
    addRecipe(
      title: $title
      cuisine: $cuisine
      diettype: $diettype
      category: $category
      servings: $servings
      prepTime: $prepTime
      cookTime: $cookTime
      totalTime: $totalTime
      ingredients: $ingredients
      directions: $directions
      imageid: $imageid
      publicRecipe: $publicRecipe
    ) {
      title
      cuisine
      diettype
      category
      servings
      prepTime
      cookTime
      totalTime
      ingredients
      directions
      imageid
      publicRecipe
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
      prepTime
      cookTime
      totalTime
      ingredients
      directions
      imageid
      publicRecipe
      createdAt
      postAuthor
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $recipeId: String!
    $title: String
    $cuisine: String
    $diettype: String
    $category: String
    $servings: String
    $prepTime: String
    $cookTime: String
    $totalTime: String
    $ingredients: [String]
    $directions: [String]
    $imageid: String
    $publicRecipe: String
  ) {
    updateRecipe(
      recipeId: $recipeId
      title: $title
      cuisine: $cuisine
      diettype: $diettype
      category: $category
      servings: $servings
      prepTime: $prepTime
      cookTime: $cookTime
      totalTime: $totalTime
      ingredients: $ingredients
      directions: $directions
      imageid: $imageid
      publicRecipe: $publicRecipe
    ) {
      _id
      title
      cuisine
      diettype
      category
      servings
      prepTime
      cookTime
      totalTime
      ingredients
      directions
      imageid
      publicRecipe
      createdAt
      postAuthor
    }
  }
`;
