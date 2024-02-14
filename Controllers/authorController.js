const Author = require("../Models/authorModel");

exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(200).json({ author: newAuthor, message: "dor gay" });
  } catch (err) {
    res.status(400).json(err, "dor very gay");
  }
};

