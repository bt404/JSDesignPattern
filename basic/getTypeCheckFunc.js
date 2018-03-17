function isObjFunc (name) {
  return function () {
    return Object.prototype.toString.call(arguments[0]) === `[object ${name}]`;
  }
}

let isArray = isObjFunc('Array');

console.log(isArray([]));
