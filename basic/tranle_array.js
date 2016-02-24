'use strict';

function trangle (lines) {
  let result = [[1], [1, 1]];

  if (lines >= 3) {
    for (let i = 2; i < lines; i++) {
      result[i] = [];
      for (let j = 0; j <= i; j++) {
        if (j == 0 || j == i) {
          result[i].push(1);
        } else {
          result[i].push(result[i-1][j-1] + result[i-1][j]);
        }
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    let temp = result[i];
    console.log(temp.join(' '));
  }
}

trangle(10);
