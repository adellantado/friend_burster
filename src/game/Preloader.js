/**
 * Created by maxpaint on 08.11.2014.
 */

var preload;

Preloader = (function(){

    manifest = [
        {src:"GreenBalloon.jpg", id:"image0"},
        {src:"GreenYellow.jpg", id:"image1"},
        {src:"heart.jpg", id:"image2"},
        {src:"HeartLollipop.jpg", id:"image3"}
    ];

    preload = new createjs.LoadQueue(true, "test/");

// Use this instead to use tag loading
//preload = new createjs.PreloadJS(false);

    preload.on("progress", handleProgress);
    preload.on("complete", handleComplete);
    preload.on("fileload", handleFileLoad);
    preload.loadManifest(manifest, true, "assets/balloon/medium/");

    function handleComplete(event) {
      console.table(event);
    }

    function handleProgress(event) {
        console.table(event);
    }

    function handleFileLoad(event) {
        console.table(event);
    }

})();

