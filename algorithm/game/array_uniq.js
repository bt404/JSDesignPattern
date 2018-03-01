function arrayUniq (con) {
  let temp = {},
      ret = [];
  for (let item of con) {
    let key = JSON.stringify(item);
    if (!temp[key]) {
      temp[key] = 1;
      ret.push(item);
    }
  }
  return ret;
}

let con = [1, '1', 1, 2, 3, 'hehe', {a: 1}, {a: 1}];

console.log(arrayUniq(con));
