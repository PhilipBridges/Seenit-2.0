const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const posts = require('./posts/posts.service.js');
const comments = require('./comments/comments.service.js');
const seen = require('./seen/seen.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(posts);
  app.configure(comments);
  app.configure(seen);
};
