const Note = require("./notes");
const Blog = require("./blogs");
const User = require("./user");
const Team = require("./team");
const Readlist = require("./readlist");
const Membership = require("./membership");
const UserNotes = require("./user_notes");

User.hasMany(Note);
User.hasMany(Blog);
Note.belongsTo(User);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

// User.belongsToMany(Note, { through: UserNotes, as: "marked_notes" });
// Note.belongsToMany(User, { through: UserNotes, as: "users_marked" });

User.belongsToMany(Blog, { through: Readlist });
Blog.belongsToMany(User, { through: Readlist });
// Note.sync({ alter: true });
// User.sync({ alter: true });
// Blog.sync({ alter: true });

module.exports = {
  Note,
  Blog,
  User,
  Team,
  UserNotes,
  Readlist,
};
