function Inventory(InventoryCTX, hero) {
  this.key = null;
  this.hero = hero;
  this.Revive = null;
  this.invincibility = null;
  this.safeFall = null;
  this.lowGrav = null;
  this.itemlist = [function() {return new Revive();},
                   function() {return new invincibility();},
                   function() {return new safeFall();},
                   function() {return new lowGrav();}];


  this.InventoryCTX = InventoryCTX;
  this.itemCount = -1;
};

Inventory.prototype.getRandomItem = function() {
  var choice = Math.floor(Math.floor(Math.random() * 15) / 4);
  console.log("NUM: " + choice);
  var itemfunct = this.itemlist[choice];
  var item = itemfunct();

    switch(item.type) {

      case "revive":

                                this.Revive = item;
                                this.Revive.owner = this.hero;
                                this.Revive.setCoords();
                                break;

      case "invincibility":


                                this.invincibility = item;
                                this.invincibility.owner = this.hero;
                                this.invincibility.setCoords();
                                break;

      case "lowgrav":
                                this.lowGrav = item;
                                this.lowGrav.owner = this.hero;
                                this.lowGrav.setCoords();
                                break;

      case "safefall":
                                this.safeFall = item;
                                this.safeFall.owner = this.hero;
                                this.safeFall.setCoords();
                                break;
      default:
                                console.log("bam");
                                break;
    }
    //console.log(this);
};



Inventory.prototype.update = function() {


};

Inventory.prototype.draw = function() {





  var itemWidth = 88;
  // Draw BackGround
  this.InventoryCTX.drawImage(AM.getAsset("./img/InventoryBack.png"),
          0, 0, // source from sheet
          1202, 102,
          0, 0,
          1200,
          100);

  if(this.key !== null) {
    this.itemCount ++;
    this.InventoryCTX.drawImage(AM.getAsset("./img/Key.png"),
            0, 0, // source from sheet
            88 , 81,
            itemWidth * this.itemCount + 10 , 10,
            80, 80);

  }

  if(this.Revive !== null) {
    this.itemCount ++;
      this.InventoryCTX.drawImage(AM.getAsset("./img/Revive.png"),
            0, 0, // source from sheet
            88, 81,
            itemWidth * this.itemCount + 10, 10,
            80, 80);

  }

  if(this.invincibility !== null) {
    this.invincibility.timer++;

    if (this.invincibility.timer >= this.invincibility.timeLimit) {
      this.invincibility.empty = true;
    }

    this.itemCount ++;
    this.InventoryCTX.drawImage(AM.getAsset("./img/invincibilityGray.png"),
            0, 0, // source from sheet
            88, 81,
            itemWidth * this.itemCount  + 10, 10,
            80, 80);

    this.InventoryCTX.drawImage(AM.getAsset("./img/invincibility.png"),
            0, 0, // source from sheet
            88, 81 - this.invincibility.timer * this.invincibility.drawReduction ,
            itemWidth * this.itemCount  + 10, 10,
            80, 80 - this.invincibility.timer * this.invincibility.drawReduction);
  }

  if(this.safeFall !== null) {
    this.itemCount ++;
    this.InventoryCTX.drawImage(AM.getAsset("./img/safefallGray.png"),
            0, 0, // source from sheet
            88, 81,
            itemWidth * this.itemCount + 10, 10,
            80, 80);

    this.InventoryCTX.drawImage(AM.getAsset("./img/safefall.png"),
            0, 0, // source from sheet
            88, 81 - this.safeFall.sizeLeft,
            itemWidth * this.itemCount  + 10, 10,
            80, 80 - this.safeFall.sizeLeft);
  }

  if(this.lowGrav !== null) {
    var item = this.lowGrav;

    item.timer++;

    if (item.timer >= item.timeLimit) {
      item.empty = true;
    }


    this.itemCount ++;

    this.InventoryCTX.drawImage(AM.getAsset("./img/lowGravGray.png"),
            0, 0, // source from sheet
            88, 81,
            itemWidth * this.itemCount  + 10, 10,
            80, 80);

    this.InventoryCTX.drawImage(AM.getAsset("./img/lowGrav.png"),
            0, 0, // source from sheet
            88, 81 - item.timer * item.drawReduction,
            itemWidth * this.itemCount  + 10, 10,
            80, 80 - item.timer * item.drawReduction);
  }
  this.itemCount = -1;
};



function Key() {
    this.type = "key";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false;
};


Key.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

};

function Revive() {
    this.type = "revive";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false;
};


Revive.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

};

function safeFall() {
  console.log("SafeFall Aquired");
    this.type = "safefall";
    this.size = 88;
    this.x = null;
    this.y = null;
    this.owner = null;
    this.fallsLeft = 2;
    this.sizeLeft = 0;
  };

safeFall.prototype.landed = function() {
  this.fallsLeft--;
  this.sizeLeft += 40;
  console.log("Falls Left: " + this.fallsLeft);
};

safeFall.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

};

function lowGrav() {
    this.type = "lowgrav";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false;

    this.timeLimit = 1200;
    this.timer = 0;
    this.empty = false;

    this.drawReduction = 1 / (this.timeLimit / 80);
};


lowGrav.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

};

function invincibility() {
    this.type = "invincibility";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false;
    this.timeLimit = 600;
    this.timer = 0;
    this.empty = false;

    this.drawReduction = 1 / (this.timeLimit / 80);

};




invincibility.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

};
