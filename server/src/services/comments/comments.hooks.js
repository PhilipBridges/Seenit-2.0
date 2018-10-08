const { authenticate } = require("@feathersjs/authentication").hooks;
const commentHook = require("../../hooks/comments-hook");

const commentFind = require("../../hooks/comment-find");

const commentPopulate = require("../../hooks/comment-populate");

const commentUpvote = require("../../hooks/comment-upvote");

const commentVotePopulate = require('../../hooks/comment-vote-populate');

module.exports = {
  before: {
    all: [],
    find: [commentFind()],
    get: [],
    create: [authenticate("jwt"), commentHook()],
    update: [authenticate("jwt"), commentHook()],
    patch: [authenticate("jwt"), commentUpvote()],
    remove: []
  },

  after: {
    all: [],
    find: [commentPopulate()],
    get: [],
    create: [],
    update: [],
    patch: [commentVotePopulate()],
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
