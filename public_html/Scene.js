function Scene(objects, gameEngine, number) {
  this.objects = objects;
  this.game = gameEngine;
  this.number = number;
}

Scene.prototype.init = function() {
  for(var i = 0; i < this.objects.length; i++) {
    this.objects[i].removeFromWorld = false;
    this.game.addEntity(this.objects[i]);

    if(this.objects[i].type === "hero") {
      if(this.number === 2) {
        console.log("change");
        this.objects[i].x = 1;
        this.objects[i].y = 300
      }
    }
  }
};

Scene.prototype.remove = function() {
  for(var i = 0; i < this.objects.length; i++) {
    this.objects[i].removeFromWorld = true;
  }
};
