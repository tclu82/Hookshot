function Scene(objects, gameEngine, number, startTimer, stopTimer) {
  this.objects = objects;
  this.game = gameEngine;
  this.number = number;
  this.startTimer = startTimer;
  this.stopTimer = stopTimer
};

Scene.prototype.init = function() {
  for(var i = 0; i < this.objects.length; i++) {
    this.objects[i].removeFromWorld = false;
    this.game.addEntity(this.objects[i]);

    if(this.objects[i].type === "hero") {
        this.objects[i].x = this.objects[i].StartX;
        this.objects[i].y = this.objects[i].StartY;;
      // if(this.number === 1) {
      //   this.objects[i].x = 100;
      //   this.objects[i].y = 1;
      // }
      // else if(this.number === 2) {
      //   this.objects[i].x = 96;
      //   this.objects[i].y = 300;
      // }
      // else if(this.numer === 3) {
      //   this.objects[i].x = 100;
      //   this.objects[i].y = 640;
      // }
    }
  }
};

Scene.prototype.remove = function() {
  for(var i = 0; i < this.objects.length; i++) {
    this.objects[i].removeFromWorld = true;
  }
};
