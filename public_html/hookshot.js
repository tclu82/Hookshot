function Hookshot(game, hero) {
    this.type = "hookshot";
    this.owner = hero;
    this.game = game;
    this.swinging = false;
    this.swingDirection = null;
    this.hooked = false;
    // this.startAngle = null;
    this.startX = null;
    this.startY = null;
    this.currentX = null;
    this.currentY = null;
    this.targetX = null;
    this.targetY = null;
    this.height = null;
    this.width = null;
    this.length = null;
    // this.currentDegree = 0;
    this.map = null;
    this.count = 1; // remove test only
    this.travelDistance = null;



}

Hookshot.prototype.update = function () {

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

        if (this.map.mapBlocks[gridY][gridX].type === 2) {

            this.hooked = true;
            this.owner.hooked = true;



            if (this.length === null) {
//                this.owner.y -= 35;
//                this.startY -= 35;
                this.swingDirection = this.game.direction;

                this.height = (this.startY - this.targetY);
                this.width = (this.startX - this.targetX);
                // length of HookShot
                this.length = (Math.sqrt((this.width * this.width) + (this.height * this.height)));
                // Hero travels from startX, ends startX + travelDistance
                this.travelDistance = Math.abs(2 * (this.targetX - this.startX));

            }

            this.swing(5);

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
        this.travelDistancel = null;
        this.startAngle = null;
        this.swingDirection = null;
        this.currentDegree = 0;
        this.count = 1;

    }

};



Hookshot.prototype.draw = function (ctx) {

    if (this.hooked && !this.game.clicked) {
        this.hooked = false;
        this.owner.hooked = false;
    }

    if (this.game.clicked && this.hooked) {

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
Hookshot.prototype.calculateOwnerY = function(ownerX) {
    return Math.sqrt(this.length * this.length
                    - (this.owner.x - this.targetX) * (this.owner.x - this.targetX))
                    + this.targetY;
}

Hookshot.prototype.swing = function (movePixel) {

    // Facing right and swing right
    if (this.swingDirection === "right") {

        // console.log("right1");

        // Start to swing right
        if (this.startX < this.targetX) {
            // During the swing
            if (this.owner.x < this.startX + this.travelDistance) {

                // console.log("right2");

                this.owner.x += movePixel;
                this.owner.y = this.calculateOwnerY(this.owner.x);
    
            }
            // Hit the end, reverse direction 
            else {
                
                // console.log("right3");
                this.startX = this.owner.x;
                this.swingDirection = 'left';
                this.game.direction = 'left';
                
            }

        }
        // facing right but shot left
        else {
        
            this.swingDirection = 'left';
            this.game.direction = 'left';
    

        } 
        
    // Facing left and swing left
    } else {
        
        // console.log("left1");


        if (this.startX > this.targetX) {
            // During the swing
            if (this.owner.x > this.startX - this.travelDistance) {

                // console.log("left2");

                this.owner.x -= movePixel;
                this.owner.y = this.calculateOwnerY(this.owner.x);
            
            }
            // Hit the end, reverse direction 
            else {
                // console.log("left3");
                this.startX = this.owner.x;
                this.swingDirection = 'right';
                this.game.direction = 'right';
            }

        }
        // facing left but shot right
        else {
            this.swingDirection = 'right';
            this.game.direction = 'right';
            
        }
    }
    
    var collide = collisionCheck(this.game, this.owner);
    
    if (collide.bottom || collide.right || collide.left) {
        this.hooked = false;
        this.owner.hooked = false;
        this.game.clicked = false;
        this.swinging = false;
    }

    this.count++;
};
