'use strict';


var cache = (function () {
  var cache = [], length = 3;
  var set = function () {
    let key = Array.prototype.shift.apply(arguments);
    let value = Array.prototype.shift.apply(arguments);
    for (let i = 0; i < cache.length; i++) {
      let item = cache[i];
      if (item.hasOwnProperty(key)) {
        item[key] = value;
        cache.splice(i, 1);
        cache.splice(0, 0, item);
        console.log(cache);
        return;
      }
    }

    let temp = {};
    temp[key] = value;
    cache.splice(0, 0, temp);
    if (cache.length > length) {
      cache.pop()
    }

    console.log(cache);
  };

  var get = function () {
    let key = Array.prototype.shift.apply(arguments);
    let result = undefined;
    for (let i = 0; i < cache.length; i++) {
      let item = cache[i];
      if (item.hasOwnProperty(key)) {
        result = item[key];
        break;
      }
    }
    return result;
  };

  return {
    set: set,
    get: get,
  }
})();

const MAX_SIZE = 3;

class Cache {
  constructor(max_size) {
    this.max_size = max_size || MAX_SIZE;
    this.cache = [];
  }

  get (key) {
    let result = undefined;
    for (let item of this.cache) {
      if (item.hasOwnProperty(key)) {
        result = item[key];
      }
    }
    return result;
  }

  set (key, value) {
    for (let i = 0; i < this.cache.length; ++i) {
      let item = this.cache[i];
      if (item.hasOwnProperty(key)) {
        item[key] = value;
        this.cache.splice(i, 1);
        this.cache.splice(0, 0, item);
        console.log(this.cache);
        return;
      }
    }

    let temp = {};
    temp[key] = value;
    this.cache.unshift(temp);
    if (this.cache.length > MAX_SIZE) {
      this.cache.pop();
    }
    console.log(this.cache);
  }
}

cache = new Cache();

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('b', -2);
cache.set('d', 4);
console.log(cache.get('b'));
console.log(cache.get('a'));
