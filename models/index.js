const User = require('./User');
const Video = require('./Video');
const Comment = require('./Comment');
// const VideoTag = require('./VideoTag');
// this automatically sets up the foreign key to 'user_id' in the video model
User.hasMany(Video, {
    foreignKey: 'user_id'
}); 

// this automatically sets up the created 'user_id' foreign key in the video model
Video.belongsTo(User, {
    foreignKey: 'user_id'
});

// Video.hasMany(Comment, {
//     foreignKey: 'video_id', 
//     onDelete: 'CASCADE'
// });

// Comment.belongsTo(Video, {
//     foreignKey: 'video_id',
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

module.exports = { User, Video, Comment };