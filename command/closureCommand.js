/*
 * 使用闭包实现命令模式，相比function实现方式，
 * 保存了命令接受者的引用receiver
 */


var setCommand = function (button, command) {
  button.onclick = function () {
    command.execute();
  }
};

var MenuBar = {
  refresh: function () {
    console.log('refresh');
  }
};

var RefreshCommand = function (receiver) {
  return {
    execute: function () {
      receiver.refresh();
    }
  }
};

var refreshCommand = RefreshCommand(MenuBar);

setCommand(button1, refreshCommand);
