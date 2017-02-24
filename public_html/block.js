function Block(game, x, y, type) {
    this.type = type;
    this.game = game;
    this.x = x;
    this.y = y;
    this.spriteHeight = 32;
    this.spriteWidth = 32;
    //this.scale = 2;
    this.height = 64;
    this.width = 64;
    this.torch = new Animation(AM.getAsset("./img/torch.png"), 0, 0, 59, 148, .03, 50, true, false);
    this.surfaceLava = new Animation(AM.getAsset("./img/surface_lava.png"), 1, 0, 40, 56, .05, 50, true, false);
    this.lava = new Animation(AM.getAsset("./img/lava.png"), 0, 0, 143, 143, .05, 62, true, false);

}

Block.prototype.update = function () {

};

Block.prototype.draw = function (ctx) {

     ctx.save();
     ctx.beginPath();
     ctx.strokeStyle ="Blue";
     ctx.rect(this.x, this.y, this.width, this.height);
     ctx.stroke();
     ctx.restore();



    if (this.type === 1) {
        // Floor
        ctx.drawImage(AM.getAsset("./img/background_tile.png"),
                0, 0, // source from sheet
                512, 512,
                this.x, this.y,
                this.height,
                this.width);
    } else if (this.type === 2) {
        // Roof
        ctx.drawImage(AM.getAsset("./img/background_tile.png"),
                0, 0, // source from sheet
                512, 512,
                this.x, this.y,
                this.height,
                this.width);

    } else if (this.type === 5) {

        this.lava.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y, 2.3);

    } else if (this.type === 4) {
        ctx.drawImage(AM.getAsset("./img/skeleton_spike2.png"),
                83, 0, // source from sheet
                270, 382,
                this.x, this.y,
                this.height,
                this.width);
    } else if (this.type === 6) {
        ctx.drawImage(AM.getAsset("./img/Empty_Spike2.png"),
                83, 0, // source from sheet
                270, 382,
                this.x, this.y,
                this.height,
                this.width);
    } else if (this.type === 7) {
        ctx.drawImage(AM.getAsset("./img/SpikeWithSkull2.png"),
                83, 0, // source from sheet
                270, 382,
                this.x, this.y,
                this.height,
                this.width);
    } else if (this.type === 8) {
        this.torch.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
    } else if (this.type === 9) {
        this.surfaceLava.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y, 2.7);
    } else if (this.type === 10) {
        ctx.drawImage(AM.getAsset("./img/lavarightside.png"),
              0, 0, // source from sheet
              512, 512,
              this.x, this.y,
              this.height,
              this.width);

    } else if (this.type === 11) {
        ctx.drawImage(AM.getAsset("./img/leftlavaSide.png"),
            0, 0, // source from sheet
            512, 512,
            this.x, this.y,
            this.height,
            this.width);

    } else if (this.type === 12) {
              ctx.drawImage(AM.getAsset("./img/BrokenTile.png"),
                  0, 0, // source from sheet
                  512, 512,
                  this.x, this.y,
                  this.height,
                  this.width);
    }
};
