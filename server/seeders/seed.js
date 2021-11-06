const db = require('../config/connection');
const { User, Recipe } = require('../models');
const userSeeds = require('./userSeeds.json');
const recipeSeeds = require('./recipeSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Recipe.deleteMany({});

        await User.create(userSeeds)

        for (let a = 0; a < recipeSeeds.length; a++) {
            const { _id, postAuthor } = await Recipe.create(recipeSeeds[a]);
            const user = await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        recipes: _id,
                    },
                }
            );
        }
    }   catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});