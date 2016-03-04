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


cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('b', -2);
cache.set('d', 4);
console.log(cache.get('b'));
console.log(cache.get('a'));
