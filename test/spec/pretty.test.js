/**
 * @fileOverview Test normal logging.
 */
const Logality = require('../..');
const { sink, stubLogality } = require('../lib/tester.lib');

describe('Normal Logging', () => {
  stubLogality();

  test('Will log expected JSON properties', (done) => {
    const logality = new Logality({
      appName: 'testLogality',
      wstream: sink((chunk) => {
        expect(chunk).toMatchSnapshot();
        done();
      }),
    });

    const log = logality.get();

    log('info', 'hello world');
  });
});
