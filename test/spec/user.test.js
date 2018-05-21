/**
 * @fileOverview Test logging of user data objects.
 */
const Logality = require('../..');
const { sink, stubLogality } = require('../lib/tester.lib');

const UDO_MOCK = {
  id: 10,
  email: 'one@go.com',
};

const UDO_MOCK_TWO = {
  userId: 12,
  userEmail: 'two@go.com',
};

describe('User Data Object Logging', () => {
  stubLogality();

  test('Will log UDO Properly by default', (done) => {
    const logality = new Logality({
      appName: 'testLogality',
      wstream: sink((chunk) => {
        expect(chunk).toMatchSnapshot();
        done();
      }),
    });

    const log = logality.get();

    log('info', 'hello world', { user: UDO_MOCK });
  });

  test('Will log UDO with a custom serializer', (done) => {
    const logality = new Logality({
      appName: 'testLogality',
      serializers: {
        user: (udo) => {
          return {
            id: udo.userId,
            email: udo.userEmail,
          };
        },
      },
      wstream: sink((chunk) => {
        expect(chunk).toMatchSnapshot();
        done();
      }),
    });

    const log = logality.get();

    log('info', 'hello world', { user: UDO_MOCK_TWO });
  });
});
