// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    let { app, data, params } = context;

    const post = await app.service("posts").get(context.id);
    if (data.vote) {
      const voterArray = post.voters.map(voter => voter.toString());
      // Parsing is done for Mongo OIDs
      if (
        voterArray.indexOf(JSON.parse(JSON.stringify(params.user._id))) === -1
      ) {
        post.voters.push(params.user._id);
        data.upvotes = post.upvotes + 1;
        data.voters = post.voters;
      } else {
        throw new Error("You have already voted.");
      }
    }

    return context;
  };
};
