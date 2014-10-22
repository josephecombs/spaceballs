(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;
  var Ship = Asteroids.Ship;

  //TODO: Pass in the event because we want the bullet to fire on click
  var Bullet = Asteroids.Bullet = function (event, pos, game) {

    var vel = Util.getVel(pos, event);
    MovingObject.call(this, pos, vel, 3, 'white', game);
    this.wrappable = false;
  }

  Util.inherits(MovingObject, Bullet);


  Bullet.prototype.draw = function (ctx) {

      ctx.fillStyle = this.color;
      ctx.beginPath();

      ctx.arc(
        this.pos[0],
        this.pos[1],

        7,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();

  }

  Bullet.prototype.remove = function () {
    var bullets = this.game.bullets;
    var index = bullets.indexOf(this);
    if (index !== 0) {
      index = index - 1
    }
    this.game.bullets = bullets.slice(0, index).concat(bullets.splice(index + 1, bullets.length));
  }

})();
