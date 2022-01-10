const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    title: String
    category: String
    mealofday: String
    cuisine: String
    diettype: String
    cookstyle: String
    servings: String
    yield: String
    prepTime: String
    cookTime: String
    totalTime: String
    description: String
    notes: String
    ingredients: [String]
    directions: [String]
    imageid: String
    publicRecipe: String
    createdAt: String
    postAuthor: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User

    recipes: [Recipe]
    recipe(recipeId: ID!): Recipe

    myprofile: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User
    login(email: String!, password: String!): Auth

    addRecipe(
      title: String!
      category: String!
      mealofday: String!
      cuisine: String!
      diettype: String!
      cookstyle: String!
      servings: String!
      yield: String!
      prepTime: String!
      cookTime: String!
      totalTime: String!
      description: String!
      notes: String!
      ingredients: [String]!
      directions: [String]!
      imageid: String
      publicRecipe: String
    ): Recipe
    removeRecipe(recipeId: String!): Recipe

    updateRecipe(
      recipeId: String!
      title: String
      category: String
      mealofday: String
      cuisine: String
      diettype: String
      cookstyle: String
      servings: String
      yield: String
      prepTime: String
      cookTime: String
      totalTime: String
      description: String
      notes: String
      ingredients: [String]
      directions: [String]
      imageid: String
      publicRecipe: String
    ): Recipe
  }
`;

module.exports = typeDefs;
