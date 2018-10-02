// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model,
    paginate: {
      default: 5,
      max: 5
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('messages');

  service.hooks(hooks);
};
