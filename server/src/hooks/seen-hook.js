// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { data, params } = context;
    if (!data.name) {
      throw new Error('Must have a name.')
    }
    if (!data.description) {
      throw new Error('Must have a description.')
    }

    context.data = {
      owner: params.user._id,
      name: data.name,
      description: data.description
    }
    return context;
  };
};
