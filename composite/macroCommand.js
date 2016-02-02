/*
 * 组合模式，本例组合多个命令，实现树形结构
 */


var MacroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command);
    },
    execute: function () {
      for (var i = 0, command; command = this.commandList[i++]; ) {
        command.execute();
      }
    }
  }
};


var openTvCommand = {
  execute: function() {
    console.log('open TV');
  }
};

var openLightCommand = {
  execute: function() {
    console.log('open light');
  }
};

var closeDoorCommand = {
  execute: function() {
    console.log('close door');
  }
};

var openAudioCommand = {
  execute: function() {
    console.log('close audio');
  }
};

macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openLightCommand);

macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);

macroCommand = MacroCommand();
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);
macroCommand.add(openAudioCommand);

macroCommand.execute();
