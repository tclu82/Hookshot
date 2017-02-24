function Map(game, map) {
    this.game = game;
    this.type = "map";
    this.rows = 13;
    this.cols = 38;
    this.map = map;
    this.removeFromWorld = false;
    this.mapBlocks = new Array(this.rows);

    for (var i = 0; i < this.rows; i++) {
        this.mapBlocks[i] = new Array(this.cols / 2);
    }
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.mapBlocks[i][j] = new Block(game, j * 64, i * 64, map[i][j]);
        }
    }
}

Map.prototype.update = function () {

    if (this.game.rightEdge === true) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 19; j < this.cols; j++) {
                var newX = j - 19;
                this.mapBlocks[i][newX] = new Block(this.game, newX * 64, i * 64, this.map[i][j]);
            }
        }
        this.game.rightEdge = false;
    } else if (this.game.leftEdge === true) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < 19; j++) {
                this.mapBlocks[i][j] = new Block(this.game, j * 64, i * 64, this.map[i][j]);
            }
        }
        this.game.leftEdge = false;
    }

};

Map.prototype.draw = function (ctx) {

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            var tile = this.mapBlocks[i][j];
            tile.draw(ctx);
            tile.update(this);
        }
    }
};
