const { authenticate } = require('@feathersjs/authentication').hooks;

const messageHook = require('../../hooks/message-hook');

const inbox = require('../../hooks/inbox');

const populateMessage = require('../../hooks/populate-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [inbox()],
    get: [],
    create: [messageHook()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateMessage()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
