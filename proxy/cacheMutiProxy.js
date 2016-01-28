var muti = function () {
  var ret = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    ret *= arguments[i];
  }
  return ret;
}

var proxyMuti = (function () {
  var cache = {};

  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }

    return cache[args] = muti.apply(this, arguments);
  }
})();

console.log(proxyMuti(1, 2, 3));
