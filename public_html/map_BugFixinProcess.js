function Map(game, map) {
    this.game = game;
    this.type = "map";
    this.rows = 13;
    this.cols = 38;
    this.map = map;
    this.backupMapLeft = new Array(this.rows);
    this.backupMapRight = new Array(this.rows);
    this.removeFromWorld = false;
    this.mapBlocks = new Array(this.rows);
    this.firsthalf = false;
    this.secondhalf = false;

    for (var i = 0; i < this.rows; i++) {
        this.mapBlocks[i] = new Array(this.cols/2);
        this.backupMapLeft[i] = new Array(this.cols/2);
        this.backupMapRight[i] = new Array(this.cols/2);

    }

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.mapBlocks[i][j] = new Block(game, j * 64, i * 64, map[i][j]);
        }
        console.log("FIRST LEFT LOADED");
    }
}

Map.prototype.update = function () {

  // ENTERING THE RIGHT SIDE OF THE MAP
    if (this.game.rightEdge === true) {
       this.backupMapLeft = this.mapBlocks;

        if (!this.secondHalf) {

        for (var i = 0; i < this.rows; i++) {
            for (var j = 19; j < this.cols; j++) {
                var newX = j - 19;
                this.mapBlocks[i][newX] = new Block(this.game, newX * 64, i * 64, this.map[i][j]);
            }
        }
        this.secondHalf = true;
        console.log("loaded first Right");

      }

       else {
         console.log("Loading Old right");


        this.mapBlocks = this.backupMapRight;
        }
        this.game.rightEdge = false;


    }
////////////////////////////////////////////

// ENTERING THE LEFT SIDE OF THE MAP
    else if (this.game.leftEdge === true) {

       console.log("Loaded Old Left");

    this.backupMapRight = this.mapBlocks;
    console.log(this.mapBlocks);

    this.mapBlocks = this.backupMapLeft;
    console.log(this.mapBlocks);
    this.game.leftEdge = false;

    }

  /////////////////////////////////////////////////

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
