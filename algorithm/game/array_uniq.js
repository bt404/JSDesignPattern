function arrayUniq (con) {
  let temp = {},
      ret = [];
  for (let item of con) {
    // 引用类型直接添加
    if (typeof item === 'object') {
      ret.push(item);
    } else {
      let key = JSON.stringify(item);
      if (!temp[key]) {
        temp[key] = 1;
        ret.push(item);
      }
    }
  }
  return ret;
}

function arrayUniqBySet (con) {
  return Array.from(new Set(con));
}

let con = [1, '1', 1, 2, 3, 'hehe', {a: 1}, {a: 1}];

console.log(arrayUniq(con));
console.log(arrayUniqBySet(con));
