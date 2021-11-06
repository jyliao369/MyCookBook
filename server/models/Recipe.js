const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    servings:{
        type: String,
        required: true,
    },
    totalTime: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
        trim: true,
    }],
    directions: [{
        type: String,
        required: true,
        trim: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    postAuthor: {
        type: String,
        required: true,
        trim: true,
    },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;