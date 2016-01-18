/* 和getInstance()的本质不同是将创建单例对象的过程分离
 * getSingleFactory()更像一个生产单例函数的工厂
 */

var getSingleFactory = function(fn) {
  var result = null;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

function Div(name){ this.name = name }
function Iframe(name){ this.name = name }

var createSingleDiv = function() {
  var div = new Div();
  console.log('create a singleton div');
  return div;
};

var createSingleIframe = function() {
  var iframe = new Iframe();
  console.log('create a singleton iframe');
  return iframe;
}


var getDiv = getSingleFactory(createSingleDiv);
var getIframe = getSingleFactory(createSingleIframe);

console.log(getDiv());
console.log(getDiv());
console.log(getIframe());
