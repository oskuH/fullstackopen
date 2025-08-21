const Blog = require('./blog');
const ReadingLists = require('./readinglist');
const Session = require('./session');
const User = require('./user');

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_added' });

module.exports = {
  Blog, ReadingLists, Session, User
};