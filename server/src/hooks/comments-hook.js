// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { data } = context;
    if (!data.text) {
      throw new Error("Post must have text.");
    }
    if (data.text.length > 500) {
      throw new Error("Post is too long.");
    }

    context.data.author = context.params.user._id;
    return context;
  };
};
