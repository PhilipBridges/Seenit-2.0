const { authenticate } = require("@feathersjs/authentication").hooks;
const seenHook = require("../../hooks/seen-hook");
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
    find: [],
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
