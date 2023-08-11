const User = require('./User');
const Video = require('./Video');
const Comment = require('./Comment');
const VideoTag = require('./VideoTag');

User.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: "CASCADE",
});

Video.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Video, {
    foreignKey: 'video_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Video.belongsToMany(User, { through: VideoTag, foreignKey: 'user_id' });
User.belongsToMany(Video, { through: VideoTag, foreignKey: 'video_id' });

module.exports = { User, Video, Comment, VideoTag };