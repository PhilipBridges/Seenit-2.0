// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, result, params } = context;
    const comments = result.data;

    // Asynchronously get user object from each comment's `userId`
    // and add it to the comment
    await Promise.all(
      comments.map(async comment => {
        // Also pass the original `params` to the service call
        // so that it has the same information available (e.g. who is requesting it)
        comment.author = await app.service("users").get(comment.author, params);
      })
    );
    return context;
  };
};
