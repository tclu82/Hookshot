function Block(game, x, y, type) {
    this.type = type;
    this.game = game;
    this.removeFromWorld = false;
    this.x = x;
    this.y = y;
    this.landed = true;
    this.fallCounter = 0;
    this.fallspeed = 8;
    this.spriteHeight = 32;
    this.spriteWidth = 32;
    this.height = 64;
    this.width = 64;
    this.locked = true;
    this.inventory = [];
    this.opening = null;
    this.chestAnimation = new Animation(AM.getAsset("./img/chest_open_rightside.png"), 0, 0, 47, 44, .05, 49, false, false, true);
    this.torch = new Animation(AM.getAsset("./img/torch.png"), 0, 0, 59, 148, .03, 50, true, false);
    this.surfaceLava = new Animation(AM.getAsset("./img/surface_lava.png"), 1, 0, 40, 56, .05, 50, true, false);
    this.lava = new Animation(AM.getAsset("./img/lava.png"), 0, 0, 143, 143, .05, 62, true, false);

}

Block.prototype.collisionCheck = function() {
    

    // Get the Map out of the Games Entity list
    var map = null;
    for (var i = 0; i < this.game.entities.length; i++) {
        var e = this.game.entities[i];
        if (e.type === "map") {
            map = e;
        }
    }


    var gridY = Math.round(map.rows * (this.y / (64 * map.rows)));
    var gridX = Math.round(map.cols * (this.x / (64 * map.cols)));

    if (gridX < 0)
        gridX = 0;
    if (gridY < 0)
        gridY = 0;

    var gridXStart = gridX - 1;
    var gridYStart = gridY - 1;
    if (gridXStart < 0)
        gridXStart = 0;
    if (gridYStart < 0)
        gridYStart = 0;

    var gridXEnd = gridX + 1;
    var gridYEnd = gridY + 1;
    if (gridXEnd >= map.cols)
        gridXEnd = map.cols - 1;
    if (gridYEnd >= map.rows)
        gridYEnd = map.rows - 1;


    // Detection for hitting a Block
    for (var i = gridYStart; i <= gridYEnd; i++) {
        for (var j = gridXStart; j <= gridXEnd; j++) {
            var block = map.mapBlocks[i][j];

            // If its block type 1

            if (block.type === 1 || block.type === 5 || block.type === 9) {

                // Head
                if (this.y >= block.y - 8) {

                    this.landed = true;
                }


            }

        }
    }
};

Block.prototype.update = function (map) {
    
    var currentX = Math.floor(this.x / this.width);
    var currentY = Math.floor(this.y / this.height);
    var prevX = this.x;
    var prevY = this.y;
    
    if(this.type === 3) {
            this.inventory = new Key();
        }
    
    if (this.type === 12 && !this.landed) {
        this.y += this.fallspeed;
        this.fallCounter += this.fallspeed;
        
        
        if (this.fallCounter >= 64) {
            this.fallCounter = 0;
            
            var newX = Math.floor(this.x / this.width);
            var newY = Math.floor(this.y / this.height);

          
           map.mapBlocks[currentY][currentX] = new Block(this.game, prevY, prevX, 0);
           var newBlock = new Block(this.game, this.x, this.y, 12);
           newBlock.landed = false;
           map.mapBlocks[newY][newX] = newBlock;
            
        }
        this.collisionCheck();
        
       
    }

};

Block.prototype.draw = function (ctx) {

    //  ctx.save();
    //  ctx.beginPath();
    //  ctx.strokeStyle ="Blue";
    //  ctx.rect(this.x, this.y, this.width, this.height);
    //  ctx.stroke();
    //  ctx.restore();



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

    }
    
    else if (this.type === 3) {
        
        
          
      if (this.opening) {
          
        this.chestAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.6);
    
      }
      else {
        ctx.drawImage(AM.getAsset("./img/chest_open_rightside.png"),
                    0 , 0,  // source from sheet
                    44, 44,
                    this.x, this.y,
                    44 * 1.6,
                    44 * 1.6);
      }
    }


  
    else if (this.type === 5) {

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
    }   else if (this.type === 13) {
                ctx.drawImage(AM.getAsset("./img/door.png"),
                0 , 0,  // source from sheet
                94, 60,
                this.x, this.y,
                94,
                60);  }
};