/*
 * 装饰者模式中的before/after函数
 */


Function.prototype.before = function (beforefn) {
  var __self = this;

  return function () {
    beforefn.apply(this, arguments);
    return this.apply(this, arguments);
  }
};

Function.prototype.after = function (afterfn) {
  var __self = this;

  return function () {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};
