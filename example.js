import co from 'co';
import setupAsyncCache from 'async-cache-promise';

co(function * (t) {
  let count = 0;
  const cache = setupAsyncCache({
    load: key => {
      count++;
      return Promise.resolve(key);
    }
  });

  console.log('this is not cached', yield cache.get(123));
  console.log('this is cached', yield cache.get(123));
});
