/*
 * 对象池实现tooltip工厂
 */

var tooltipFactory = (function () {
  tooltipCache = [];

  return {
    create: function () {
      if (tooltipCache.length === 0) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        return div;
      } else {
        return tooltipCache.shift();
      }
    },
    recover: function (tooltipDom) {
      return tooltipCache.push(tooltipDom);
    }
  };
})();

var arr = [];

for (var i = 0, content; content = ['A', 'B'][i++]; ){
  var tooltip = tooltipFactory.create();
  tooltip.innerHTML = content;
  arr.push(tooltip);
}

for (var i = 0, tooltip; tooltip = arr[i++]; ){
  tooltipFactory.recover(tooltip);
}

for (var i = 0, content; content = ['A', 'B', 'C', 'D', 'E', 'F'][i++]; ){
  var tooltip = tooltipFactory.create();
  tooltip.innerHTML = content;
  arr.push(tooltip);
}

