/* 
 * 点击checkbox会发送请求，以2s为间隔合并2s之间的多次请求
 * 没有考虑2s内如果用户取消选中，应该从cache中删除对应id
 */

var synchronousFile = function (id) {
  console.log('开始同步文件：' + id);
};

var proxySynchronousFile = (function () {
  var cache = [], timer;
  return function (id) {
    cache.push(id);

    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      synchronousFile(cache.join(','));

      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  }
})();

var checkboxes = document.getElementsByTagName('input');

for (var i = 0, c; c = checkboxes[i++]; ) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySynchronousFile(this.id);
    }
  }
}
