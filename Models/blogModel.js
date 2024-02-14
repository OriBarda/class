const { DataTypes } = require("sequelize");
const sequelize = require("../server");

const Blog = sequelize.define(
  "Blog",
  {
    title: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Blog;