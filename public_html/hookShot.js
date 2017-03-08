function Hookshot(game, hero) {
  this.type = "hookshot";
  this.owner = hero;
  this.game = game;
  this.swinging = false;
  this.swingDirection = null;
  this.hooked = false;
  this.startAngle = null;
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
  this.count = 1; // remove test only
  this.travelDistance = null;
  this.swingSpeed = 1;
  this.maxSwingSpeed = 12;
  this.lastY = null;
  this.removeFromWorld = false;
  this.noSwing = false;
  this.currentSwingSpeed = 0;

  //music
  this.soundEFHookshot = MM.getSoundEF("./sound/hookshot.wav");
  this.soundEFHookFail = MM.getSoundEF("./sound/fail.wav");
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
    this.startX = this.owner.x + this.owner.width;
    this.startY = this.owner.y + (this.owner.height / 2);
  }
  this.currentX = this.owner.x;
  this.currentY = this.owner.y;



  if (this.game.clicked) {
    this.swinging = true;
    this.targetX = this.game.click.x;
    this.targetY = this.game.click.y;
    this.owner.hookY = null;

    var gridY = Math.floor(this.map.rows * (this.targetY / (64 * this.map.rows)));
    var gridX = Math.floor(this.map.cols * (this.targetX / (64 * this.map.cols)));


    if (gridX < 0)
      gridX = 0;
    if (gridY < 0)
      gridY = 0;

    var block = this.map.mapBlocks[gridY][gridX];

    if (block.type === 2) {

      //music hookshot sfx.
      if (!this.hooked) {
        this.soundEFHookshot.play();
      }

      this.hooked = true;
      this.owner.hooked = true;

      if (this.length === null || this.game.verticalDirection === "up" || this.game.verticalDirection === "down") {
        this.swingDirection = this.game.direction;
        this.height = (this.startY - this.targetY);
        this.width = (this.startX - this.targetX);
        this.length = (Math.sqrt((this.width * this.width) + (this.height * this.height)));
        this.travelDistance = Math.abs(2 * (this.targetX - this.startX));

        if (this.travelDistance < 75) {
          this.noSwing = true;
        } else {
          this.noSwing = false;
        }
        //console.log("travelDistance: " + this.travelDistance);
        this.lastY = this.owner.y;

      }

      // Hook only, no swing (vertical up and down only)
      if (this.noSwing) {
        this.currentSwingSpeed = 0;
        // Vertical up and down when hooked only, no swing
        if (this.game.verticalDirection === "up")
          this.startY -= this.game.clockTick * this.owner.speed;

        else if (this.game.verticalDirection === "down")
          this.startY += this.game.clockTick * this.owner.speed;
      }
      // Swinging
      else {
        this.currentSwingSpeed = 5;

        if (this.game.verticalDirection === "up") {
          // // face left and swing from right side
          // if (this.swingDirection === "left" && this.owner.x ) {
          //   this.startX -= this.game.clockTick * this.owner.speed;
          //
          //   console.log("facing left");
          // }
          // // face right and swing from left side
          // else if (this.swingDirection === "right" && this.owner.x === this.targetX) {
          //   this.startX += this.game.clockTick * this.owner.speed;
          //
          //   console.log("facing right");
          // }




        }
        else if (this.game.verticalDirection === "down") {






        }
      }

      this.lastY = this.owner.y;
      this.swing(this.currentSwingSpeed);

    } else if (block.type === 12) {
      block.landed = false;

    } else if (block.type === 1 || block.type === 13 || block.type === 14 || block.type === 15 || block.type === 17) {
      //music entire if statement.
      this.soundEFHookFail.play();
      this.game.clicked = false;

    } else {
      this.game.clicked = false;
    }

  } else {
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
    this.travelDistance = null;
    this.startAngle = null;
    this.swingDirection = null;
    this.currentDegree = 0;
    this.count = 1;
    this.swingSpeed = 1;
    this.maxSwingSpeed = 12;

  }

};



Hookshot.prototype.draw = function(ctx) {

  if (this.hooked && !this.game.clicked) {
    this.hooked = false;
    this.owner.wasHooked = true;
    this.owner.hooked = false;
  } else if (this.game.clicked && this.hooked) {
    this.owner.wasHooked = true;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "saddleBrown";
    ctx.lineWidth = 3;
    ctx.moveTo(this.currentX + (this.owner.width / 2), this.currentY + (this.owner.height / 2));
    ctx.lineTo(this.targetX, this.targetY);
    ctx.stroke();
    ctx.restore();
  } else if (this.game.clicked) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "saddleBrown";
    ctx.lineWidth = 3;
    ctx.moveTo(this.currentX + (this.owner.width / 2), this.currentY + (this.owner.height / 2));
    ctx.lineTo(this.targetX, this.targetY);
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

// This funciton return Y coordination according to HookShot's X coordination druing swing
Hookshot.prototype.calculateOwnerY = function() {
     return Math.sqrt(this.length * this.length
                     - (this.owner.x - this.targetX) * (this.owner.x - this.targetX))
                     + this.targetY;
 }

Hookshot.prototype.swing = function(movePixel) {
  /// Facing right and swing right
  if (this.swingDirection === "right") {
    // Start to swing right
    if (this.startX < this.targetX) {
      // During the swing
      if (this.owner.x < this.startX + this.travelDistance) {
        this.owner.x += movePixel;
        // this.owner.y = this.calculateOwnerY();
      }
      // Hit the end, reverse direction
      else {
        this.startX = this.owner.x;
        this.swingDirection = 'left';
        this.game.direction = 'left';
        this.swingSpeed = 1;
      }

    }
    /// facing right but shot left
    else {

      this.swingDirection = 'left';
      this.game.direction = 'left';
      this.swingSpeed = 1;
    }
  }
  // Facing left and swing left
  else {

    if (this.startX > this.targetX) {
      // During the swing
      if (this.owner.x > this.startX - this.travelDistance) {
        this.owner.x -= movePixel;
        // this.owner.y = this.calculateOwnerY();
      }
      // Hit the end, reverse direction
      else {
        this.startX = this.owner.x;
        this.swingDirection = 'right';
        this.game.direction = 'right';
        this.swingSpeed = 1;
      }
    }
    // Facing left but shot right
    else {
      this.swingDirection = 'right';
      this.game.direction = 'right';
      this.swingSpeed = 1;
    }
  }
  // Calulate owner y according to owner x
  this.owner.y = this.calculateOwnerY();

  var collide = collisionCheck(this.game, this.owner);

  if (collide.bottom || collide.right || collide.left) {
    this.hooked = false;
    this.owner.hooked = false;
    this.game.clicked = false;
    this.swinging = false;
  }

  this.count++;
};
