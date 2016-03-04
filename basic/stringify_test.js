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

  if (!isObject(obj) && !isArray(obj)) {
    return obj.toString();
  } else if (isObject(obj)) {
    ret += '{';
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      ret += '"' + key.toString() + '":';
      if (!isObject(obj[key]) && !isArray(obj[key])) {
        ret += obj[key].toString();
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

let json = {'outter': {'inner': [1, 2, {'item': 3}]}};

let result = stringify(json);

console.log(result);

console.log(JSON.parse(result));
