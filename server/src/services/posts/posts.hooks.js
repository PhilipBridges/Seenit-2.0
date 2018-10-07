const { authenticate } = require("@feathersjs/authentication").hooks;

const postHook = require("../../hooks/post-hook");

const postPatch = require("../../hooks/post-patch");

const postPopulate = require("../../hooks/post-populate");

const seenPosts = require('../../hooks/seen-posts');

const patchPopulate = require('../../hooks/patch-populate');

module.exports = {
  before: {
    all: [],
    find: [seenPosts()],
    get: [],
    create: [authenticate("jwt"), postHook()],
    update: [],
    patch: [authenticate("jwt"), postPatch()],
    remove: []
  },

  after: {
    all: [],
    find: [postPopulate()],
    get: [postPopulate()],
    create: [],
    update: [],
    patch: [patchPopulate()],
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
