// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, method, result, params } = context;

    const seens = method === "find" ? result.data : [result];

    await Promise.all(
      seens.map(async seen => {
        seen.owner = await app.service("users").get(seen.owner, params);
      })
    );
    return context;
  };
};
