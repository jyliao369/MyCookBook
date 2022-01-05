const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  diettype: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
  prepTime: {
    type: String,
    required: true,
  },
  cookTime: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  directions: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  imageid: {
    type: String,
    required: false,
  },
  publicRecipe: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  // postAuthor: {
  //     type: String,
  //     required: "",
  //     trim: true,
  // },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
