// (function () {
//   if (typeof Asteroids === 'undefined') {
//     window.Asteroids = {};
//   }
//
//
//   var MovingObject = window.Asteroids.MovingObject;
//   var Util = window.Asteroids.Util;
//   var Ship = window.Asteroids.Ship;
//
//
//   var Bullet = Asteroids.Asteroid = function (ship) {
//     var pos = ship.pos;
//     var vel = ship.vel;
//     MovingObject.call(this, pos, vel, (Math.random() * 100), Asteroid.COLOR, game);
//   }
//
//   Util.inherits(MovingObject, Asteroid);
//
//   Asteroid.COLOR = "white";
//   Asteroid.RADIUS = (Math.random() * 100) + 10;
//
// })();