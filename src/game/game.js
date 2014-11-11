var manifest = [
    {src: musicPath+"BalloonPopping.ogg", id: "pop"},
    {src: musicPath+"8_BIT_dubstep.ogg", id: "music"},
    {src: musicPath+"smb_mariodie.ogg", id: "gameOver"},
    {src: musicPath+"smb_pause.ogg", id: "pause"}

];

var cloudIntensity = 0.15;
var CLOUD = assets_path+'cloud1.png';

var spriteSheet;
var internalId;
var isPlayerMuted;
var nextFriend;

var counter;
var sound;
var bonus;
var balloonManager;
var eventDispGame = new EventDispatcher();

function init() {

	stage.enableMouseOver(55);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
    sound = new SoundManager(manifest);
    bonus = new BonusCounter();
    balloonManager = new BalloonFactory(bonus.getGameLevel());



    spriteSheet = new createjs.SpriteSheet({
 
        images: [animationPath+"balloon_pop1.png"],
        frames: [[0,0,373,371,0,82.55,58.9],
                 [0,371,373,371,0,82.55,58.9],
                 [0,742,373,371,0,82.55,58.9],
                 [0,1113,373,371,0,82.55,58.9],
                 [0,1484,373,371,0,82.55,58.9],
                 [373,0,373,371,0,82.55,58.9],
                 [373,371,373,371,0,82.55,58.9],
                 [373,742,373,371,0,82.55,58.9],
                 [373,1113,373,371,0,82.55,58.9],
                 [373,1484,373,371,0,82.55,58.9],
                 [746,0,373,371,0,82.55,58.9],
                 [746,371,373,371,0,82.55,58.9],
                 [746,742,373,371,0,82.55,58.9],
                 [746,1113,373,371,0,82.55,58.9],
                 [746,1484,373,371,0,82.55,58.9],
                 [1119,0,373,371,0,82.55,58.9],
                 [1119,371,373,371,0,82.55,58.9],
                 [1119,742,373,371,0,82.55,58.9],
                 [1119,1113,373,371,0,82.55,58.9],
                 [1119,1484,373,371,0,82.55,58.9]]



/*    "images": [animationPath+"blust.png"],
"frames": [

    [2, 2, 64, 48], 
    [2, 52, 64, 48], 
    [2, 102, 64, 48], 
    [2, 152, 64, 48], 
    [2, 202, 64, 48], 
    [68, 2, 64, 48], 
    [68, 52, 64, 48], 
    [68, 102, 64, 48], 
    [68, 152, 64, 48], 
    [68, 202, 64, 48], 
    [134, 2, 64, 48], 
    [134, 52, 64, 48], 
    [134, 102, 64, 48], 
    [134, 152, 64, 48], 
    [134, 202, 64, 48], 
    [200, 2, 64, 48], 
    [200, 52, 64, 48], 
    [200, 102, 64, 48], 
    [200, 152, 64, 48], 
    [200, 202, 64, 48], 
    [266, 2, 64, 48], 
    [266, 52, 64, 48], 
    [266, 102, 64, 48], 
    [266, 152, 64, 48], 
    [266, 202, 64, 48], 
    [332, 2, 64, 48], 
    [332, 52, 64, 48], 
    [332, 102, 64, 48], 
    [332, 152, 64, 48], 
    [332, 202, 64, 48], 
    [398, 2, 64, 48], 
    [398, 52, 64, 48], 
    [398, 102, 64, 48], 
    [398, 152, 64, 48], 
    [398, 202, 64, 48], 
    [464, 2, 64, 48], 
    [464, 52, 64, 48], 
    [464, 102, 64, 48], 
    [464, 152, 64, 48], 
    [464, 202, 64, 48], 
    [530, 2, 64, 48], 
    [530, 52, 64, 48], 
    [530, 102, 64, 48], 
    [530, 152, 64, 48], 
    [530, 202, 64, 48], 
    [596, 2, 64, 48], 
    [596, 52, 64, 48], 
    [596, 102, 64, 48], 
    [596, 152, 64, 48], 
    [596, 202, 64, 48], 
    [662, 2, 64, 48], 
    [662, 52, 64, 48], 
    [662, 102, 64, 48], 
    [662, 152, 64, 48], 
    [662, 202, 64, 48], 
    [728, 2, 64, 48], 
    [728, 52, 64, 48], 
    [728, 102, 64, 48], 
    [728, 152, 64, 48], 
    [728, 202, 64, 48], 
    [794, 2, 64, 48], 
    [794, 52, 64, 48], 
    [794, 102, 64, 48], 
    [794, 152, 64, 48], 
    [794, 202, 64, 48], 
    [860, 2, 64, 48], 
    [860, 52, 64, 48], 
    [860, 102, 64, 48], 
    [860, 152, 64, 48], 
    [860, 202, 64, 48], 
    [926, 2, 64, 48], 
    [992, 2, 64, 48], 
    [1058, 2, 64, 48], 
    [1124, 2, 64, 48], 
    [926, 52, 64, 48], 
    [926, 102, 64, 48], 
    [926, 152, 64, 48], 
    [926, 202, 64, 48], 
    [992, 52, 64, 48], 
    [1058, 52, 64, 48], 
    [1124, 52, 64, 48], 
    [992, 102, 64, 48], 
    [992, 152, 64, 48], 
    [992, 202, 64, 48], 
    [1058, 102, 64, 48], 
    [1124, 102, 64, 48], 
    [1058, 152, 64, 48], 
    [1124, 152, 64, 48], 
    [1058, 202, 64, 48], 
    [1124, 202, 64, 48]
],
"animations": {
    
        "explosion1_0001":[0], 
        "explosion1_0002":[1], 
        "explosion1_0003":[2], 
        "explosion1_0004":[3], 
        "explosion1_0005":[4], 
        "explosion1_0006":[5], 
        "explosion1_0007":[6], 
        "explosion1_0008":[7], 
        "explosion1_0009":[8], 
        "explosion1_0010":[9], 
        "explosion1_0011":[10], 
        "explosion1_0012":[11], 
        "explosion1_0013":[12], 
        "explosion1_0014":[13], 
        "explosion1_0015":[14], 
        "explosion1_0016":[15], 
        "explosion1_0017":[16], 
        "explosion1_0018":[17], 
        "explosion1_0019":[18], 
        "explosion1_0020":[19], 
        "explosion1_0021":[20], 
        "explosion1_0022":[21], 
        "explosion1_0023":[22], 
        "explosion1_0024":[23], 
        "explosion1_0025":[24], 
        "explosion1_0026":[25], 
        "explosion1_0027":[26], 
        "explosion1_0028":[27], 
        "explosion1_0029":[28], 
        "explosion1_0030":[29], 
        "explosion1_0031":[30], 
        "explosion1_0032":[31], 
        "explosion1_0033":[32], 
        "explosion1_0034":[33], 
        "explosion1_0035":[34], 
        "explosion1_0036":[35], 
        "explosion1_0037":[36], 
        "explosion1_0038":[37], 
        "explosion1_0039":[38], 
        "explosion1_0040":[39], 
        "explosion1_0041":[40], 
        "explosion1_0042":[41], 
        "explosion1_0043":[42], 
        "explosion1_0044":[43], 
        "explosion1_0045":[44], 
        "explosion1_0046":[45], 
        "explosion1_0047":[46], 
        "explosion1_0048":[47], 
        "explosion1_0049":[48], 
        "explosion1_0050":[49], 
        "explosion1_0051":[50], 
        "explosion1_0052":[51], 
        "explosion1_0053":[52], 
        "explosion1_0054":[53], 
        "explosion1_0055":[54], 
        "explosion1_0056":[55], 
        "explosion1_0057":[56], 
        "explosion1_0058":[57], 
        "explosion1_0059":[58], 
        "explosion1_0060":[59], 
        "explosion1_0061":[60], 
        "explosion1_0062":[61], 
        "explosion1_0063":[62], 
        "explosion1_0064":[63], 
        "explosion1_0065":[64], 
        "explosion1_0066":[65], 
        "explosion1_0067":[66], 
        "explosion1_0068":[67], 
        "explosion1_0069":[68], 
        "explosion1_0070":[69], 
        "explosion1_0071":[70], 
        "explosion1_0072":[71], 
        "explosion1_0073":[72], 
        "explosion1_0074":[73], 
        "explosion1_0075":[74], 
        "explosion1_0076":[75], 
        "explosion1_0077":[76], 
        "explosion1_0078":[77], 
        "explosion1_0079":[78], 
        "explosion1_0080":[79], 
        "explosion1_0081":[80], 
        "explosion1_0082":[81], 
        "explosion1_0083":[82], 
        "explosion1_0084":[83], 
        "explosion1_0085":[84], 
        "explosion1_0086":[85], 
        "explosion1_0087":[86], 
        "explosion1_0088":[87], 
        "explosion1_0089":[88], 
        "explosion1_0090":[89]

}*/
    });

    //spriteSheet.x = spriteSheet.y = -200;

    this.createCounter();
}

function initBalloon(friend) {
    var balloonContainer;
    var balloonBitmap;
    var balloon = balloonManager.getRandomBalloon();
    if (!balloonContainer) {
        balloonContainer = new createjs.Container();
        balloonContainer.vo = balloon;
        balloonContainer.active = false;
        balloonBitmap = new createjs.Bitmap(balloonContainer.vo.asset);
        balloonContainer.addChild(balloonBitmap);
    }

    balloonContainer.photo = balloonBitmap;
    balloonContainer.width = function () {
		return this.photo.image.width * this.scaleX;
	}

    balloonContainer.height = function () {
		return this.photo.image.height * this.scaleY;
	}

	balloonContainer.friend = friend;
    balloon.friend = friend;

    balloonBitmap.scaleX = balloonBitmap.scaleY = getScaleFill(balloonContainer.photo.image, 60, 60);

    var bitmap;
    if (balloonContainer.vo.type == BalloonFactory.FRIEND_BALLOON) {
        bitmap = new createjs.Bitmap(friend.photo);
        bitmap.scaleX = bitmap.scaleY = getScaleEnter(bitmap.image, 50, 50);
        bitmap.rotation = 20;
        bitmap.y = balloonContainer.photo.scaleY*balloonContainer.photo.image.height - 5;
        bitmap.x = balloonContainer.photo.scaleX*balloonContainer.photo.image.width / 2 + 5;
        balloonContainer.addChild(bitmap);
    } else if (balloonContainer.vo.type == BalloonFactory.BONUS_BALLOON) {
        bitmap = new createjs.Bitmap(balloonManager.getBonusBox());
        bitmap.scaleX = bitmap.scaleY = getScaleEnter(bitmap.image, 50, 50);
        bitmap.y = balloonContainer.photo.scaleY*balloonContainer.photo.image.height - 10;
        bitmap.x = 10;
        balloonContainer.addChild(bitmap);
    }

	balloonContainer.addEventListener("mousedown", onBalloonCick);
	return balloonContainer;
}

function runBalloon(balloon) {
    balloon.active = true;
	var speed = balloon.vo.speed;
	balloon.y = canvas.height;
	var tween = createjs.Tween.get(balloon);
	tween.to({y: -balloon.height()}, speed).call(onRunBalloonComplete);

    //friend_burster.core.addWaving( balloon );

    createjs.Tween.get(balloon, {loop:true}, true)
        .to({x: balloon.x - 50},500,createjs.Ease.sineOut)
        .to({x: balloon.x + 50},1000,createjs.Ease.sineInOut)
        .to({x: balloon.x },500,createjs.Ease.sineIn);
    
}

function stopBalloon(balloon) {
    createjs.Tween.removeTweens(balloon);
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
        tween.to({x: -cloudBitmap.image.width}, speed).call(onRunCloudComplete);
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

    stopBalloon(balloon);
    balloon.removeAllEventListeners();

    sound.playPop();
    bonus.addBurst(balloon);
    this.updateCounter();

    // TODO remove with createjs.Sprite
    var anim = new createjs.Sprite(spriteSheet);
    anim.scaleX = anim.scaleY = balloon.photo.scaleX;
   // anim.scaleX = anim.scaleY = 3;
   // anim.x = -57;
   // anim.y = -30;
    balloon.addChild(anim);
    anim.addEventListener("animationend", function(){
        anim.removeAllEventListeners();
        removeTweenedItem(balloon);
    });
    anim.gotoAndPlay(0);

    var vo = balloon.vo;
    if (vo.type == BalloonFactory.FRIEND_BALLOON) {
        eventDispGame.dispatchEvent(new GameEvent(GameEventType.POST_ON_WALL, {owner_id: vo.friend.uid, message: "You've been bursted by me:)"}));
    }

}

function onRunBalloonComplete(tween) {
    var balloonContainer = tween.target;
    var lifepoints = balloonContainer.vo.lifepoints;
	MissedBalloons.addMissedBallon(lifepoints);
	removeTweenedItem(balloonContainer);
}

function onRunCloudComplete(tween) {
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
	if (destWidth / image.width > destHeight / image.height) {
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
    bonus.addBalloon(balloon);
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

	var burstCount = bonus.getTotalPoints();
	counter.text = FormatNumberLength(burstCount, 4);
}
function failGame(event){
	if(event instanceof GameEvent){
		stopGame();
        sound.playGameOver();
	}

}

eventDispGame.addEventListener(GameEventType.PAUSE_GAME, pauseGame);
eventDispGame.addEventListener(GameEventType.POST_ON_WALL, pauseGame);
eventDispGame.addEventListener(GameEventType.START_GAME, playGame);
eventDispGame.addEventListener(GameEventType.MISSED_BALLOON, failGame);
