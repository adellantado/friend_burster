var canvas;
var stage;

var manifest = [{src: "assets/BalloonPopping.ogg", id: "sound"},{src: "assets/8_BIT_dubstep.ogg", id: "music"}];

var cloudIntensity = 0.15
var BALLOON_URL = 'assets/balloon.png';
var CLOUD = 'assets/cloud1.png';
var SKY = 'assets/esky.jpg';

var playIcon = "assets/play_icon.png";
var pauseIcon = "assets/pause_icon.png";
var muteIcon = "assets/mute_icon.png";
var volumeIcon = "assets/volume_icon.png";

var spriteSheet;

var burstedFriends = {};

var friends; // medium and big photos, nickname, first-last names, id
			   
var playButton;
var volumeButton;
var menu;

var internalId;
var musicInstance;
var soundInstance;

var isPlayerMuted;

var nextFriend;

var balloonImage;

function init() {
	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
	stage.enableMouseOver(55);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);

	//createjs.Sound.registerPlugin(createjs.WebAudioPlugin);
 	console.log("active sound plugin: "+createjs.Sound.activePlugin);
 	console.log("capabilities: "+createjs.Sound.getCapabilities());
 	//createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadMusicHandler, (this)));
 	//createjs.Sound.registerSound(popBalloonSound, "sound");
 	//createjs.Sound.registerManifest(manifest);
 	// init background

 	var background = new createjs.Bitmap(SKY);
 	background.image.onload = function () {
 		background.scaleX = background.scaleY = getScaleFill(background.image, canvas.width, canvas.height);
 		stage.update();
 	}
 	stage.addChild(background);

	spriteSheet = new createjs.SpriteSheet({
		images: ["assets/balloon_pop1.png"], 
		frames: [[0,0,373,371,0,82.55,58.9],[0,371,373,371,0,82.55,58.9],[0,742,373,371,0,82.55,58.9],[0,1113,373,371,0,82.55,58.9],[0,1484,373,371,0,82.55,58.9],[373,0,373,371,0,82.55,58.9],[373,371,373,371,0,82.55,58.9],[373,742,373,371,0,82.55,58.9],[373,1113,373,371,0,82.55,58.9],[373,1484,373,371,0,82.55,58.9],[746,0,373,371,0,82.55,58.9],[746,371,373,371,0,82.55,58.9],[746,742,373,371,0,82.55,58.9],[746,1113,373,371,0,82.55,58.9],[746,1484,373,371,0,82.55,58.9],[1119,0,373,371,0,82.55,58.9],[1119,371,373,371,0,82.55,58.9],[1119,742,373,371,0,82.55,58.9],[1119,1113,373,371,0,82.55,58.9],[1119,1484,373,371,0,82.55,58.9]]
	});

	// preload balloon
	balloonImage = new Image();
	balloonImage.src = BALLOON_URL;

	createMenu();
	initButtons();
}


function loadMusicHandler(event) {
     
 }


function getBalloonPosition(balloon) {
	var res = Math.random() * (canvas.width - balloon.width());
	return res;
}

function getBalloon(friend) {
	var balloon = new createjs.Container();
	
	//var image = new createjs.Bitmap(friend.photo);
	var balloonImage = new createjs.Bitmap(BALLOON_URL);
	
	balloon.addChild(balloonImage);

	createjs.Container.prototype.photo = balloonImage;
	createjs.Container.prototype.width = function () {
		return this.photo.image.width * this.scaleX;
	}
	createjs.Container.prototype.height = function () {
		return this.photo.image.height * this.scaleY;
	}
	balloon.friend = friend;
	balloonImage.scaleX = balloonImage.scaleY = getScaleFill(balloon.photo.image, 100, 100);

	var bitmap = new createjs.Bitmap(friend.photo);
		bitmap.scaleX = bitmap.scaleY = getScaleEnter(bitmap.image, 50, 50);	
			bitmap.rotation = 20;
			bitmap.y = balloon.photo.scaleY*balloon.photo.image.height - 5;
			bitmap.x = balloon.photo.scaleX*balloon.photo.image.width / 2 + 5;
		balloon.addChild(bitmap);

	balloon.addEventListener("click", onBalloonCick)
	return balloon;
}

function runBalloon(balloon) {
	var dev = 20;
	var speed = 3500;
	balloon.y = canvas.height + dev;
	var tween = createjs.Tween.get(balloon);
	tween.to({y: -balloon.height()}, speed).call(onRunComplete);
}

function runCloud() {
	if (Math.random() < cloudIntensity) {
		var speed = 3500;
		var cloud = new createjs.Bitmap(CLOUD);
		cloud.scaleX = cloud.scaleY = 0.4;
		cloud.x = canvas.width;
		cloud.y = Math.random() * (canvas.height - cloud.image.height);
		stage.addChild(cloud);
		var tween = createjs.Tween.get(cloud);
		tween.to({x: -cloud.image.width}, speed).call(onRunComplete);
	}
	
}

function removeBallon(balloon) {
	createjs.Tween.removeTweens(balloon);
	stage.removeChild(balloon);
}

function onBalloonCick(event) {
	var balloon = event.target;
	balloon.removeAllEventListeners();

//	if (soundInstance) {
//		soundInstance.play(createjs.Sound.INTERRUPT_ANY);
//	} else {
//		soundInstance = createjs.Sound.play('sound', createjs.Sound.INTERRUPT_ANY);
//	}

	var anim = new createjs.BitmapAnimation(spriteSheet);
	anim.scaleX = anim.scaleY = balloon.photo.scaleX;
	balloon.addChild(anim);
	anim.addEventListener("animationend", function(){removeBallon(balloon);})
	anim.gotoAndPlay(0);

	if(!burstedFriends[balloon.friend.id]) {
		burstedFriends[balloon.friend.id] = 0;
	}
	burstedFriends[balloon.friend.id] += 1;
	
	console.log("count="+burstedFriends[balloon.friend.id]+", id="+balloon.friend.id);

	
	//removeBallon(balloon);
}	

function onRunComplete(tween) {
	removeBallon(tween.target);
}

function onPhotoLoad() {
	console.log("photo loaded");
}

function onPhotoError() {
	console.log("photo error");
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
	var balloon = getBalloon(nextFriend);
	var index = Math.round(Math.random()*(friends.length-1));
	preloadImage(friends[index]);
	balloon.x = getBalloonPosition(balloon);
	balloon.y = canvas.height - 100;
	stage.update();
	stage.addChild(balloon);
	runBalloon(balloon);
	runCloud();
}

function startGame() {
	if (friends && friends.length>0) {
		if (createjs.Ticker.getPaused()) {
		createjs.Ticker.setPaused(false);
		muteSounds(isPlayerMuted);
		}
		if (!internalId) {
			internalId = setInterval(startBalloon, 500);
		}
		if (!musicInstance) {
			musicInstance = createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE);
	    	musicInstance.setVolume(0.2);
		}
	}
}

function stopGame() {
	clearInterval(internalId);
	internalId = null;
	createjs.Ticker.setPaused(true);
	createjs.Sound.stop();
	internalId = null;
	musicInstance = null;
}

function pauseGame() {
	clearInterval(internalId);
	internalId = null;
	muteSounds(true);
	createjs.Ticker.setPaused(true);
}

function muteSounds(value) {
	if (!createjs.Ticker.getPaused()) {
		createjs.Sound.setMute(value);
	}	
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
			this.onClick = function () {
				this.setPause(false);
				stage.addChild(menu);
				pauseGame();
			};
		} else {
			this.removeAllChildren();
			this.addChild(playBtn);
			this.onClick = function() {
				if (friends) {
					this.setPause(true);
					stage.removeChild(menu);
					startGame();
				}
			};
		}
	}
	playButton.setPause(false);
	volumeButton = new createjs.Container();
	volumeButton.setMute = function (mute) {
		if (mute) {
			this.removeAllChildren();
			this.addChild(muteBtn);
			this.onClick = function () {
				this.setMute(false);
				isPlayerMuted = false;
				muteSounds(isPlayerMuted);
			};
		} else {
			this.removeAllChildren();
			this.addChild(volumeBtn);
			this.onClick = function () {
				this.setMute(true);
				isPlayerMuted = true;
				muteSounds(isPlayerMuted);
			};
		}
	}
	volumeButton.setMute(false);
	//volumeButton.addChild(volumeBtn);


	playButton.y = volumeButton.y = 10;

	playButton.onMouseOver = handCursorHandler;
	volumeButton.onMouseOver = handCursorHandler;
	playButton.onMouseOut = defaultCursorHandler;
	volumeButton.onMouseOut = defaultCursorHandler;
	playButton.x = canvas.width - 100;
	volumeButton.x = canvas.width - 50;
	playButton.scaleX = playButton.scaleY = 0.8;
	volumeButton.scaleX = volumeButton.scaleY = 0.8;
	stage.addChild(playButton);
	stage.addChild(volumeButton);
}

function defaultCursorHandler() {
	 document.body.style.cursor = 'default';
}

function handCursorHandler() {
	document.body.style.cursor = 'pointer';
}