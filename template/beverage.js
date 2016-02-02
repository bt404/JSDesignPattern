var Beverage = function (params) {
  var boil = function () {
    console.log('烧水');
  };

  var brew = params.brew || function () {
    throw new Error('必须传递brew方法');
  };

  var pourInCup = function () {
    console.log('倒杯');
  };

  var addCondiments = params.addCondiments || function () {
    throw new Error('必须传递addCondiments方法');
  };

  var F = function () {};

  F.prototype.init = function () {
    boil();
    brew();
    pourInCup();
    addCondiments();
  };

  return F;
};

var Coffee = Beverage({
  brew: function () {
    console.log('冲咖啡');
  },
  addCondiments: function () {
    console.log('加糖');
  },
});

var Tea = Beverage({
  brew: function () {
    console.log('泡茶叶');
  },
  addCondiments: function () {
    console.log('加柠檬');
  },
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
