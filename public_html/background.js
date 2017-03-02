function Background(game, path, width, height) {
    this.type = "background";
    this.path = path;
    this.width = width;
    this.height = height;
    this.removeFromWorld = false;
}


Background.prototype.update = function () {
};

Background.prototype.draw = function (ctx) {
    ctx.save();

    ctx.drawImage(AM.getAsset(this.path),
            0, 0, // source from sheet
            this.width, this.height,
            0, 0,
            this.width * 1.03, this.height * 1.03);
    ctx.restore();
};
