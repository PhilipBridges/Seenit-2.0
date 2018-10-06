const assert = require('assert');
const app = require('../../src/app');

describe('\'seen\' service', () => {
  it('registered the service', () => {
    const service = app.service('seen');

    assert.ok(service, 'Registered the service');
  });
});
