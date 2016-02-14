/*
 * 中介者模式实现游戏胜负统计
 */


/*
 * Player构造函数
 */
var Player = function (name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};

Player.prototype.win = function () {
  console.log(this.name + ' won');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lost');
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function () {
  playerDirector.ReceiveMessage('playerRemove', this);
};

Player.prototype.changeTeam = function (color) {
  playerDirector.ReceiveMessage('changeTeam', this, color);
};


/*
 * 工厂
 */
var playerFactory = function (name, teamColor) {
  var player = new Player(name, teamColor);
  playerDirector.ReceiveMessage('playerAdd', player);
  return player;
};


/*
 * 中介对象
 */
var playerDirector = (function () {
  var teams = {},
      operations = {};

  operations.playerAdd = function (player) {
    var teamColor = player.teamColor;
    teams[teamColor] = teams[teamColor] || [];
    teams[teamColor].push(player);
  };

  operations.playerRemove = function (player) {
    var teamColor = player.teamColor,
        teamPlayers = teams[teamColor];

    for (var i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  operations.changeTeam = function (player, newColor) {
    operations.playerRemove(player);
    player.teamColor = newColor;
    operations.playerAdd(player);
  };

  operations.playerDead = function (player) {
    var teamColor = player.teamColor,
        teamPlayers = teams[teamColor];


    var all_dead = true;

    for (var i = 0, player; player = teamPlayers[i++]; ) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead) {
      for (var i = 0, player; player = teamPlayers[i++]; ) {
        player.lose();
      }

      for (var color in teams) {
        if (color !== teamColor) {
          var enemies = teams[color];
          for (var i = 0, enemy; enemy = enemies[i++]; ) {
            enemy.win();
          }
        }
      }
    }
  };

  var ReceiveMessage = function () {
    var message = Array.prototype.shift.apply(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    ReceiveMessage: ReceiveMessage,
  }

})();

var player1 = playerFactory('Luffy', 'red');
var player2 = playerFactory('Zoro', 'red');
var player3 = playerFactory('Sorgeking', 'red');

var player4 = playerFactory('Chopper', 'blue');
var player5 = playerFactory('Sanji', 'blue');
var player6 = playerFactory('Franky', 'blue');

player1.die();
player2.die();
player4.changeTeam('red');
player3.die();
player4.die();
