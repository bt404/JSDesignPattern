'use strict';

function *fibonacci () {
  let [prev, curr] = [0, 1];

  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let i of fibonacci()) {
  if (i > 1000) {
    break;
  }
  console.log(i);
}
