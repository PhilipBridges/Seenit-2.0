// Initializes the `seen` service on path `/seen`
const createService = require('feathers-mongoose');
const createModel = require('../../models/seen.model');
const hooks = require('./seen.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/seens', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('seens');

  service.hooks(hooks);
};
