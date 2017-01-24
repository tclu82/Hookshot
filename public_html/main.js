
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
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}


//Entity Area

function Hero(game, x, y) {
  this.type = "hero";
  this.animationRight = new Animation(AM.getAsset("./img/horz_walk_right.png"), 0, 0, 104, 128, .03 , 31, true, false);
  this.animationLeft = new Animation(AM.getAsset("./img/horz_walk_left.png"), 0, 0, 80, 128, .03 , 31, true, false);
  this.animationJumpRight = new Animation(AM.getAsset("./img/right_jump.png"), 0, 0, 96, 120, .05 , 12, true, false);
  this.animationJumpLeft = new Animation(AM.getAsset("./img/left_jump.png"), 0, 0, 84, 128, .05 , 12, true, false);
  this.game = game;
  this.x = x;
  this.y = y;
  this.speed = 275;
  this.jumpSpeed = 6;
  this.fallSpeed = 12;
  this.jumpMax = this.jumpSpeed * 20;
  this.jumpCurrent = 0;
  this.removeFromWorld = false;
  this.ctx = game.ctx;
  this.width = 30;
  this.height = 80;
  this.scale = .65;

}

Hero.prototype.update = function() {
  if (this.game.moveRight) {
    this.x += this.game.clockTick * this.speed;
  }
  if (this.game.moveLeft) {
    this.x -= this.game.clockTick * this.speed;
  }


  if (this.game.jumping) {
    if (this.jumpCurrent < this.jumpMax) {
      this.y -= this.jumpSpeed;
      this.jumpCurrent += this.jumpSpeed;
    }
    else {
      this.game.jumping = false;

    }
  }
  else {
    if (this.y < 800) {
      this.y += this.fallSpeed ;
      if (this.jumpCurrent > 0) {
        this.jumpCurrent -= this.fallSpeed;
      }
      if (this.jumpCurrent < 0) {
        this.jumpCurrent = 0;
      }
    }


    // Get the Map out of the Games Entity list
    var map = null;
    for (var i = 0; i < this.game.entities.length; i++) {
      var e = this.game.entities[i];
      if (e.type === "map") {
        map = e;
      }
    }

    // Detection for hitting a Block
    for (var i = 0; i < 26; i++) {
      for (var j = 0; j < 38; j++) {
        var block = map.mapBlocks[i][j];
        // If its block type 1
        if (block.type === 1 && this.x < block.x + block.width &&
           this.x + block.width > block.x &&
           this.y < block.y + block.height &&
           this.height + this.y > block.y) {
              this.y = block.y - block.height * 2 - 8;

        }

      }
    }


  }

}

Hero.prototype.draw = function(ctx) {


  if (this.game.jumping) {
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


}

function Background(game) {
    this.type = "background";
    this.x = 0;
    this.y = 400;
    this.radius = 200;
}


Background.prototype.update = function () {
}

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

    ctx.strokeStyle = "Yellow";
    ctx.beginPath();
    ctx.moveTo(0,600);
    ctx.lineTo(1200,600);
    ctx.stroke();
    */

    ctx.fillStyle="Black";
    ctx.fillRect(0,0,1200,800);
    ctx.restore();
}

function Map(game, map) {
  this.type = "map";
  this.mapBlocks = new Array(26);

  for (var i = 0; i < 26; i++) {
    this.mapBlocks[i] = new Array(38);
  }
  for (var i = 0; i < 26; i++) {
    for (var j = 0; j < 38; j++) {
      this.mapBlocks[i][j] = new Block(game, j * 32, i * 32, map[i][j]);

    }
  }


}

Map.prototype.update = function() {

}

Map.prototype.draw = function(ctx) {

  for (var i = 0; i < 26; i++) {
    for (var j = 0; j < 38; j++) {
      var tile = this.mapBlocks[i][j];
      tile.draw(ctx);
    }
  }
}

function Block(game, x , y, type) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.height= 32;
  this.width = 32;
}

Block.prototype.update = function() {

}

Block.prototype.draw = function(ctx) {
  if (this.type === 1) {
    ctx.drawImage(AM.getAsset("./img/tileSheet.jpg"),
                0 , 0,  // source from sheet
                this.height, this.width,
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
}

var mapArray = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
              ];
var AM =  new AssetManager();

AM.queueDownload("./img/horz_walk_left.png");
AM.queueDownload("./img/horz_walk_right.png");
AM.queueDownload("./img/right_jump.png");
AM.queueDownload("./img/left_jump.png");
AM.queueDownload("./img/tileSheet.jpg")
AM.queueDownload("./img/lava.png");

AM.downloadAll(function () {


    var canvas = document.getElementById("GameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();

    gameEngine.ctx = ctx;
    var bg = new Background(gameEngine);
    var map = new Map(gameEngine, mapArray);
    var hero = new Hero(gameEngine, 100,300);



    gameEngine.init(ctx);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    gameEngine.addEntity(map);

    gameEngine.start();

});
