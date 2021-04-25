/*
  找到一个数组中最大子数组和
 */
function findGreatestSum(con) {
  let temp, max;
  temp = max = con[0];

  for (let i = 1; i < con.length; ++i) {
    if (temp < 0) {
      temp = con[i];
    } else {
      temp += con[i];
    }

    max = max < temp ? temp : max;
  }

  return max;
}

let con = [1, 4, -3, 5, -1, 6, 2, -5];

console.log(findGreatestSum(con));
