'use strict';

/*
 * 实现 jQuery 的 extend 函数
 */

function isArray (obj) {
  return Array.isArray(obj);
}

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}


function extend (A, B) {
  for (let key in B) {
    if (!isObject(B[key])) {
      A[key] = B[key];
    } else {
      A[key] = {};
      extend(A[key], B[key]);
    }
  }
}

let dest = {};
let src = {a: {b: 1}, c: 3};

extend(dest, src);

console.log(dest);
