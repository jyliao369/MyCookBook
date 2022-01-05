const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("recipes");
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("recipes");
    },

    myprofile: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("recipes");
      }
      throw new AuthenticationError("You need to log in first!!");
    },

    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to log in first!!");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile matches the provided email");
      }

      const correctPass = await user.isCorrectPassword(password);

      if (!correctPass) {
        throw new AuthenticationError("Wrong password");
      }

      const token = signToken(user);
      return { token, user };
    },

    addRecipe: async (
      parent,
      {
        title,
        cuisine,
        diettype,
        category,
        servings,
        prepTime,
        cookTime,
        totalTime,
        ingredients,
        directions,
        imageid,
        publicRecipe,
      },
      context
    ) => {
      if (context.user) {
        const recipe = await Recipe.create({
          title,
          cuisine,
          diettype,
          category,
          servings,
          prepTime,
          cookTime,
          totalTime,
          ingredients,
          directions,
          imageid,
          publicRecipe,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateRecipe: async (
      parent,
      {
        recipeId,
        title,
        cuisine,
        diettype,
        category,
        servings,
        prepTime,
        cookTime,
        totalTime,
        ingredients,
        directions,
        imageid,
        publicRecipe,
      },
      context
    ) => {
      const recipe = await Recipe.find({ id: recipeId });
      if (!recipe) {
        throw new Error(`No recipes matches the id: ${recipeId}`);
      }

      await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          $set: {
            title: title,
            cuisine: cuisine,
            diettype: diettype,
            category: category,
            servings: servings,
            prepTime: prepTime,
            cookTime: cookTime,
            totalTime: totalTime,
            ingredients: ingredients,
            directions: directions,
            imageid: imageid,
            publicRecipe: publicRecipe,
          },
        }
      );

      return recipe;
    },
  },
};

module.exports = resolvers;
