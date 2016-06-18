import AsyncCache from 'async-cache';
import Promise from 'bluebird';
import {set} from 'immutable-object-methods';

module.exports = class AsyncCachePromise extends AsyncCache {
  constructor (_opts) {
    const {load} = _opts;
    const opts = set(_opts, 'load', (key, cb) => {
      load(key)
        .then(data => cb(null, data), cb);
    });
    super(opts);
  }

  get (value) {
    const get = super.get.bind(this, value);
    return Promise.promisify(get);
  }
};
