const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const commentsHook = require('../../src/hooks/comments-hook');

describe('\'comments-hook\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: commentsHook()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
