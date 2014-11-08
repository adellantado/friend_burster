/**
 * Created by ader on 11/8/14.
 */

function AssetManager() {

    var subpath = "cool/";

    var balloonSave = ballonPath+subpath;

    this.balloonMafinest = [

        {id: "purple", src: balloonSave+"purple.png"},
        {id: "violet", src: balloonSave+"darkPurple.png"},
        {id: "green", src: balloonSave+"GreenBalloon.png"},
        {id: "yellow", src: balloonSave+"GreenYellow.png"},
        {id: "orange", src: balloonSave+"orange.png"},
        {id: "pink", src: balloonSave+"pink.png"},
        {id: "red", src: balloonSave+"RedBalloon.png"}

    ];

    var queue = new createjs.LoadQueue();
    queue.on("complete", handleComplete, this);

    queue.loadManifest(this.balloonMafinest);
    //queue.loadFile(balloonSave+'heart.png');

    function handleComplete() {

    }

    this.getResult = function(name) {
        return queue.getResult(name);
    }

    this.getBalloons = function() {
        return this.balloonMafinest;
    }

    this.getBalloonAsset = function(name) {
        return this.getResult(name).src;
    }


}


