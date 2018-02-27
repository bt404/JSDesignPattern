'use strict';

function swap (con, i, j) {
  let temp = con[i];
  con[i] = con[j];
  con[j] = temp;
}

function isArrayCheck (con) {
  if (Array.isArray) {
    return Array.isArray(con);
  } else {
    return Object.prototype.toString.call(con) === '[object Array]';
  }
}

function bubbleDown (con) {
  if (!isArrayCheck(con)) {
    throw new Error('should pass array as argument');
  }

  // 每趟一个大数沉底
  for (let i = 0; i < con.length - 1; ++i) {
    for (let j = 0; j < con.length - i - 1; ++j) {
      if (con[j] > con[j + 1]) {
        swap(con, j + 1, j);
      }
    }
  }
  return con;
}


function bubbleUp (con) {
  if (!isArrayCheck(con)) {
    throw new Error('should pass array as argument');
  }

  // 每趟一个小数冒泡
  for (let i = con.length - 1; i > 0; --i) {
    for (let j = con.length - 1; j > con.length - i - 1; --j) {
      if (con[j - 1] > con[j]) {
        swap(con, j - 1, j);
      }
    }
  }
  return con;
}


let con = [3, 2, 4, 1, 8, 7, 5, 10, 6, 9];

//con = bubbleUp(con);
con = bubbleDown(con);

console.log(con);
