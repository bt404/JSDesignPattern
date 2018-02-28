function Event () {
  if (!this instanceof Event) {
    return new Event();
  }
  this.clientList = {};
}

Event.prototype = {
  on: function (type, fn) {
    if (!this.clientList[type]) {
      this.clientList[type] = [];
    }
    this.clientList[type].push(fn);
    return this;
  },
  off: function (type, fn) {
    let fnList = this.clientList[type];
    if (fnList && fnList.length) {
      for (let i = 0; i < fnList.length; ++i) {
        if (fn === fnList[i]) {
          fnList.splice(i, 1);
          break;
        }
      }
    }
    return this;
  },
  trigger: function () {
    let type = [].shift.call(arguments);
    let fnList = this.clientList[type];
    if (fnList && fnList.length) {
      for (let i = 0; i < fnList.length; ++i) {
        fnList[i].apply(this, arguments);
      }
    }
    return this;
  },
  once: function (type, fn) {
    let self = this;
    let wrap = function () {
      fn.apply(self, arguments);
      self.off(type, fn);
    };
    this.on(type, wrap);
    return this;
  }
}

let event = new Event();
event.on('A', fn1 = function fn1 () {
  console.log('trigger fn1', arguments);
});
event.on('A', fn2 = function fn2 () {
  console.log('trigger fn2', arguments);
});

event.on('B', fn3 = function fn3 () {
  console.log('trigger fn3', arguments);
});

event.trigger('A', 'haha', 'yes');
event.trigger('B', 'hehe', 'yes');
event.off('A', fn1);
event.trigger('A', 'haha', 'yes');
