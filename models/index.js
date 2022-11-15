const Note = require('./notes')
const Blog = require("./blogs")
const User = require('./user')

Note.sync()
Blog.sync()
User.sync()

module.exports = {
  Note,
  Blog
}