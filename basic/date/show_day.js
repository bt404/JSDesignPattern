function showDay () {
  var DAY = ['日', '一', '二', '三', '四', '五', '六'];
  return `今天是周${DAY[new Date().getDay()]}`;
}

console.log(showDay());
