'use strict';

function swap (con, i, j) {
  let temp = con[i];
  con[i] = con[j];
  con[j] = temp;
}

function partition (con, start, end) {
  let small = start;
  let i = Math.floor(Math.random() * (end - start + 1) + start);
  swap(con, i, end);
  for (i = start; i < end; i++) {
    if (con[i] < con[end]) {
      if (i != small) {
        swap(con, i, small);
      }
      small++;
    }
  }
  swap(con, small, end);
  return small;
}

function quickSort (con, p, q) {
  if (!Array.isArray(con)) {
    throw new Error('pass array as argument');
  }

  if (p < q) {
    let mid = partition(con, p, q);
    quickSort(con, p, mid-1);
    quickSort(con, mid+1, q);
  }
}


let con = [3, 2, 4, 1, 8, 7, 5, 10, 6, 9];

quickSort(con, 0, con.length-1);

console.log(con);
