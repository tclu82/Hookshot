function Block(game, x, y, type) {
    this.type = type;
    this.game = game;
    this.removeFromWorld = false;
    this.x = x;
    this.y = y;
    this.landed = true;
    this.movingRight = true;
    this.fallCounter = 0;
    this.slideCounter = 0;
    this.fallspeed = 8;
    this.slidespeed = 2;
    this.spriteHeight = 32;
    this.spriteWidth = 32;
    this.height = 64;
    this.width = 64;
    this.locked = true;
    this.inventory = [];
    this.chest_opening = null;
    this.door_opening = null;


    this.dripInterval =(Math.random() * 300) + 100;
    this.currentDripCount = 0;
    this.lavaDripping = null;

    this.chestAnimation = new Animation(AM.getAsset("./img/chest_open_rightside.png"), 0, 0, 47, 44, .05, 49, false, false, true);
    this.torch = new Animation(AM.getAsset("./img/torch.png"), 0, 0, 59, 148, .03, 50, true, false);
    this.surfaceLava = new Animation(AM.getAsset("./img/surface_lava.png"), 1, 0, 40, 56, .05, 50, true, false);
    this.lava = new Animation(AM.getAsset("./img/lava.png"), 0, 0, 143, 143, .05, 62, true, false);
    this.animation_door = new Animation(AM.getAsset("./img/doors.png"), 0, 0, 96, 96, .05, 12, false, false, true);
    this.lava_roof = new Animation(AM.getAsset("./img/lavaCeiling.png"), 0, 0, 121, 117, .05, 50, true, false);
    this.animation_lava_drip = new Animation(AM.getAsset("./img/drip.png"), 0, 0, 24, 24, .03, 50, true, false);

    if (this.type === 15) {
        this.height = 64;
    }

}

Block.prototype.collisionCheck = function() {


    // Get the Map out of the Games Entity list
    var map = null;
    var hero = null;
    for (var i = 0; i < this.game.entities.length; i++) {
        var e = this.game.entities[i];
        if (e.type === "map") {
            map = e;
        }
        if(e.type === "hero") {
          hero = e;
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

    if (this.type === 12 && hero.inventory.invincibility === null) {

        if(hero.y <= this.y + this.height &&
            hero.y >= (this.y + this.height) - hero.jumpSpeed  &&
            ((hero.x <= this.x + this.width && hero.x >= this.x) ||
            (hero.x + hero.width > this.x &&
            hero.x < this.x + this.width))) {
                hero.crushDeath = true;
        }

    }

    else if (this.type === 18 && hero.inventory.invincibility === null) {

        if (hero.x < this.x + this.width - 35 &&
            hero.x + hero.width > this.x + 35 &&
            hero.y < this.y + this.height - 35 &&
            hero.height + hero.y > this.y + 35) {

            hero.lavaDeath = true;

        }
    }


    // Detection for hitting a Block
    for (var i = gridYStart; i <= gridYEnd; i++) {
        for (var j = gridXStart; j <= gridXEnd; j++) {
            var block = map.mapBlocks[i][j];

            // If its block type 1

            if (block.type === 1 || block.type === 5 || block.type === 9 || block.type === 4 || block.type === 7) {

                // Head
                if (this.type === 12 && this.y >= block.y - 8) {

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

    else if (this.type === 12 && !this.landed) {
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

    else if (this.type === 15) {
        // Moving blocks from the left to the right for x distance
        // then move back to initial point.


        if (this.movingRight) {
            this.x += this.slidespeed;

            this.slideCounter += this.slidespeed;
        }
        else {
            this.x -= this.slidespeed;
            this.slideCounter -= this.slidespeed;

        }





        var newX = Math.floor(this.x / this.width);
        var newY = Math.floor(this.y / this.height);


        if (this.slideCounter >= this.width * 2 && this.movingRight) {
            this.movingRight = false;

        }
        else if (this.slideCounter <= 0 && !this.movingRight) {
            this.movingRight = true;

        }

        map.mapBlocks[currentY][currentX] = new Block(this.game, prevY, prevX, 0);
        var newBlock = new Block(this.game, this.x, this.y, 15);
        newBlock.slideCounter = this.slideCounter;
        newBlock.movingRight = this.movingRight;
        map.mapBlocks[newY][newX] = newBlock;


    }

    else if (this.type === 17) {
        this.currentDripCount++;

        if (this.currentDripCount >= this.dripInterval && this.lavaDripping === null) {
            this.currentDripCount = 0;
            var drippingLavaBlock = new Block(this.game, this.x, this.y + 64, 18);

            var newX = Math.floor(drippingLavaBlock.x / this.width);
            var newY = Math.floor(drippingLavaBlock.y / this.height);
            map.mapBlocks[newY][newX] = drippingLavaBlock;


        }

    }

    else if (this.type === 18) {
        this.y += this.fallspeed;
        this.collisionCheck();
    }
};

Block.prototype.draw = function (ctx) {
//
//    if (this.type === 13) {
//      ctx.save();
//      ctx.beginPath();
//      ctx.strokeStyle ="Blue";
//      ctx.rect(this.x, this.y, this.width, this.height);
//      ctx.stroke();
//      ctx.restore();
//    }




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
      if (this.chest_opening) {

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
    else if (this.type === 4) {
      ctx.drawImage(AM.getAsset("./img/skeleton_spike2.png"),
              83, 0, // source from sheet
              270, 382,
              this.x, this.y,
              this.height,
              this.width);
    }
    else if (this.type === 5) {

        this.lava.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y, 1.3);


    }
    else if (this.type === 6) {
        ctx.drawImage(AM.getAsset("./img/Empty_Spike2.png"),
                83, 0, // source from sheet
                270, 382,
                this.x, this.y,
                this.height,
                this.width);
    }
    else if (this.type === 7) {
        ctx.drawImage(AM.getAsset("./img/SpikeWithSkull2.png"),
                83, 0, // source from sheet
                270, 382,
                this.x, this.y,
                this.height,
                this.width);
    }
    else if (this.type === 8) {
        this.torch.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
    }
    else if (this.type === 9) {
        this.surfaceLava.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y, 2.7);
    }
    else if (this.type === 10) {
        ctx.drawImage(AM.getAsset("./img/lavarightside.png"),
              0, 0, // source from sheet
              512, 512,
              this.x, this.y,
              this.height,
              this.width);

    }
    else if (this.type === 11) {
        ctx.drawImage(AM.getAsset("./img/leftlavaSide.png"),
            0, 0, // source from sheet
            512, 512,
            this.x, this.y,
            this.height,
            this.width);

    }
    else if (this.type === 12) {

              ctx.drawImage(AM.getAsset("./img/BrokenTile.png"),
                  0, 0, // source from sheet
                  512, 512,
                  this.x, this.y,
                  this.height,
                  this.width);
    }
    else if (this.type === 13) {
        if (this.door_opening) {
            this.animation_door.drawFrame(this.game.clockTick, ctx, this.x, this.y - 20, 1);
        }
        else {
                ctx.drawImage(AM.getAsset("./img/doors.png"),
                0 , 0,  // source from sheet
                96, 96,
                this.x, this.y - 20,
                96,
                96);
        }
     }
     else if (this.type === 14) {
      ctx.drawImage(AM.getAsset("./img/doors.png"),
            0 , 0,  // source from sheet
            96, 96,
            this.x, this.y - 20,
            96,
            96);
        }

     else if (this.type === 15) {
         ctx.drawImage(AM.getAsset("./img/background_tile.png"),
                0, 0, // source from sheet
                512, 512,
                this.x, this.y,
                this.width,
                this.height);

//        ctx.drawImage(AM.getAsset("./img/background_tile.png"),
//                0, 0, // source from sheet
//                512, 512,
//                this.x, this.y,
//                this.height,
//                this.width);

     }
    else if (this.type === 17) {
            this.lava_roof.drawFrame(this.game.clockTick, ctx, this.x - 5, this.y - 7, 1.2);

    }

    else if (this.type === 18) {
        this.animation_lava_drip.drawFrame(this.game.clockTick, ctx, this.x + this.width / 4, this.y, 1.2);


    }

    else if (this.type === 19) {
      if (this.chest_opening) {

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
};
