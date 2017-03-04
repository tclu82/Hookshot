function Key() {
    this.type = "key";
    this.image = "";
    this.x = null;
    this.y = null;
    this.owner = null;
    this.used = false
}

Key.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;

}
