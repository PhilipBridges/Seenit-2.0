// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { data, app, method, params } = context;

    if (!data.text) {
      throw new Error("Post must have text.");
    }
    if (data.text.length > 500) {
      throw new Error("Post is too long.");
    }
    if (!data.title) {
      throw new Error("Post must have a title");
    }
    if (data.title.length > 25) {
      throw new Error("Title is too long.");
    }

    context.data = {
      title: data.title,
      author: context.params.user._id,
      text: data.text
    };
    return context;
  };
};
