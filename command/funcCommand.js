/*
 * 命令模式function实现
 */


var setCommand = function (button, func) {
  button.onclick = func;
};

var MenuBar = {
  refresh: function () {
    console.log('refresh');
  }
};

var SubMenu = {
  add: function () {
    console.log('add sub menu');
  },
  remove: function () {
    console.log('remove sub menu');
  },
};

setCommand(button1, MenuBar.refresh);
setCommand(button2, SubMenu.add);
setCommand(button3, SubMenu.remove);
