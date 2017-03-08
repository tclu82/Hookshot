function NextButton(x, y, game) {
  this.x = x;
  this.y = y;
  this.game = game;
  this.width = 650;
  this.height = 125;
}

NextButton.prototype.update = function() {
    if (this.game.clicked) {
      this.targetX = this.game.click.x;
      this.targetY = this.game.click.y;
      if((this.targetY >= this.y && this.targetY <= this.y + this.height) &&
          (this.targetX >= this.x && this.targetX <= this.x + this.width)) {
          this.game.changeScene = true;
          this.game.nextScene++;
        }
    }

};

NextButton.prototype.draw = function(ctx) {
  ctx.font = "60px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Click for Next Level", 600, 650);
};
