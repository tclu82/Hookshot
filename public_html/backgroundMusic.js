function BackgroundMusic() {
    this.count = 0;
    this.bgm = [];
    this.current = 0;
}
 
BackgroundMusic.prototype.setMusic = function (music) {
    this.bgm[this.count] = music;
    this.bgm[this.count].addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    this.count++;
};

BackgroundMusic.prototype.play = function (index) {
    console.log("bgm," + index + "count:" +this.count);
    index = index - 1;
    if (this.count > index) {
        this.bgm[index].play();
        this.current = index;
    }
};

BackgroundMusic.prototype.stop = function () {
    this.bgm[this.current].pause();
    this.bgm[this.current].currentTime = 0;
};

BackgroundMusic.prototype.pause = function () {
    this.bgm[this.current].pause();
}
;
