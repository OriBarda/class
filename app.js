const express = require("express");
const blogRoutes = require("./Routes/blogRoutes");
const authorRoutes = require("./Routes/authorRoutes");
const app = express();

app.use(express.json());
app.use("/blog", blogRoutes);
app.use("/author", authorRoutes);

module.exports = app;
