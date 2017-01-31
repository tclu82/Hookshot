
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
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
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

function Hero(game, x, y) {
  this.type = "hero";
  this.animationRight = new Animation(AM.getAsset("./img/horz_walk_right.png"), 0, 0, 104, 128, .03 , 31, true, false);
  this.animationLeft = new Animation(AM.getAsset("./img/horz_walk_left.png"), 0, 0, 80, 128, .03 , 31, true, false);
  this.animationJumpRight = new Animation(AM.getAsset("./img/right_jump.png"), 0, 0, 96, 120, .1 , 12, false, false);
  this.animationJumpLeft = new Animation(AM.getAsset("./img/left_jump.png"), 12, 0, 83, 128, .1 , 12, false, false);
  this.animationFall = new Animation(AM.getAsset("./img/right_forward_fall.png"), 0, 0, 67, 60, .05 , 25, true, false);
  this.animationFallDeath = new Animation(AM.getAsset("./img/right_forward_facing_fall_death.png"), 0, 0, 131, 102, .05 , 25, false, false);
  this.game = game;
  this.x = x;
  this.y = y;
  this.speed = 275;
  this.jumpSpeed = 6;
  this.fallSpeed = 12;
  this.jumpMax = this.jumpSpeed * 20;
  this.jumpCurrent = 0;
  this.hooked = false;
  this.removeFromWorld = false;
  this.ctx = game.ctx;
  this.width = 40;
  this.height = 70;
  this.scale = .65;
  this.lastX = null;//
  this.lastY = null;//
  this.triggerFall = false;
  this.defaultFallDistance = 200;
  this.fallCount = 0;
  this.fallY = 580;
  this.fallDeath = false;
  this.hitGround = false;
}

Hero.prototype.update = function() {

  if (this.triggerFall) {

    this.fallCount += this.y - this.fallY;
    //console.log("caculate " + this.fallCount);
  //  console.log("New Addition: " + (this.y - this.fallY));
    this.fallY = this.y;

  }

  if (this.fallCount >= this.defaultFallDistance) {
    this.fallDeath = true;
  }

  if (this.game.tickCount >= 121) {
    var xDif = Math.abs(this.lastX - this.x);
    var yDif = Math.abs(this.lastY - this.y);
      if(xDif <= 64 && yDif > 3) {
        this.triggerFall = true;
      } else {
        this.triggerFall = false;
        this.fallCount = 0;
      }
      this.lastX = this.x;
      this.lastY = this.y;
      this.game.tickCount = 120;
  }

  if(this.game.rightEdge === true) {
    this.x = 1;
    this.y = 600;
  }

  if(this.game.leftEdge === true) {
    this.x = 1190;
    this.y = 600;
  }
  if (this.game.moveRight) {
    this.x += this.game.clockTick * this.speed;
  }
  if (this.game.moveLeft && !this.hooked) {
    this.x -= this.game.clockTick * this.speed;
  }


  if (this.game.jumping) {
    if (this.jumpCurrent < this.jumpMax) {
      this.y -= this.jumpSpeed;
      this.jumpCurrent += this.jumpSpeed;
    }
    else {
      this.game.jumping = false;
      this.animationJumpRight.elapsedTime = 0;
      this.animationJumpLeft.elapsedTime = 0;

    }
  }
  else {
    if (this.y < 800 && !this.hooked) {
      this.y += this.fallSpeed ;
      if (this.jumpCurrent > 0) {
        this.jumpCurrent -= this.fallSpeed;
      }
      if (this.jumpCurrent < 0) {
        this.jumpCurrent = 0;
      }
    }

  }
    this.collideCheck();


};

Hero.prototype.draw = function(ctx) {
    /*
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle ="Yellow";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    ctx.restore();

*/

    if (this.hitGround && this.fallDeath) {
      this.animationFallDeath.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y - 25, 1.5);

    }
    else if (this.fallDeath) {
      this.animationFall.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }
    else if (this.game.jumping) {
      if (this.game.direction === "right") {

        this.animationJumpRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
      }
        else if (this.game.direction === "left") {
          this.animationJumpLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        }

    }
    else if (this.game.moveRight) {
    this.animationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
    else if (this.game.moveLeft) {
      this.animationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }

  else if (!this.game.moveLeft && !this.game.moveRight) {
    switch (this.game.direction) {
      case "right":
        ctx.drawImage(AM.getAsset("./img/horz_walk_right.png"),
                  1150 , 0,  // source from sheet
                  85, 128,
                  this.x, this.y,
                  85 * this.scale,
                  128 * this.scale);

        break;

      case "left":
        ctx.drawImage(AM.getAsset("./img/horz_walk_left.png"),
                    330 , 0,  // source from sheet
                    85, 128,
                    this.x, this.y,
                    85 * this.scale,
                    128 * this.scale);

        break;
    }

  }


};

Hero.prototype.collideCheck = function() {


      // Get the Map out of the Games Entity list
    var map = null;
    for (var i = 0; i < this.game.entities.length; i++) {
      var e = this.game.entities[i];
      if (e.type === "map") {
        map = e;
      }
    }

    var gridY = Math.round(map.rows * (this.y  / (64 * map.rows)));
    var gridX = Math.round(map.cols * (this.x / (64 * map.cols)));

    if (gridX < 0) gridX = 0;
    if (gridY < 0) gridY = 0;
    if (gridX >= map.cols) gridX = map.cols - 1;
    if (gridY >= map.rows) gridY = map.rows - 1;

    // Detection for hitting a Block
    for (var i = 0; i < map.rows; i++) {
      for (var j = 0; j < map.cols; j++) {
        var block = map.mapBlocks[i][j];
        // If its block type 1

        if (block.type === 1) {

           //If Hero hits a block from the top with Hero's Feet
           if (this.y + this.height  <= block.y + this.fallSpeed &&
               this.y + this.height >= block.y &&
             ((this.x <= block.x + block.width && this.x >= block.x) ||
              (this.x + this.width >= block.x &&
               this.x  <= block.x + block.width))) {

                    this.y = block.y - this.height;
                    if(this.fallDeath) {
                      this.hitGround = true;
                    }
           }

           // Head
           if (this.y <= block.y + block.height &&
               this.y >= (block.y + block.height) - this.jumpSpeed * 2 &&
             ((this.x <= block.x + block.width && this.x >= block.x) ||
              (this.x + this.width > block.x &&
               this.x  < block.x + block.width))) {

                    this.y = block.y + block.height;
           }

           // left
            if (this.x + this.width > block.x  &&
                this.x < (block.x + block.width) &&
                this.x >= (block.x + block.width) - this.game.clockTick * this.speed &&
                this.y  < block.y + block.height &&
                this.height + this.y > block.y) {

                this.x = (block.x + block.width) + 1;

           }


           // right
           else if (this.x < block.x &&
                this.x + this.width > block.x &&
                this.x + this.width <= block.x + this.game.clockTick * this.speed &&
                this.y  < block.y + block.height &&
                this.height + this.y > block.y) {

                this.x = (block.x - this.width) - 3;

           }



        }


      }
    }

};

function Hookshot(game, hero) {
    this.type = "hookshot";
    this.owner = hero;
    this.game = game;
    this.swinging = false;
    this.swingDirection = null;
    this.hooked = false;
    this.startX = null;
    this.startY = null;
    this.currentX = null;
    this.currentY = null;
    this.targetX = null;
    this.targetY = null;
    this.height = null;
    this.width = null;
    this.length = null;
    this.currentDegree = 0;
    this.map = null;


}

Hookshot.prototype.update = function() {

    if (this.map === null) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var e = this.game.entities[i];
            if (e.type === "map") {
                this.map = e;
            }
        }
    }


    if (this.startX === null && this.startY === null) {
        this.startX = this.owner.x;
        this.startY = this.owner.y;
    }
        this.currentX = this.owner.x;
        this.currentY = this.owner.y;



    if (this.game.clicked) {

        this.swinging = true;
        this.targetX = this.game.click.x;
        this.targetY = this.game.click.y;
        this.swingDirection = this.game.direction;

        var gridY = Math.floor(this.map.rows * (this.targetY  / (64 * this.map.rows)));
        var gridX = Math.floor(this.map.cols * (this.targetX / (64 * this.map.cols)));


        if (gridX < 0) gridX = 0;
        if (gridY < 0) gridY = 0;

        if (this.map.mapBlocks[gridY][gridX].type === 1) {

            this.hooked = true;
            this.owner.hooked = true;


            this.height = ((this.startY + (this.owner.height / 2)) - this.targetY);
            this.width = ((this.startX + this.owner.width) - this.targetX);

            this.length = (Math.sqrt((this.width * this.width) + (this.height * this.height)));

            

          //  var diffX = this.startX - this.targetX;
          //  var diffY = this.startY - this.targetY;

          //  var swingDegree = (Math.atan(diffX / diffY) * (180 / Math.PI));

          //  swingDegree = 180 - (swingDegree * 2);

          //  console.log(this.length);

            this.swing(180);

        }

    }
    else {
        this.hooked = false;
        this.owner.hooked = false;
        this.swinging = false;
        this.startX = null;
        this.currentX = null;
        this.currentY = null;
        this.startY = null;
        this.targetX = null;
        this.targetY = null;
        this.height = null;
        this.width = null;
        this.length = null;
        this.currentDegree = 0;

    }

};



Hookshot.prototype.draw = function(ctx) {

    if (this.hooked && !this.game.clicked) {
        this.hooked = false;
        this.owner.hooked = false;
    }

    if (this.game.clicked && this.hooked) {

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "saddleBrown";
        ctx.lineWidth = 3;
        ctx.moveTo(this.currentX + this.owner.width,this.currentY + (this.owner.height / 2));
        ctx.lineTo(this.targetX,this.targetY);
        ctx.stroke();
        ctx.restore();

/*
             ctx.drawImage(AM.getAsset("./img/shot.png"),
                    0 , 563,  // source from sheet
                    800, 20,
                    this.startX, this.startY,
                    this.width,
                    this.height);

        */

    }
};

Hookshot.prototype.swing = function(endDegree) {

   // Math.radians = function(degrees) {
   //         return degrees * Math.PI / 180;
   //     };

    //var diffX = this.targetX - this.startX;
    //var diffY = this.targetY - this.startY;

    //var startDegree = (Math.atan(diffX / diffY)) * (180 / Math.PI);

    /*
    for (var degree = startDegree; degree <= 180 - startDegree; degree += 1) {
        this.owner.x = -Math.cos(Math.radians(degree) - 1) * length;
        this.owner.y = Math.sin(Math.radians(degree)) * length;

        console.log(this.owner.x);
        console.log(this.owner.y);

    }
    */

   /*
    Math.radians = function(degrees) {
            return degrees * Math.PI / 180;
        };

    var diffX = this.targetX - this.startX;
    var diffY = this.targetY - this.startY;

    var startDegree = (Math.atan(diffX / diffY)) * (180 / Math.PI);


    if (this.currentDegree <= 180 - startDegree) {
        this.owner.x = Math.cos(Math.radians(endDegree) - 1) * length;
        this.owner.y = Math.sin(Math.radians(endDegree)) * length;
        this.currentDegree += 5;

    }
    */


   //console.log(this.swingDirection);


   // HardeCODE HERE
    var quarter = endDegree / 5;

   if (this.currentDegree < endDegree && this.swingDirection === "right") {
       //console.log(this.currentDegree);
       if (this.currentDegree < quarter && this.currentDegree > 0) {
            this.owner.y += 3;
            this.owner.x += 5;

       }
       else if (this.currentDegree <= quarter * 2 && this.currentDegree >= quarter) {
            this.owner.y += 2;
            this.owner.x += 7;

       }
       else if (this.currentDegree <= quarter * 3 && this.currentDegree >= quarter * 2) {
            this.owner.x += 9;

       }
       else if (this.currentDegree <= quarter * 4 && this.currentDegree >= quarter * 3) {
            this.owner.y -= 2;
            this.owner.x += 7;

       }
       else if (this.currentDegree <= quarter * 5 && this.currentDegree >= quarter * 4) {
            this.owner.y -= 3;
            this.owner.x += 5;

       }


       this.currentDegree += (endDegree / 30) - (.004 * this.length)  ;
       this.owner.collideCheck();


   }

      else if (this.currentDegree < endDegree && this.swingDirection === "left") {
       //console.log(this.currentDegree);
       if (this.currentDegree < quarter && this.currentDegree > 0) {
            this.owner.y += 3;
            this.owner.x -= 5;

       }
       else if (this.currentDegree <= quarter * 2 && this.currentDegree >= quarter) {
            this.owner.y += 2;
            this.owner.x -= 7;

       }
       else if (this.currentDegree <= quarter * 3 && this.currentDegree >= quarter * 2) {
            this.owner.x -= 9;

       }
       else if (this.currentDegree <= quarter * 4 && this.currentDegree >= quarter * 3) {
            this.owner.y -= 2;
            this.owner.x -= 7;

       }
       else if (this.currentDegree <= quarter * 5 && this.currentDegree >= quarter * 4) {
            this.owner.y -= 3;
            this.owner.x -= 5;

       }


       this.currentDegree += (endDegree / 30) - (.004 * this.length) ;
       this.owner.collideCheck();
   }

   else {
       if (this.swingDirection === "left" && this.hooked) {
           this.swingDirection = "right";
           this.game.direction = "right";
           this.currentDegree = 0;
       }

       else if (this.swingDirection === "right" && this.hooked) {
           this.swingDirection = "left";
           this.game.direction = "left";
           this.currentDegree = 0;
       }
   }
   







};


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
    /*
    ctx.fillStyle="LightBlue";
    ctx.fillRect(0,0,1200,800);
    ctx.fillStyle = "#145A32";
    ctx.fillRect(0,500,1200,300);

    ctx.fillStyle="Grey";
    ctx.fillRect(0,550, 1200,100);

    ctx.beginPath();
    ctx.moveTo(0,550);
    ctx.lineTo(1200,550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,650);
    ctx.lineTo(1200,650);
    ctx.stroke();


*/

    ctx.drawImage(AM.getAsset("./img/stonebackground.png"),
                    0 , 0,  // source from sheet
                    1190, 798,
                    0, 0,
                    1200,
                    800);


   // ctx.fillStyle="Black";
   // ctx.fillRect(0,0,1200,800);

    ctx.restore();
};

function Map(game, map) {
  this.game = game;
  this.type = "map";
  this.rows = 13;
  this.cols = 38;
  this.map = map;
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

Map.prototype.update = function() {

  if(this.game.rightEdge === true) {
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

Map.prototype.draw = function(ctx) {

  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      var tile = this.mapBlocks[i][j];
      tile.draw(ctx);
    }
  }
};

function Block(game, x , y, type) {
  this.type = type;
  this.game = game;
  this.x = x;
  this.y = y;
  this.spriteHeight = 32;
  this.spriteWidth = 32;
  //this.scale = 2;
  this.height= 64;
  this.width = 64;
  this.torch = new Animation(AM.getAsset("./img/torch.png"), 0, 0, 59, 148, .03 , 50, true, false);
  this.surfaceLava = new Animation(AM.getAsset("./img/surface_lava.png"), 1, 0, 40, 56, .05 , 50, true, false);

}

Block.prototype.update = function() {

};

Block.prototype.draw = function(ctx) {
    /*
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle ="Blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
    */


  if (this.type === 1) {
    ctx.drawImage(AM.getAsset("./img/background_tile.png"),
                0 , 0,  // source from sheet
                512, 512,
                this.x, this.y,
                this.height,
                this.width);
  }
  else if(this.type === 5) {
    ctx.drawImage(AM.getAsset("./img/lava.png"),
                6 , 6,  // source from sheet
                60 , 60,
                this.x, this.y,
                this.height,
                this.width);
  }
  else if (this.type === 4) {
      ctx.drawImage(AM.getAsset("./img/skeleton_spike2.png"),
                83 , 0,  // source from sheet
                270 , 382,
                this.x, this.y,
                this.height,
                this.width);
  }
  else if (this.type === 6) {
      ctx.drawImage(AM.getAsset("./img/Empty_Spike2.png"),
                83 , 0,  // source from sheet
                270 , 382,
                this.x, this.y,
                this.height,
                this.width);
  }
  else if (this.type === 7) {
      ctx.drawImage(AM.getAsset("./img/SpikeWithSkull2.png"),
                83 , 0,  // source from sheet
                270 , 382,
                this.x, this.y,
                this.height,
                this.width);
  }
  else if (this.type === 8) {
        this.torch.drawFrame(this.game.clockTick, ctx, this.x, this.y, .5);
  }

  else if (this.type === 9) {
        this.surfaceLava.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y, 2.7);
  }
};

var mapArray = [[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,1,0,0,0,0,0,0,0,8,0,0],
                [1,0,0,0,0,0,0,0,8,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1],
                [1,0,0,0,0,0,8,0,0,0,1,0,0,1,0,0,0,8,0,0,0,0,8,0,0,1,1,1,0,8,0,8,0,8,0,8,1,1],
                [1,0,8,0,8,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,8,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
                [1,1,1,0,0,0,1,1,1,9,9,9,9,9,9,1,1,1,0,0,0,0,1,1,1,1,1,1,7,6,6,6,4,6,6,6,7,1],
                [1,1,1,1,4,1,1,1,1,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
              ];
var AM =  new AssetManager();

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





AM.downloadAll(function () {


    var canvas = document.getElementById("GameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();

    gameEngine.ctx = ctx;
    var bg = new Background(gameEngine);
    var map = new Map(gameEngine, mapArray);
    var hero = new Hero(gameEngine, 100,0);
    var hookshot = new Hookshot(gameEngine, hero);


    gameEngine.init(ctx);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(map);
    gameEngine.addEntity(hookshot);
    gameEngine.addEntity(hero);



    gameEngine.start();

});
