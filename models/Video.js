const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Video extends Model {}


Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "video",
  }
);

module.exports = Video;