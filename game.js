var manifest = [
    {src: musicPath+"BalloonPopping.ogg", id: "sound"},
    {src: musicPath+"8_BIT_dubstep.ogg", id: "music"}
];

var cloudIntensity = 0.15
var BALLOON_URL = ballonPath+'balloon.png';
var CLOUD = assets_path+'cloud1.png';

var spriteSheet;

var internalId;

var isPlayerMuted;

var nextFriend;

var balloonImage;

var counter;
var sound;
var bonus;
var eventDispGame = new EventDispatcher();


function init() {

	stage.enableMouseOver(55);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
    sound = new SoundManager(manifest);
    bonus = new BonusCounter();

    spriteSheet = new createjs.SpriteSheet({
        images: [animationPath+"balloon_pop1.png"],
        frames: [[0,0,373,371,0,82.55,58.9],[0,371,373,371,0,82.55,58.9],[0,742,373,371,0,82.55,58.9],[0,1113,373,371,0,82.55,58.9],[0,1484,373,371,0,82.55,58.9],[373,0,373,371,0,82.55,58.9],[373,371,373,371,0,82.55,58.9],[373,742,373,371,0,82.55,58.9],[373,1113,373,371,0,82.55,58.9],[373,1484,373,371,0,82.55,58.9],[746,0,373,371,0,82.55,58.9],[746,371,373,371,0,82.55,58.9],[746,742,373,371,0,82.55,58.9],[746,1113,373,371,0,82.55,58.9],[746,1484,373,371,0,82.55,58.9],[1119,0,373,371,0,82.55,58.9],[1119,371,373,371,0,82.55,58.9],[1119,742,373,371,0,82.55,58.9],[1119,1113,373,371,0,82.55,58.9],[1119,1484,373,371,0,82.55,58.9]]
    });

	// preload balloon
	balloonImage = new Image();
	balloonImage.src = BALLOON_URL;

    this.createCounter();
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

	balloon.addEventListener("mousedown", onBalloonCick);
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
    bonus.addBurst(balloon);
    this.updateCounter();

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

createCounter = function() {
	counter = new createjs.Text("0000", "30px Arial", "#ffffff");
	counter.y = 20;
	counter.x = 20;
	stage.addChild(counter);
}

updateCounter = function() {
	function FormatNumberLength(num, length) {
		var r = "" + num;
		while (r.length < length) {
			r = "0" + r;
		}
		return r;
	}

	var burstCount = bonus.getBurstCount();
	counter.text = FormatNumberLength(burstCount, 4);
}

eventDispGame.addEventListener("PAUSE_GAME", pauseGame);
eventDispGame.addEventListener("PLAY_GAME", playGame);
