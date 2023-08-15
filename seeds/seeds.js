const sequelize = require('../config/connection');
const { Comment, User, Video } = require('../models');
const commentData = require('./comments.json');
const userData = require('./user.json');
const videoData = require('./video.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const user = await User.create(userData, {
      individualHooks: true,
      returning: true,
  });
  const video = await Video.bulkCreate(videoData, {
      individualHooks: true,
      returning: true,
  });
  const comment = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
  });
};

seedDatabase();