/*
 * 发布者订阅者模式模拟售楼信息订阅
 */

var event = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function () {
    var key = Array.prototype.shift.apply(arguments),
        fns = this.clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; fn = fns[i++]; ) {
      fn.apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];

    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  }
};

var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareA', fn1 = function (price) {
  console.log('price: ' + price);
});

salesOffices.listen('squareA', fn2 = function (price) {
  console.log('price: ' + price);
});

salesOffices.listen('squareB', fn3 = function (price) {
  console.log('price: ' + price);
});

salesOffices.trigger('squareA', 100);
salesOffices.trigger('squareB', 200);
salesOffices.remove('squareA', fn1);
salesOffices.trigger('squareA', 100);
