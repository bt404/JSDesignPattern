var Tv = {
    open: function() {
        console.log('open tv');
    },
    close: function() {
        console.log('close tv');
    }
};

var createCommand = function(receiver) {
    var open = function() {
        return receiver.open();
    };
    
    var close = function() {
        return receiver.close();
    };

    return {
        open: open,
        close: close
    }
};

var setCommand = function(command) {
    document.getElementById('open').onclick = function() {
        command.open();
    }
    document.getElementById('close').onclick = function() {
        command.close();
    }
};

setCommand(createCommand(Tv));
