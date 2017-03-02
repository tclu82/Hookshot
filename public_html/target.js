function Target(game) {
    this.x = 0;
    this.y = 0;
    this.size = 32;
    this.game = game;
}

Target.prototype.draw = function(ctx) {


    ctx.drawImage(AM.getAsset("./img/target.png"),
        0, 0,
        256, 256,
        this.x - (this.size / 2), this.y - (this.size/ 2),
        this.size,
        this.size);

};

Target.prototype.update = function() {
    this.x = this.game.mousePos.x;
    this.y = this.game.mousePos.y;

};
