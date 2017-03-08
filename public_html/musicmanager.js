// JavaScript source code
function MusicManager(){
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = [];
}

MusicManager.prototype.queueDownload = function (path) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
};

MusicManager.prototype.isDone = function () {
    return this.downloadQueue.length === this.successCount + this.errorCount;
};

MusicManager.prototype.downloadAll = function (callback) {
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var aud = new Audio();
        var that = this;

        var path = this.downloadQueue[i];
        console.log(path);

        aud.addEventListener("load", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if (that.isDone()) callback();
        });

        aud.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        aud.src = path;
        this.cache[path] = aud;
    }

};

MusicManager.prototype.getSoundEF = function (path) {
    return this.cache[path];
};