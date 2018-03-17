/*
  找到一个数组中最大子数组和
 */
function findGreatestSum (con) {
  let temp = [];
  for (let i = 0; i < con.length; ++i) {
    temp[i] = con[i];
  }

  let ret = temp[0];

  for (let i = 1; i < con.length; ++i) {
    if (temp[i - 1] > 0) {
      temp[i] = temp[i - 1] + temp[i];
    }
    if (ret < temp[i]) {
      ret = temp[i];
    }
  }

  return ret;
}

let con = [1, 4, -3, 5, -1, 6, 2, -5];

console.log(findGreatestSum(con));
