'use strict';

function fibonacci (lines) {
  var prev = 0, curr = 1;
  for (let i = 0; i < lines; i++) {
    let temp = curr;
    curr = prev + curr;
    prev = temp;
    console.log(curr);
  }
}

fibonacci(10);
