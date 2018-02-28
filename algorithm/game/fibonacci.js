'use strict';

function fibonacci (lines) {
  var prev = 0, curr = 1;
  for (let i = 0; i < lines; i++) {
    console.log(curr);
    let temp = curr;
    curr = prev + curr;
    prev = temp;
  }
}

fibonacci(10);
