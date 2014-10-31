//
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = window.Asteroids.Util = function () {};

  Util.inherits = function (superClass, subClass) {
    function F() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();

  };

  Util.randomVec = function(length) {
    var xpolarity = (Math.random() > .5 ? -1 : 1)
    var ypolarity = (Math.random() > .5 ? -1 : 1)

    return [(length * Math.random() * xpolarity), (length * Math.random() * ypolarity)];
  }

  Util.getVel = function (pos, event) {
    var target = [event.x, event.y];
    var distance = Math.sqrt(Math.pow((pos[0] - target[0]), 2) + Math.pow((pos[1] - target[1]), 2));
    var factor = distance/12;
    var newX = (target[0] - pos[0]) / factor;
    var newY = (pos[1] - target[1]) / factor;

    return [newX, newY * -1];

  }

})();
