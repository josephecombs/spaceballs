(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;
  var Game = window.Asteroids.Game = function() {
    this.asteroids = [];
    this.ship = new Ship(this.randomPosition, this);
    
  }; 
    
  Game.DIM_X = 750;
  Game.DIM_Y = 750;
  Game.NUM_ASTEROIDS = 4;
  
  Game.prototype.randomPosition = function() {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];   
  }
  
  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      //create a random position
      var pos = this.randomPosition();
      //construct an asteroid with that random position
      this.asteroids.push(new Asteroid(pos, this));
    }
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  
  };
  
  Game.prototype.moveObjects = function(ctx) {
    this.asteroids.forEach( function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });
  };
  
  Game.prototype.wrap = function (pos, maxX, maxY, radius) {
    var pos = pos;
    if (pos[0] >= (maxX + radius)) {
      pos[0] -= (maxX - radius);
    }
    if (pos[1] >= (maxY + radius)) {
      pos[1] -= (maxY - radius);
    }
    if (pos[0] < (0 - radius)) {
      pos[0] += (maxX + radius);
    }
    if (pos[1] < (0 - radius)) {
      pos[1] += (maxY + radius);
    }
    
    return pos;
  };
  
  Game.prototype.checkCollisions = function () {
    var collidedObjects = [];
    for(var i = 0; i < this.asteroids.length; i++) {
      var currentAsteroid = this.asteroids.shift();
      this.asteroids.forEach(function(ast) {
        if (currentAsteroid.isCollidedWith(ast)) {
          // currentAsteroid.remove(ast);
          collidedObjects.push(currentAsteroid);
          collidedObjects.push(ast);
         
        }
      })
      this.asteroids = this.asteroids.concat(currentAsteroid);
    }
    return collidedObjects;
  };
  
  Game.prototype.step = function () {
   
    var that = this;
    this.moveObjects();
    var arrayToBeDeleted = this.checkCollisions();
    console.log(arrayToBeDeleted);
    arrayToBeDeleted.forEach(function(el) {
      that.remove(el);
    })
    
  };
  
  Game.prototype.remove = function (asteroid) {
    var posToDelete = this.asteroids.indexOf(asteroid);
    delete this.asteroids[posToDelete];
    var newArray = [];
    this.asteroids.forEach(function (el) {
      if (el !== undefined) {
        newArray.push(el);
      }
    });
    this.asteroids = newArray;
  };
  
  Game.prototype.allObjects() = function () {
    return this.asteroids.push(this.ship);
  }
  
})();