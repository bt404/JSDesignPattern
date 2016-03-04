'use strict';

function fibonacci (m) {
  if (m < 1) {
    return 0;
  } else if (m == 1 || m == 2) {
    return 1;
  } else {
    return fibonacci(m-1) + fibonacci(m-2);
  }
}

for (let i = 0; i < 10; i++) {
  let result = fibonacci(i);
  console.log(result);
}
