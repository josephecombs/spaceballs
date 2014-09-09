(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MovingObject = window.Asteroids.MovingObject;
  var Ship = window.Asteroids.Ship = function (pos, game) {
    MovingObject.call(this, pos, 0, Ship.RADIUS, Ship.COLOR, game);
  };
  
  Ship.COLOR = 'red';
  Ship.RADIUS = 25;
  
})();