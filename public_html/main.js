function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {

    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = this.elapsedTime - this.totalTime;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;

    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
            index * this.frameWidth + offset, vindex * this.frameHeight + this.startY, // source from sheet
            this.frameWidth, this.frameHeight,
            locX, locY,
            this.frameWidth * scaleBy,
            this.frameHeight * scaleBy);

};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    if (!this.loop && this.elapsedTime >= this.totalTime) {
        this.elapsedTime -= this.frameDuration;
        return false;
    } else {
        return (this.elapsedTime >= this.totalTime);
    }
};



//Entity Area

var mapArray = [[2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 1, 1, 1, 0, 8, 0, 8, 0, 8, 0, 8, 1, 1],
                [1, 0, 8, 0, 8, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 9, 9, 9, 9, 9, 9, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 7, 6, 6, 6, 4, 6, 6, 6, 7, 1],
                [1, 1, 1, 1, 4, 4, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ];

var AM = new AssetManager();

AM.queueDownload("./img/horz_walk_left.png");
AM.queueDownload("./img/horz_walk_right.png");
AM.queueDownload("./img/right_jump.png");
AM.queueDownload("./img/left_jump.png");
AM.queueDownload("./img/background_tile.png");
AM.queueDownload("./img/lava.png");
AM.queueDownload("./img/stonebackground.png");
AM.queueDownload("./img/skeleton_spike2.png");
AM.queueDownload("./img/SpikeWithSkull2.png");
AM.queueDownload("./img/Empty_Spike2.png");
AM.queueDownload("./img/torch.png");
AM.queueDownload("./img/surface_lava.png");
AM.queueDownload("./img/shot.png");
AM.queueDownload("./img/right_forward_fall.png");
AM.queueDownload("./img/right_forward_facing_fall_death.png");
AM.queueDownload("./img/forward_facing_spike_death.png");
AM.queueDownload("./img/left_forward_facing_spike_death.png");
AM.queueDownload("./img/leftlavaSide.png");
AM.queueDownload("./img/lavarightside.png");
AM.queueDownload("./img/BrokenTile.png");
AM.queueDownload("./img/right_swing.png");
AM.queueDownload("./img/left_swing.png");
AM.queueDownload("./img/left_stand.png");
AM.queueDownload("./img/right_stand.png");
AM.queueDownload("./img/left_fall_forward.png");
AM.queueDownload("./img/left_fall_forward_death.png");


AM.downloadAll(function () {

    var canvas = document.getElementById("GameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.ctx = ctx;
    var bg = new Background(gameEngine);
    var map = new Map(gameEngine, mapArray);
    var hero = new Hero(gameEngine, 100, 0);
    var hookshot = new Hookshot(gameEngine, hero);

    gameEngine.init(ctx);
    gameEngine.addEntity(bg);
    gameEngine.addEntity(map);
    gameEngine.addEntity(hookshot);
    gameEngine.addEntity(hero);

    gameEngine.start();
});
