/*
 * 装饰者模式中的before/after函数
 */

Function.prototype.before = function (beforefn) {
  var __self = this;

  return function () {
    beforefn.apply(this, arguments);
    return __self.apply(this, arguments);
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

function foo () {
  console.log('exec function');
}

foo = foo.before(() => console.log('before exec'));
foo = foo.after(() => console.log('after exec'))

foo();
