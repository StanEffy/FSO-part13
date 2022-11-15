const Note = require('./notes')
const Blog = require("./blogs")


Note.sync()
Blog.sync()

module.exports = {
  Note,
  Blog
}