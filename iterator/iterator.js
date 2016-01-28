/*
 * 外部迭代器
 */

var Iterator = function (obj) {
  var current = 0;

  var isDone = function () {
    return current >= obj.length;
  };

  var next = function () {
    current++;
  };

  var getCurrent = function () {
    return obj[current];
  };

  var reset = function () {
    current = 0;
  };

  return {
    isDone: isDone,
    next: next,
    getCurrent: getCurrent,
    reset: reset,
  };
};

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 3, 3]);
var iterator3 = Iterator([1, 3, 3]);

var compare = function (iteratorA, iteratorB) {
  while (!iteratorA.isDone() || !iteratorB.isDone()) {
    if (iteratorA.getCurrent() != iteratorB.getCurrent()) {
      console.log('not same');
      return;
    }
    iteratorA.next();
    iteratorB.next();
  }
  console.log('same');
};

compare(iterator1, iterator2);
iterator2.reset();
compare(iterator2, iterator3);
