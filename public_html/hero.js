function Hero(game, x, y) {
    this.type = "hero";
    this.animationRight = new Animation(AM.getAsset("./img/horz_walk_right.png"), 0, 0, 104, 128, .03, 31, true, false);
    this.animationLeft = new Animation(AM.getAsset("./img/horz_walk_left.png"), 0, 0, 80, 128, .03, 31, true, false);
    this.animationJumpRight = new Animation(AM.getAsset("./img/right_jump.png"), 0, 0, 96, 120, .1, 12, false, false);
    this.animationJumpLeft = new Animation(AM.getAsset("./img/left_jump.png"), 12, 0, 83, 128, .1, 12, false, false);
    this.animationLeftFall = new Animation(AM.getAsset("./img/right_forward_fall.png"), 0, 0, 67, 60, .05, 25, true, false);
    this.animationRightFall = new Animation(AM.getAsset("./img/right_forward_fall.png"), 0, 0, 67, 60, .05, 25, true, false);
    this.animationLeftFall = new Animation(AM.getAsset("./img/left_fall_forward.png"), 0, 0, 62, 60, .05, 25, true, false);

    this.animationRightFallDeath = new Animation(AM.getAsset("./img/right_forward_facing_fall_death.png"), 0, 0, 131, 102, .05, 25, false, false);
    this.animationLeftFallDeath = new Animation(AM.getAsset("./img/left_fall_forward_death.png"), 0, 0, 121, 102, .05, 25, false, false);

    this.animationRightSpikeDeath = new Animation(AM.getAsset("./img/forward_facing_spike_death.png"), 0, 0, 79, 97, .05, 35, false, false);
    this.animationLeftSpikeDeath = new Animation(AM.getAsset("./img/left_forward_facing_spike_death.png"), 0, 0, 79, 97, .05, 35, false, false);
    this.animationRightStand = new Animation(AM.getAsset("./img/right_stand.png"), 0, 0, 48, 58, 0.1, 25, true, false);
    this.animationLeftStand = new Animation(AM.getAsset("./img/left_stand.png"), 0, 0, 33, 58, 0.1, 25, true, false);
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = 275;
    this.jumpSpeed = 6;
    this.fallSpeed = 12;
    this.jumpMax = this.jumpSpeed * 18;
    this.jumpCurrent = 0;
    this.hooked = false;
    this.removeFromWorld = false;
    this.ctx = game.ctx;
    this.width = 40;
    this.height = 70;
    this.scale = 1.3;
    this.lastX = null;//
    this.lastY = null;//
    this.triggerFall = false;
    this.defaultFallDistance = 200;
    this.fallCount = 0;
    this.fallY = 580;
    this.fallDeath = false;
    this.hitGround = false;
    this.jumpAllowed = true;
    this.hookY = null;
    this.isDead = false;
    this.spikeDeath = false;
    this.DeathDirection = null;
    this.FallDirection = null;
}

Hero.prototype.update = function () {
  if(!this.isDead) {
    if (this.hookY === null && this.hooked) {
        this.hookY = this.y;
        this.fallY = this.y;
    }



    if (!this.hooked) {

    if (this.triggerFall) {

        this.fallCount += this.y - this.fallY;
        //console.log("caculate " + this.fallCount);
        //console.log("New Addition: " + (this.y - this.fallY));
        this.fallY = this.y;

    }

    if (this.fallCount >= this.defaultFallDistance) {
        //console.log("FallDeath: " + this.fallDeath);
        this.fallDeath = true;
        if (this.FallDirection === null) {
        this.FallDirection = this.game.direction;
      }
    }

    if (this.game.tickCount >= 121 ) {
        var xDif = Math.abs(this.lastX - this.x);
        var yDif = Math.abs(this.lastY - this.y);
        if (xDif <= 64 && yDif > 3) {
            //console.log("TriggerFall: " + this.triggerFall);
            this.triggerFall = true;
        } else {
            this.triggerFall = false;
            this.fallCount = 0;
            this.FallDirection = null;

        }
        this.lastX = this.x;
        this.lastY = this.y;
        this.game.tickCount = 120;
    }

    if (this.game.rightEdge === true) {
        this.x = 1;
        this.y = 600;
    }

    if (this.game.leftEdge === true) {
        this.x = 1190;
        this.y = 600;
    }
    if (this.game.moveRight && !this.hooked) {
        this.x += this.game.clockTick * this.speed;
    }
    if (this.game.moveLeft && !this.hooked) {
        this.x -= this.game.clockTick * this.speed;
    }


    var landed = collisionCheck(this.game, this);

    if(landed.spike) {
      if(this.DeathDirection === null) {
        this.DeathDirection = this.game.direction;
      }
      this.spikeDeath = true;
      console.log(this.spikeDeath);
    }

    else  if (this.game.jumping && (landed.bottom || this.jumpAllowed) && !this.hooked) {

        if (this.jumpCurrent < this.jumpMax) {
            if (this.jumpCurrent >= .8 * this.jumpMax) {
                this.y -= this.jumpSpeed / 2;
                this.jumpCurrent += this.jumpSpeed / 2;
            } else {
                this.y -= this.jumpSpeed;
                this.jumpCurrent += this.jumpSpeed;
            }

        } else {
            this.game.jumping = false;
            this.jumpAllowed = false;
            this.animationJumpRight.elapsedTime = 0;
            this.animationJumpLeft.elapsedTime = 0;

        }
    }
    else if (!landed.bottom && !this.hooked){
        this.jumpAllowed = false;


        if (this.y < 800 && !this.hooked) {

            if (this.jumpCurrent > this.jumpMax * .8) {
                this.y += this.fallSpeed * .8;
            } else {
                this.y += this.fallSpeed;
            }

            if (this.jumpCurrent > 0) {
                if (this.jumpCurrent > this.jumpMax * .8) {
                    this.jumpCurrent -= this.fallSpeed * .8;
                } else {
                    this.jumpCurrent -= this.fallSpeed;

                }
            }
            landed = collisionCheck(this.game, this);

            if (landed.bottom) {
                this.jumpCurrent = 0;
                this.jumpAllowed = true;
            }
        }

    }
            landed = collisionCheck(this.game, this);

            if (landed.bottom) {
                this.jumpCurrent = 0;
                this.jumpAllowed = true;
            }

    }
  }



};

Hero.prototype.draw = function (ctx) {

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle ="Yellow";
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.stroke();
  ctx.restore();


    if (this.spikeDeath) {
      this.isDead = true;
      if(this.DeathDirection === "right") {
        this.animationRightSpikeDeath.drawFrame(this.game.clockTick, ctx, this.x + 3, this.y + 40, 1.5);
      } else {
        this.animationLeftSpikeDeath.drawFrame(this.game.clockTick, ctx, this.x - this.width * 2, this.y + 40, 1.5);
      }
    }
      else if (this.hitGround && this.fallDeath) {
      this.isDead = true;
      if(this.FallDirection === "left") {
        this.animationLeftFallDeath.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y - 25, 1.5);
      } else if (this.FallDirection === "right") {
        this.animationRightFallDeath.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y - 25, 1.5);
      }
    }
    else if (this.fallDeath) {
      if(this.FallDirection === "right") {
        this.animationRightFall.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
      } else if (this.FallDirection === "left") {
        this.animationLeftFall.drawFrame(this.game.clockTick, ctx, this.x - 30, this.y, 1.5);

      }
    }
    else if (this.hooked) {
        switch (this.game.direction) {
            case "right":
                ctx.drawImage(AM.getAsset("./img/right_swing.png"),
                        0, 0, // source from sheet
                        53, 58,
                        this.x - this.width, this.y,
                        53 * this.scale,
                        58 * this.scale);
                break;

            case "left":
                ctx.drawImage(AM.getAsset("./img/left_swing.png"),
                        0, 0, // source from sheet
                        53, 58,
                        this.x, this.y,
                        53 * this.scale,
                        58 * this.scale);
                break;
        }

    }
    else if (this.game.jumping && !this.hooked) {
        if (this.game.direction === "right") {
            this.animationJumpRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, .65);
        } else if (this.game.direction === "left") {
            this.animationJumpLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, .65);

        }

    }
    else if (this.game.moveRight && !this.hooked) {
        this.animationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, .65);
    }
    else if (this.game.moveLeft && !this.hooked) {
        this.animationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, .65);
    }
    else if (!this.game.moveLeft && !this.game.moveRight && !this.hooked) {
        switch (this.game.direction) {
            case "right":
                this.animationRightStand.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
//                ctx.drawImage(AM.getAsset("./img/horz_walk_right.png"),
//                        1150, 0, // source from sheet
//                        85, 128,
//                        this.x, this.y,
//                        85 * this.scale,
//                        128 * this.scale);

                break;

            case "left":
                this.animationLeftStand.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
//                ctx.drawImage(AM.getAsset("./img/horz_walk_left.png"),
//                        330, 0, // source from sheet
//                        85, 128,
//                        this.x, this.y,
//                        85 * this.scale,
//                        128 * this.scale);

                break;
        }

    }


};