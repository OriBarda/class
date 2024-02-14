const sequelize = require("../server");

const BlogAuthor = sequelize.define("BlogAuthor", {
  
}, { timestamps: true });

module.exports = BlogAuthor;