(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var Asteroid = window.Asteroids.Asteroid;
  var Ship = window.Asteroids.Ship;


  //New Game constructor
  var Game = window.Asteroids.Game = function() {
    this.asteroids = [];
    this.ship = new Ship(this.randomPosition(), this);
    
  }; 
    
  Game.DIM_X = 750;
  Game.DIM_Y = 750;
  Game.NUM_ASTEROIDS = 5;
  
  Game.prototype.randomPosition = function() {
    return [Math.floor(Game.DIM_X * Math.random()), Math.floor(Game.DIM_Y * Math.random())];   
  };
  
  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };
  

  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.draw = function (ctx) {
   
    
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (thing) {
      thing.draw(ctx);
    });

  };

  Game.prototype.moveObjects = function() {
    
    this.allObjects().forEach( function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });
  };
  

  Game.prototype.checkCollisions = function () {
    var collidedObjects = [];
    var collisionObjects = this.allObjects();
    var that = this
    for(var i = 0; i < collisionObjects.length; i++) {
      var currentObject = collisionObjects.shift();
      collisionObjects.forEach(function(obj) {
        if (currentObject.isCollidedWith(obj)) {

          collidedObjects.push(currentObject);
          collidedObjects.push(obj);

        }
      })
      collisionObjects = collisionObjects.concat(currentObject);
    }
    return collidedObjects;
  };
  
  
  Game.prototype.wrap = function (pos, maxX, maxY, radius) {
    var pos = pos;
    if (pos[0] > (maxX + radius)) {
      pos[0] = (0 - radius);
    }
    if (pos[0] < (0 - radius)) {
      pos[0] = (maxX + radius);
    }
    
    if (pos[1] > (maxY + radius)) {
      pos[1] = (0 - radius);
    }
    
    if (pos[1] < (0 - radius)) {
      pos[1] += (maxY + radius);
    }
    
    return pos;
  };
  
  Game.prototype.deflect = function (ast1, ast2) {
    ast1.vel
    
  }
  
  Game.prototype.remove = function (asteroid) {
    if (asteroid instanceof Ship) {
      asteroid.relocate();
    } // else {
//     var posToDelete = this.asteroids.indexOf(asteroid);
//     delete this.asteroids[posToDelete];
//     }
  
    // var newArray = [];
  //   this.asteroids.forEach(function (el) {
  //     if (el !== undefined) {
  //       newArray.push(el);
  //     }
  //   });
  //   this.asteroids = newArray;
  };
  
  Game.prototype.step = function () {
   
    var that = this;
    this.moveObjects();
    var arrayToBeDeleted = this.checkCollisions();
    
    arrayToBeDeleted.forEach(function(el) {
      that.remove(el);
    })
    
  };

})();