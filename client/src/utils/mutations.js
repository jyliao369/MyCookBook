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
    $category: String!
    $mealofday: String!
    $cuisine: String!
    $diettype: String!
    $cookstyle: String!
    $servings: String!
    $yield: String!
    $prepTime: String!
    $cookTime: String!
    $totalTime: String!
    $description: String!
    $notes: String!
    $ingredients: [String]!
    $directions: [String]!
    $imageid: String
    $publicRecipe: String!
  ) {
    addRecipe(
      title: $title
      category: $category
      mealofday: $mealofday
      cuisine: $cuisine
      diettype: $diettype
      cookstyle: $cookstyle
      servings: $servings
      yield: $yield
      prepTime: $prepTime
      cookTime: $cookTime
      totalTime: $totalTime
      description: $description
      notes: $notes
      ingredients: $ingredients
      directions: $directions
      imageid: $imageid
      publicRecipe: $publicRecipe
    ) {
      title
      category
      mealofday
      cuisine
      diettype
      cookstyle
      servings
      yield
      prepTime
      cookTime
      totalTime
      description
      notes
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
      category
      mealofday
      cuisine
      diettype
      cookstyle
      servings
      yield
      prepTime
      cookTime
      totalTime
      description
      notes
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
    $category: String
    $mealofday: String
    $cuisine: String
    $diettype: String
    $cookstyle: String
    $servings: String
    $yield: String
    $prepTime: String
    $cookTime: String
    $totalTime: String
    $description: String
    $notes: String
    $ingredients: [String]
    $directions: [String]
    $imageid: String
    $publicRecipe: String
  ) {
    updateRecipe(
      recipeId: $recipeId
      title: $title
      category: $category
      mealofday: $mealofday
      cuisine: $cuisine
      diettype: $diettype
      cookstyle: $cookstyle
      servings: $servings
      yield: $yield
      prepTime: $prepTime
      cookTime: $cookTime
      totalTime: $totalTime
      description: $description
      notes: $notes
      ingredients: $ingredients
      directions: $directions
      imageid: $imageid
      publicRecipe: $publicRecipe
    ) {
      _id
      title
      category
      mealofday
      cuisine
      diettype
      cookstyle
      servings
      yield
      prepTime
      cookTime
      totalTime
      description
      notes
      ingredients
      directions
      imageid
      publicRecipe
      createdAt
      postAuthor
    }
  }
`;
