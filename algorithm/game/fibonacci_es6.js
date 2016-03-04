'use strict';

function *fibonacci () {
  let [prev, curr] = [0, 1];

  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let i of fibonacci()) {
  if (i > 1000) {
    break;
  }
  console.log(i);
}
