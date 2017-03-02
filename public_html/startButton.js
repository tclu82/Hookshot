function StartButton(x, y, game) {
  this.x = x;
  this.y = y;
  this.game = game;
  this.width = 650;
  this.height = 125;
}

StartButton.prototype.update = function() {
    if (this.game.clicked) {

      //music, start the bgm from the beginning.
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();

      this.targetX = this.game.click.x;
      this.targetY = this.game.click.y;
      if((this.targetY >= this.y && this.targetY <= this.y + this.height) &&
          (this.targetX >= this.x && this.targetX <= this.x + this.width)) {
          this.game.changeScene = true;
          this.game.nextScene = 1;
        }
    }

};

StartButton.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.lineWidth = 7;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.font = "60px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Start the Adventure", 600, 650);
};
