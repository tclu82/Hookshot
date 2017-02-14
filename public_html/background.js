function Background(game) {
    this.type = "background";
    this.x = 0;
    this.y = 400;
    this.radius = 200;
}

Background.prototype.update = function () {
};

Background.prototype.draw = function (ctx) {
    ctx.save();

    ctx.drawImage(AM.getAsset("./img/stonebackground.png"),
            0, 0, // source from sheet
            1190, 798,
            0, 0,
            1200,
            800);
    ctx.restore();
};
