const { authenticate } = require("@feathersjs/authentication").hooks;

const postHook = require("../../hooks/post-hook");

const postPatch = require("../../hooks/post-patch");

const postPopulate = require("../../hooks/post-populate");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [postHook()],
    update: [],
    patch: [postPatch()],
    remove: []
  },

  after: {
    all: [],
    find: [postPopulate()],
    get: [postPopulate()],
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
