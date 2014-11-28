/**
 * Created by maxpaint on 08.11.2014.
 */
var menu;
var playButton;
var volumeButton;
var counter;
var friends; // medium and big photos, nickname, first-last names, id

var assets_path = "assets/";
var iconPath = "assets/icon/";
var animationPath ="assets/animation/pop/";
var musicPath = "assets/music/";
var ballonPath = "assets/balloon/";

(function(){
    var eventDisp = new EventDispatcher();


    var playIcon = iconPath+"play_icon.png";
    var pauseIcon = iconPath+"pause_icon.png";
    var muteIcon = iconPath+"mute.png";
    var volumeIcon = iconPath+"volume.png";

    var SKY = assets_path+'esky.jpg';

    function initButtons() {
        var playBtn = new createjs.Bitmap(playIcon);
        var pauseBtn = new createjs.Bitmap(pauseIcon);
        var muteBtn = new createjs.Bitmap(muteIcon);
        var volumeBtn = new createjs.Bitmap(volumeIcon);

        playButton = new createjs.Container();
        playButton.setPause = function (pause) {
            if (pause) {
                this.removeAllChildren();
                this.addChild(pauseBtn);
                this.addEventListener("click", function(e) {
                    playButton.setPause(false);
                    stage.addChild(menu);
                    eventDisp.dispatchEvent(new GameEvent(GameEventType.PAUSE_GAME) );
                });
            } else {
                this.removeAllChildren();
                this.addChild(playBtn);
                this.addEventListener("click", function(e) {
                    if (friends) {
                        playButton.setPause(true);
                        stage.removeChild(menu);
                        eventDisp.dispatchEvent(new GameEvent(GameEventType.START_GAME));
                    }

                });
            }
        }

        playButton.setPause(false);
        volumeButton = new createjs.Container();
        volumeButton.setMute = function (mute) {
            if (mute) {
                this.removeAllChildren();
                this.addChild(muteBtn);
                this.addEventListener("click", function(e) {
                    volumeButton.setMute(false);
                    isPlayerMuted = false;
                    sound.unmute();
                });
            } else {
                this.removeAllChildren();
                this.addChild(volumeBtn);
                this.addEventListener("click", function(e) {
                    volumeButton.setMute(true);
                    isPlayerMuted = true;
                    sound.mute();
                });
            }
        }
        volumeButton.setMute(false);
        //volumeButton.addChild(volumeBtn);

        playButton.y = volumeButton.y = 490;

        playButton.cursor = 'pointer';
        volumeButton.cursor = 'pointer';

        playButton.x = canvas.width - 100;
        volumeButton.x = canvas.width - 50;
        playButton.scaleX = playButton.scaleY = 0.8;
        volumeButton.scaleX = volumeButton.scaleY = 0.8;
        stage.addChild(playButton);
        stage.addChild(volumeButton);
    }

    function initCounter() {
        counter = new createjs.Text("0000", "30px Arial", "#ffffff");
        counter.y = 20;
        counter.x = 20;
        stage.addChild(counter);
    }

   initButtons();
   initCounter();

    var updateCounter = function() {
        function FormatNumberLength(num, length) {
            var r = "" + num;
            while (r.length < length) {
                r = "0" + r;
            }
            return r;
        }

        var burstCount = bonus.getTotalPoints();
        counter.text = FormatNumberLength(burstCount, 4);
    }

    eventDisp.addEventListener(GameEventType.POP_BALLOON, updateCounter)

})();