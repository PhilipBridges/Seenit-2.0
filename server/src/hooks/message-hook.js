// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, data } = context;
    if (!data.text) {
      throw new Error("Message must have text.");
    }
    if (!data.targetName) {
      throw new Error("Message must have target.");
    }
    if (data.text.length > 400) {
      throw new Error("Message is too long.");
    }

    const query = await app.service("users").find({
      query: {
        name: data.targetName
      }
    });

    if (!query.data[0]) {
      throw new Error("User does not exist.");
    }

    const targetId = query.data[0]._id;

    context.data = {
      text: data.text,
      author: context.params.user._id,
      target: targetId,
      targetName: data.targetName,
      createdAt: new Date().getTime()
    };

    return context;
  };
};
