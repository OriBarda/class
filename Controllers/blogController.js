const Blog = require("../Models/blogModel");
const Author = require("../Models/authorModel");
const BlogAuthor = require("../Models/blogAuthorModel");

Author.belongsToMany(Blog, {
  through: "BlogAuthor",
});
Blog.belongsToMany(Author, {
  through: "BlogAuthor",
});

const createBlogWithAuthor = async (blogData, authorIds) => {
  const newBlog = await Blog.create(blogData);
  for (const author of authorIds) {
    if (author) {
      await newBlog.addAuthor(author);
    }
  }
  return newBlog;
};

exports.createBlog = async (req, res) => {
  const { title, content, authorIds } = req.body;
  for (const authorId of authorIds) {
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.send(`cannot find author with ${authorId} `);
    }
  }
  const newBlog = await createBlogWithAuthor({ title, content }, authorIds);
  res.send(newBlog);
};

// Author.hasMany(Blog, {
//   foreignKey: "AuthorId",
// });
// Blog.belongsTo(Author, {
//   foreignKey: "AuthorId",
// });

// exports.createBlog = async (req, res) => {
//   try {
//     const authorId = req.params.pk;
//     const author = await Author.findByPk(authorId);
//     if (!author) {
//       return res.status(404).json({ message: "hello world" });
//     }
//     const newBlog = await Blog.create({
//       title: req.body.title,
//       content: req.body.content,
//       AuthorId: author.id,
//     });
//     res.status(201).json({ status: "created", blog: newBlog });
//   } catch (err) {
//     res.status(500).json({ status: "failed", message: err.message });
//   }
// };

exports.getAll = async (req, res) => {
  try {
    const allBlogs = await Blog.findAll({
      include: [
        {
          model: Author,
          as: "Author",
        },
      ],
    });
    res.json(allBlogs);
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.editBlog = async (req, res) => {
  const id = req.params.pk;
  const updatedBlog = {
    title: req.body.title,
    content: req.body.content,
    auther: req.body.auther,
  };

  try {
    const [rowsUpdated, [updatedBlogInstance]] = await Blog.update(
      updatedBlog,
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    if (rowsUpdated === 0) {
      res.status(404).json({ status: "failed", message: "Blog not found" });
    } else {
      res.json(updatedBlogInstance);
      res.send(updatedBlog);
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.pk;

  try {
    const rowsDeleted = await Blog.destroy({ where: { id: id } });

    if (rowsDeleted === 0) {
      res.status(404).json({ status: "failed", message: "Blog not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.specBlog = async (req, res) => {
  const id = req.params.pk;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ status: "failed", message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.getTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const blog = await Blog.findOne({ where: { title: title } });

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ status: "failed", message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};
