'use strict';

/*
 * stringify函数实现
 */

function isArray (obj) {
  return Array.isArray(obj);
}

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function stringify (obj) {
  let ret = '';

  if (!isObject(obj) && !isArray(obj) && obj !== null && obj !== undefined) {
    return obj.toString();
  } else if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return 'undefined';
  } else if (isObject(obj)) {
    ret += '{';
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      ret += '"' + key.toString() + '":';
      if (!isObject(obj[key]) && !isArray(obj[key]) && obj[key] !== null && obj[key] !== undefined) {
        ret += obj[key].toString();
      } else if (obj[key] === null) {
        ret += 'null';
      } else if (obj[key] === undefined) {
        ret += 'undefined';
      } else {
        ret += stringify(obj[key]);
      }
      if (i != keys.length - 1) {
        ret += ',';
      }
    }
    ret += '}';
  } else if (isArray(obj)) {
    ret += '[';
    for (let i = 0; i < obj.length; i++) {
      ret += stringify(obj[i]);
      if (i != obj.length - 1) {
        ret += ',';
      }
    }
    ret += ']';
  }
  return ret;
}

let json = {'outter': {'inner': [1, 2, {'item': 3, 'special': null}]}};

let result = stringify(json);

console.log(result);

console.log(JSON.parse(result));
