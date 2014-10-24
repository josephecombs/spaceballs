//

//draw

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;



  var Asteroid = Asteroids.Asteroid = function (pos, game, size) {
    if (size) {
      this.size = size
    } else {
      this.size = (Math.random() * 100)
    }
    var newVel = Util.randomVec(10);
    MovingObject.call(this, pos, newVel, this.size, Asteroid.COLOR, game);
    this.wrappable = true;
  }

  Util.inherits(MovingObject, Asteroid);

  Asteroid.COLOR = "#4042A8";
  Asteroid.RADIUS = (Math.random() * 100) + 10;

  Asteroid.prototype.draw = function (ctx) {
    var grd = ctx.createRadialGradient(150, 750, 10, 150, 750, 700);
    grd.addColorStop(0, 'black');
    grd.addColorStop(.5, '#15153D');
    grd.addColorStop(1, '#4042A8');


    ctx.fillStyle = grd;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],

      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

  };
  Asteroid.prototype.remove = function() {

    var asteroids = this.game.asteroids;
    var asteroid = this;
    var newAsteroids = [];
    this.game.asteroids.forEach(function(ast) {
      if (ast !== asteroid) {
        newAsteroids.push(ast);
      }
    });
    this.game.asteroids = newAsteroids;
    if (this.radius > 30) {
      this.explode();
    }
  }


  Asteroid.prototype.explode = function() {

    var rando = Math.floor(Math.random() * 3 + 1);
    for (var i = 0; i < rando; i++) {
      var newVX = Util.randomVec(this.vel[0]);
      var newVY = Util.randomVec(this.vel[1]);
      var newX = this.pos[0];
      var newY = this.pos[1];
      var newSize = Math.max((this.size / rando), 7);

      this.game.asteroids.push(new Asteroid([newX, newY], this.game, newSize))
      }
    }


})();
