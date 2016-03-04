var combination = function (m, n) {
  if (n == 0 || m == n) {
    return 1;
  } else {
    return combination(m-1, n-1) + combination(m-1, n);
  }
}

for (var i = 0; i < 10; i++) {
  var temp = [];
  for (var j = 0; j <= i; j++) {
    temp.push(combination(i, j));
  }
  console.log(temp.join(' '));
}
