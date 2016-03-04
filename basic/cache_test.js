'use strict';


var set = (function () {
  var cache = [], length = 3;
  return function () {
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
  }
})();


set('a', 1);
set('b', 2);
set('c', 3);
set('b', 4);
