const sequelize = require('../config/connection');
const { Comment, User } = require('../models');
const commentData = require('./comments.json');
const userData = require('./user.json');
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const comment = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
    const user = await User.create(userData, {
        individualHooks: true,
        returning: true,
    });
};
seedDatabase();