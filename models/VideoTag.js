// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class VideoTag extends Model {}

// VideoTag.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'user',
//             id: 'id',
//         },
//     },
//     video_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'video',
//             id: 'id',
//         },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "video_tag",
//   }
// );

// module.exports = VideoTag;