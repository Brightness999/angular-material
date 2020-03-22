/**
 * @fileoverview Test logging of user data objects.
 */
const Logality = require('../..');
const { sink, stubLogality } = require('../lib/tester.lib');

const UDO_MOCK = {
  id: 10,
  email: 'one@go.com',
};

describe('User Data Object Logging', () => {
  stubLogality();

  test('Will log UDO Properly by default', done => {
    const logality = new Logality({
      appName: 'testLogality',
      wstream: sink(chunk => {
        expect(chunk).toMatchSnapshot();
        done();
      }),
    });

    const log = logality.get();

    log('info', 'hello world', { user: UDO_MOCK });
  });
});
