/**
 * Created by ader on 11/8/14.
 */

function AssetManager() {

    var subpath = "cool/";
    var ballonPath = "assets/balloon/";

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
    queue.loadFile({id: "heart", src: balloonSave+'heart.png'});
    queue.loadFile({id: "box", src: ballonPath+'Gift-icon.png'});
    queue.loadFile({id: "purple-flash", src: balloonSave + 'purple-flash.png'});
    queue.loadFile({id: "biohazard", src: balloonSave + 'biohazard.png'});
   

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


