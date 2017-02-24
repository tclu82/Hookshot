function collisionCheck(game, sprite) {

    var collide = {
        right: false,
        left: false,
        top: false,
        bottom: false,
        spike: false,
        chest: null,
        door: null
    };

    // Get the Map out of the Games Entity list
    var map = null;
    for (var i = 0; i < game.entities.length; i++) {
        var e = game.entities[i];
        if (e.type === "map") {
            map = e;
        }
    }


    var gridY = Math.round(map.rows * (sprite.y / (64 * map.rows)));
    var gridX = Math.round(map.cols * (sprite.x / (64 * map.cols)));

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

            if (block.type === 1 || block.type === 2 || block.type === 12 || block.type === 3 || block.type === 13) {

                //If Hero hits a block from the top with Hero's Feet
                if (sprite.y + sprite.height <= block.y + sprite.fallSpeed &&
                        sprite.y + sprite.height >= block.y &&
                        ((sprite.x <= block.x + block.width && sprite.x >= block.x) ||
                                (sprite.x + sprite.width >= block.x &&
                                        sprite.x <= block.x + block.width))) {

                    collide.bottom = true;

                    sprite.y = block.y - sprite.height;
               
                    if (sprite.fallDeath) {
                        sprite.hitGround = true;
                    }



                }

                // Head
                if (sprite.y <= block.y + block.height &&
                        sprite.y >= (block.y + block.height) - sprite.jumpSpeed * 2 &&
                        ((sprite.x <= block.x + block.width && sprite.x >= block.x) ||
                                (sprite.x + sprite.width > block.x &&
                                        sprite.x < block.x + block.width))) {

                    collide.top = true;
                    sprite.y = block.y + block.height;
                }

                // left
                if (sprite.x + sprite.width > block.x &&
                        sprite.x < (block.x + block.width) &&
                        sprite.x >= (block.x + block.width) - sprite.game.clockTick * sprite.speed &&
                        sprite.y < block.y + block.height &&
                        sprite.height + sprite.y > block.y) {

                    collide.left = true;
                    if (block.type === 3 && block.opening === null) {
                        collide.chest = block;
                        
                    }
                    
                    if (block.type === 13) {
                        
                        collide.door = block;
                    }
                    
                    
                    sprite.x = (block.x + block.width) + 1;

                }


                // right
                if (sprite.x < block.x &&
                        sprite.x + sprite.width > block.x &&
                        sprite.x + sprite.width <= block.x + sprite.game.clockTick * sprite.speed &&
                        sprite.y < block.y + block.height &&
                        sprite.height + sprite.y > block.y) {

                    collide.right = true;
                    
                    if (block.type === 13) {
                        console.log("Bam");
                        collide.door = block;
                    }
                    
                    sprite.x = (block.x - sprite.width) - 3;
                    
                    
                }
            }
            else if (block.type === 4 || block.type === 6 ||block.type === 7 ) {

              if (sprite.y + sprite.height <= block.y + sprite.fallSpeed &&
                      sprite.y + sprite.height >= block.y &&
                      ((sprite.x <= block.x + (block.width * .75) && sprite.x >= block.x +(block.width / 4)) ||
                      (sprite.x + sprite.width >= block.x  + (block.width / 4) &&
                      sprite.x <= block.x + (block.width * .75)))) {

                                        collide.spike = true;

                                        //sprite.y = block.y - sprite.height/2.5;

            }
          }

        }
    }
    return collide;
}
