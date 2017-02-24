function Key() {
    this.image = "";
    this.x = null;
    this.y = null;
    this.owner = null;
}

Key.prototype.setCoords = function() {
    this.x = this.owner.x;
    this.y = this.owner.y - 10;
    
}
