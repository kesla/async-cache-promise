import AsyncCache from 'async-cache';
import Promise from 'bluebird';
import {set} from 'immutable-object-methods';

module.exports = _opts => {
  const {load} = _opts;
  const opts = set(_opts, 'load', (key, cb) => {
    load(key)
      .then(data => cb(null, data))
      .catch(cb);
  });

  const _cache = new AsyncCache(opts);
  const cache = set(_cache, 'get', Promise.promisify(_cache.get.bind(_cache)));
  return cache;
};
