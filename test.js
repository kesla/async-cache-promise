import test from 'tapava';
import AsyncCache from './lib';
import Promise from 'bluebird';

test('AsyncCache', function * (t) {
  let count = 0;
  const cache = new AsyncCache({
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
  cache.set(345, 345);
  t.is(count, 2);
  t.is(yield cache.get(345), 345);
});
