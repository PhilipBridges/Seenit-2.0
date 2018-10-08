const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const commentUpvote = require('../../src/hooks/comment-upvote');

describe('\'comment-upvote\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: commentUpvote()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
