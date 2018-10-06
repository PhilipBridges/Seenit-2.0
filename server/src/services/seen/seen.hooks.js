const { authenticate } = require("@feathersjs/authentication").hooks;
const seenHook = require("../../hooks/seen-hook");
const seenPopulate = require('../../hooks/seen-populate');
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [seenHook()],
    update: [],
    patch: [seenHook()],
    remove: []
  },

  after: {
    all: [],
    find: [seenPopulate()],
    get: [seenPopulate()],
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
