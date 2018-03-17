/*
  使用 reduce 实现 map 函数
 */
Array.prototype.map = function (fn) {
  let ret = [];
  this.reduce((prev, cur) => {
    ret.push(fn.call(null, cur));
    return cur;
  }, null);
  return ret;
}

let con = [1, 2, 3];

console.log(con.map(item => item * 2));
