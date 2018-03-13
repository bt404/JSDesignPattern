function objectFactory () {
  let obj = {};
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.call(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}
