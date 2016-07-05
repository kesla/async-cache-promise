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

test('AsyncCache, using promises', t => {
  let count = 0;
  const cache = new AsyncCache({
    load: key => {
      count++;
      return Promise.resolve(key);
    }
  });

  return cache.get(123)
    .then(res => {
      t.is(res, 123);
      t.is(count, 1);
      return cache.get(123);
    })
    .then(res => {
      t.is(res, 123);
      t.is(count, 1);
      return cache.get(234);
    })
    .then(res => {
      t.is(res, 234);
      t.is(count, 2);
      cache.set(345, 345);
      return cache.get(345);
    })
    .then(res => {
      t.is(res, 345);
      t.is(count, 2);
    });
});
