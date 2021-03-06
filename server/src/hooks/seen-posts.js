// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params } = context;
    context.params.query = {
      $sort: { upvotes: "-1" },
      $skip: params.query.skip !== 0 ? params.query.skip : 0
    };
    return context;
  };
};
