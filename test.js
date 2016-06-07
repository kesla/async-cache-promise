import test from 'tapava';
import setupAsyncCache from './lib';
import Promise from 'bluebird';

test('', function * (t) {
  let count = 0;
  const cache = setupAsyncCache({
    load: key => {
      count++;
      return Promise.resolve(key);
    }
  });

  t.is(yield cache.get(123), 123);
  t.is(count, 1);
  t.is(yield cache.get(123), 123);
  t.is(count, 1);
  t.is(yield cache.get(234), 234);
  t.is(count, 2);
});
