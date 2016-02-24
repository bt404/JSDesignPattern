'use strict';

function insertSort (con) {
  for (let i = 1; i < con.length; i++) {
    let temp = con[i];
    let j = i-1;
    while (j >= 0 && temp < con[j]) {
      con[j+1] = con[j];
      j--;
    }
    con[j+1] = temp;
  }
}


let con = [3, 2, 4, 1, 8, 7, 5, 10, 6, 9];

insertSort(con);

console.log(con);
