/*
 * 命令模式的面向对象实现
 */


var Tv = {
    open: function() {
        console.log('open tv');
    },
    close: function() {
        console.log('close tv');
    }
};

var createCommand = function(receiver) {
    var execute = function() {
        return receiver.open();
    };
    
    var undo = function() {
        return receiver.close();
    };

    return {
        execute: execute,
        undo: undo
    }
};

var setCommand = function(command) {
    document.getElementById('open').onclick = function() {
        command.execute();
    }
    document.getElementById('close').onclick = function() {
        command.undo();
    }
};

setCommand(createCommand(Tv));
