'use strict';

/*
 * stringify函数实现
 */

function typeFactory (typeStr) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${typeStr}]`;
  };
}

let [isArray, isObject, isString, isNull] = ['Array', 'Object', 'String', 'Null'].map(typeFactory);

// function isArray (obj) {
//   return Array.isArray(obj);
// }

// function isObject (obj) {
//   return Object.prototype.toString.call(obj) === '[object Object]';
// }

// function isString (obj) {
//   return Object.prototype.toString.call(obj) === '[object String]';
// }

// function isNull (obj) {
//   return obj === null;
// }

function processValue (obj) {
  if (!isString(obj)) {
    if (!isNull(obj)) {
      return obj.toString();
    } else {
      return 'null';
    }
  } else {
    return '"' + obj.toString() + '"';
  }
}

function stringify (obj) {
  let ret = '';

  if (!isObject(obj) && !isArray(obj)) {
    return processValue(obj);
  } else if (isObject(obj)) {
    ret += '{';
    for (let key in obj) {
      ret += `"${key.toString()}":${stringify(obj[key])},`;
    }
    ret = `${ret.substring(0, ret.length-1)}}`;
  } else if (isArray(obj)) {
    ret += '[';
    for (let item of obj) {
      ret += `${stringify(item)},`;
    }
    ret = `${ret.substring(0, ret.length-1)}]`;
  }
  return ret;
}

let json = {'outter': {'inner': ["1", 2, {'item': 'content', 'null': null}]}};

let result = stringify(json);

console.log(result);

console.log(JSON.parse(result));
console.log(JSON.stringify(JSON.parse(result)));
