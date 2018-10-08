// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    let { app, data, params } = context;

    const comment = await app.service("comments").get(context.id);
    const author = await app.service("users").get(data.author);
    if (data.vote) {
      const voterArray = comment.voters.map(voter => voter.toString());
      // Parsing is done for Mongo OIDs
      if (
        voterArray.indexOf(JSON.parse(JSON.stringify(params.user._id))) === -1
      ) {
        comment.voters.push(params.user._id);
        data.upvotes = comment.upvotes + 1;
        data.voters = comment.voters;
        data.author = { _id: author._id, name: author.name };
      } else {
        throw new Error("You have already voted.");
      }
    }

    return context;
  };
};
