function binary (con, target) {
  let i = 0, j = con.length - 1;
  let ret = -1;
  while (i <= j) {
    let k = Math.floor((j + i) / 2);
    if (con[k] === target) {
      ret = k;
      break;
    } else if (con[k] < target) {
      i = k + 1;
    } else if (con[k] > target) {
      j = k - 1;
    }
  }
  return ret;
}

let con = [0, 1, 2, 3, 4, 5, 6];

console.log(binary(con, 6));
