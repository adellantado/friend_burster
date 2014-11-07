/**
 * Created by maxpaint on 08.11.2014.
 */
(function (){
    var iconPath = "assets/icon/";

    var playIcon = iconPath+"play_icon.png";
    var pauseIcon = iconPath+"pause_icon.png";
    var muteIcon = iconPath+"mute_icon.png";
    var volumeIcon = iconPath+"volume_icon.png";

    var playButton;
    var volumeButton;
    var menu;


    function createMenu() {
        menu = new createjs.Container();
        var menuWidth = 420;
        var menuHeight = 100;
        var graphics = new createjs.Graphics().beginFill(createjs.Graphics.getRGB(255,255,255)).dr(0,0,menuWidth,menuHeight);
        menu.addChild(new createjs.Shape(graphics));
        var logo = new createjs.Bitmap('http://www.w3.org/html/logo/badge/html5-badge-h-solo.png');
        logo.image.onload = function() {
            logo.y = (menuHeight - logo.image.height)/2;
            logo.x = 20;
            menu.addChild(logo);
        }
        var text = new createjs.Text("Hire me or anyone from my team", "20px Arial");
        text.x = 100;
        text.y = 20;
        menu.addChild(text);
        var contacts = new createjs.Text("adellantado@gmail.com", "20px Arial", "#0000ff");
        contacts.x= 100;
        contacts.y = 50;
        menu.addChild(contacts);

        menu.alpha = 0.8;

        menu.x = (canvas.width - menuWidth) / 2;
        menu.y = (canvas.height - menuHeight) / 2;
        stage.addChild(menu);

        stage.update();
    }

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
                    pauseGame();
                });
            } else {
                this.removeAllChildren();
                this.addChild(playBtn);
                this.addEventListener("click", function(e) {
                    if (friends) {
                        playButton.setPause(true);
                        stage.removeChild(menu);
                        playGame();
                    }

                });
            }
        }

        function createVolumeButtom(){
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
        }

        function createPlayButton(){
            playButton.setPause(false);

            //volumeButton.addChild(volumeBtn);


            playButton.y = volumeButton.y = 10;

            playButton.cursor = 'pointer';
            volumeButton.cursor = 'pointer';

            playButton.x = canvas.width - 100;
            volumeButton.x = canvas.width - 50;
            playButton.scaleX = playButton.scaleY = 0.8;
            volumeButton.scaleX = volumeButton.scaleY = 0.8;
            stage.addChild(playButton);
            stage.addChild(volumeButton);
    }

        createMenu();
        initButtons();
        createVolumeButtom();
        createPlayButton();

})();
