var canvas;
var stage;

var assets_path = "assets/";

var manifest = [
    {src: assets_path+"BalloonPopping.ogg", id: "sound"},
    {src: assets_path+"8_BIT_dubstep.ogg", id: "music"}
];

var cloudIntensity = 0.15
var BALLOON_URL = assets_path+'balloon.png';
var CLOUD = assets_path+'cloud1.png';
var SKY = assets_path+'esky.jpg';

var playIcon = assets_path+"play_icon.png";
var pauseIcon = assets_path+"pause_icon.png";
var muteIcon = assets_path+"mute_icon.png";
var volumeIcon = assets_path+"volume_icon.png";

var spriteSheet;

var friends; // medium and big photos, nickname, first-last names, id
			   
var playButton;
var volumeButton;
var menu;

var internalId;

var isPlayerMuted;

var nextFriend;

var balloonImage;

var sound;


function init() {
	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
	stage.enableMouseOver(55);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);

    sound = new SoundManager(manifest);

    spriteSheet = new createjs.SpriteSheet({
        images: [assets_path+"balloon_pop1.png"],
        frames: [[0,0,373,371,0,82.55,58.9],[0,371,373,371,0,82.55,58.9],[0,742,373,371,0,82.55,58.9],[0,1113,373,371,0,82.55,58.9],[0,1484,373,371,0,82.55,58.9],[373,0,373,371,0,82.55,58.9],[373,371,373,371,0,82.55,58.9],[373,742,373,371,0,82.55,58.9],[373,1113,373,371,0,82.55,58.9],[373,1484,373,371,0,82.55,58.9],[746,0,373,371,0,82.55,58.9],[746,371,373,371,0,82.55,58.9],[746,742,373,371,0,82.55,58.9],[746,1113,373,371,0,82.55,58.9],[746,1484,373,371,0,82.55,58.9],[1119,0,373,371,0,82.55,58.9],[1119,371,373,371,0,82.55,58.9],[1119,742,373,371,0,82.55,58.9],[1119,1113,373,371,0,82.55,58.9],[1119,1484,373,371,0,82.55,58.9]]
    });

 	// init background
 	var background = new createjs.Bitmap(SKY);
 	background.image.onload = function () {
 		background.scaleX = background.scaleY = getScaleFill(background.image, canvas.width, canvas.height);
 		stage.update();
 	}
 	stage.addChild(background);

	// preload balloon
	balloonImage = new Image();
	balloonImage.src = BALLOON_URL;

	createMenu();
	initButtons();
}

function initBalloon(friend) {

    var balloon;

    var balloonBitmap;
    if (!balloon) {
        balloon = new createjs.Container();
        balloon.active = false;
        balloonBitmap = new createjs.Bitmap(BALLOON_URL);
        balloon.addChild(balloonBitmap);
    }


	createjs.Container.prototype.photo = balloonBitmap;
	createjs.Container.prototype.width = function () {
		return this.photo.image.width * this.scaleX;
	}
	createjs.Container.prototype.height = function () {
		return this.photo.image.height * this.scaleY;
	}



	balloon.friend = friend;
    balloonBitmap.scaleX = balloonBitmap.scaleY = getScaleFill(balloon.photo.image, 100, 100);

	var bitmap = new createjs.Bitmap(friend.photo);
		bitmap.scaleX = bitmap.scaleY = getScaleEnter(bitmap.image, 50, 50);	
			bitmap.rotation = 20;
			bitmap.y = balloon.photo.scaleY*balloon.photo.image.height - 5;
			bitmap.x = balloon.photo.scaleX*balloon.photo.image.width / 2 + 5;
		balloon.addChild(bitmap);

	balloon.addEventListener("click", onBalloonCick);
	return balloon;
}

function runBalloon(balloon) {
    balloon.active = true;
	var dev = 20;
	var speed = 3500;
	balloon.y = canvas.height + dev;
	var tween = createjs.Tween.get(balloon);
	tween.to({y: -balloon.height()}, speed).call(onRunComplete);
}

/**
 *
 */
function runCloud() {
	if (Math.random() < cloudIntensity) {
        var cloudBitmap = new createjs.Bitmap(CLOUD);
        cloudBitmap.scaleX = cloudBitmap.scaleY = 0.4;
        cloudBitmap.x = canvas.width;
        var speed = 3500;
        cloudBitmap.y = Math.random() * (canvas.height - cloudBitmap.image.height);
        stage.addChild(cloudBitmap);
        var tween = createjs.Tween.get(cloudBitmap);
        tween.to({x: -cloudBitmap.image.width}, speed).call(onRunComplete);
	}
}

/**
 *
 * @param item
 */
function removeTweenedItem(item) {
	createjs.Tween.removeTweens(item);
	stage.removeChild(item);
    item.active = false;
}

function onBalloonCick(event) {
	var balloon = event.target.parent;
    popBalloon(balloon);
}

function popBalloon(balloon) {

    balloon.removeAllEventListeners();

    sound.playPop();

    // TODO remove with createjs.Sprite
    var anim = new createjs.Sprite(spriteSheet);
    anim.scaleX = anim.scaleY = balloon.photo.scaleX;
    balloon.addChild(anim);
    anim.addEventListener("animationend", function(){
        anim.removeAllEventListeners();
        removeTweenedItem(balloon);
    });
    anim.gotoAndPlay(0);
}

function onRunComplete(tween) {
	removeTweenedItem(tween.target);
}

function getScaleEnter(image, destWidth, destHeight) {
	var scale;
	if (destWidth/image.width > destHeight/image.height) {
		scale = destHeight/image.height;
	} else {
		scale = destWidth/image.width;
	}
	return scale;
}

function getScaleFill(image, destWidth, destHeight) {
	var scale;
	if (destWidth/image.width > destHeight/image.height) {
		scale = destWidth/image.width;
	} else {
		scale = destHeight/image.height;
	}
	return scale;
} 

function preloadImage(friend) {
	var image = new Image();
    image.onload = function(event) {
        nextFriend = friend;
    }
	image.src = friend.photo;
}

function startBalloon() {
	var balloon = initBalloon(nextFriend);
	var index = Math.round(Math.random()*(friends.length-1));
	preloadImage(friends[index]);
	balloon.x = Math.random() * (canvas.width - balloon.width())
	balloon.y = canvas.height - 100;
	stage.update();
	stage.addChild(balloon);
	runBalloon(balloon);
	runCloud();
}

function playGame() {
	if (friends && friends.length>0) {
		if (createjs.Ticker.getPaused()) {
		    createjs.Ticker.setPaused(false);

            if (isPlayerMuted) {
                sound.mute();
            } else {
                sound.unmute();
            }

		}

		if (!internalId) {
			internalId = setInterval(startBalloon, 500);
		}

        sound.playMusic().setVolume(0.2);
	}
}

function stopGame() {
	clearInterval(internalId);
	internalId = null;
	createjs.Ticker.setPaused(true);
    sound.stopMusic();
	internalId = null;
}

function pauseGame() {
	clearInterval(internalId);
	internalId = null;
    sound.mute();
    sound.pauseMusic();
	createjs.Ticker.setPaused(true);
}

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

this.SoundManager = function(manifest) {

    var self = this;

    var manifest = manifest;

    var musicInstance;
    var soundInstance;
    var paused = false;

    if (!createjs.Sound.initializeDefaultPlugins()) {
        return;
    }
    //createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadMusicHandler, (this)));
    //createjs.Sound.addEventListener("fileload", playSound);
    createjs.Sound.registerManifest(manifest);

    this.playMusic = function() {

        if (!musicInstance) {
            //musicInstance = createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE);
            musicInstance = createjs.Sound.createInstance("music");
        }
        if (paused) {
            musicInstance.resume();
            paused = false;
        } else {
            musicInstance.play(createjs.Sound.INTERRUPT_NONE);
        }

        return self;
    }

    this.stopMusic = function() {
        createjs.Sound.stop();
        musicInstance = null;
        paused = false;
        return self;
    }

    this.pauseMusic = function() {
        if (musicInstance) {
            paused = musicInstance.pause();
        }
        return self;
    }

    this.playPop = function() {
        if (soundInstance) {
            soundInstance.play(createjs.Sound.INTERRUPT_ANY);
        } else {
            soundInstance = createjs.Sound.play('sound', createjs.Sound.INTERRUPT_ANY);
        }
        return self;
    }

    this.setVolume = function(value) {
        if (musicInstance) {
            musicInstance.setVolume(value);
        }
        return self;
    }

    this.mute = function() {
        createjs.Sound.setMute(true);
        return self;
    }

    this.unmute = function() {
        createjs.Sound.setMute(false);
        return self;
    }

}