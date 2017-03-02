function Inventory() {
  this.key = null;
  this.Revive = null;
}




function Key() {
    this.type = "key";
    this.image = "";
    this.icon = "";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false
}

Key.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

}


function Revive() {

}
