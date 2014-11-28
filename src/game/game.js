
var cloudIntensity = 0.15;
var CLOUD = assets_path+'cloud1.png';

var spriteSheet;
var isPlayerMuted;
var nextFriend;

var sound;
var bonus;
var balloonManager;

var gameTrigger

function init() {

    gameTrigger = new GameTrigger();
    sound = new SoundManager();
    bonus = new BonusCounter();
    balloonManager = new BalloonFactory(bonus.getGameLevel());

}

function initBalloon(friend) {
    var balloonContainer;
    var balloonBitmap;
    balloon = balloonManager.getRandomBalloon();
    if (!balloonContainer) {
        balloonContainer = new createjs.Container();
        balloonContainer.vo = balloon;
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

    balloonContainer.x = Math.random() * (canvas.width - balloonContainer.width())
    balloonContainer.y = canvas.height - 100;

    stage.update();
    stage.addChild(balloonContainer);

	return balloonContainer;
}

function popBalloon(balloon) {
    balloon.removeAllEventListeners();
    sound.playPop();
    return balloon;
}

function stopBalloon(balloon) {
    if (createjs.Tween.hasActiveTweens(balloon)) {
        createjs.Tween.removeTweens(balloon);
    }

    return balloon;
}

function initCloud() {
    var cloud = new createjs.Bitmap(CLOUD);
    cloud.scaleX = cloud.scaleY = 0.4;
    cloud.x = canvas.width;
    cloud.y = Math.random() * (canvas.height - cloud.image.height);
    stage.addChild(cloud);

    return cloud;
}

function removeTweenedItem(item) {
    if (createjs.Tween.hasActiveTweens(item)) {
        createjs.Tween.removeTweens(item);
    }

	stage.removeChild(item);
    return item;
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

function playGame() {

	if (friends && friends.length>0) {

        if (gameTrigger.run()) {

            if (isPlayerMuted) {
                sound.mute();
            } else {
                sound.unmute();
            }

        }
        sound.playMusic().setVolume(0.2);
	}
}

function stopGame() {
    gameTrigger.stop();
    sound.stopMusic();
}

function pauseGame() {
    gameTrigger.stop();
    sound.mute();
    sound.pauseMusic();
}

function failGame() {
    stopGame();
    sound.playGameOver();
}



this.GameTrigger = function() {

    var internalId;

    var init;
    (init = function () {
        stage.enableMouseOver(55);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    })();

    this.run = function() {
        if (createjs.Ticker.getPaused()) {
            createjs.Ticker.setPaused(false);

            return true;
        }

        if (!internalId) {
            internalId = setInterval(trigger, 500);
        }

        return false;
    }

    this.stop = function() {
        clearInterval(internalId);
        internalId = null;
        createjs.Ticker.setPaused(true);
    }

    function trigger() {
        balloonStream.resolve();
        cloudStream.resolve();
    }

}

this.EventBus = function() {

    var eventDispGame = new EventDispatcher();

    var eventTypes = [
        GameEventType.PAUSE_GAME,
        GameEventType.POST_ON_WALL,
        GameEventType.START_GAME,
        GameEventType.MISSED_BALLOON
    ];

    var resolve;
    var reject;

    function func(resolveFunc ,rejectFunc) {
        resolve = resolveFunc;
        reject = rejectFunc;
    }

    function frontListener(e) {

        switch (e.type) {

            case GameEventType.START_GAME:
                resolve(playGame);
                break;
            case GameEventType.PAUSE_GAME:
            case GameEventType.POST_ON_WALL:
                resolve(pauseGame);
                break;
            case GameEventType.MISSED_BALLOON:
                resolve(failGame);
                break;
            default:
                reject();

        }

    }

    this.activate = function () {

        for (var i = 0, length = eventTypes.length; i < length; i++) {
            eventDispGame.addEventListener(eventTypes[i], frontListener);
        }

        return new Chain(func);
    }

    this.inactivate = function() {

        for (var i = 0, length = eventTypes.length; i < length; i++) {
            eventDispGame.removeEventListener(eventTypes[i], frontListener);
        }

        return new Chain(func);
    }

    this.dispatchPostOnTheWall = function(vo) {
        eventDispGame.dispatchEvent(new GameEvent(GameEventType.POST_ON_WALL, {owner_id: vo.friend.uid, message: "You've been bursted by me:)"}));
    }

    this.dispatchPopBalloon = function() {
        eventDispGame.dispatchEvent(new GameEvent(GameEventType.POP_BALLOON));
    }

}

this.TweenChain = function() {

    var resolve;
    var reject;

    function func(resolveFunc ,rejectFunc) {
        resolve = resolveFunc;
        reject = rejectFunc;
    }

    this.runBalloon = function(balloon) {

        var speed = balloon.vo.speed;

        var tween = createjs.Tween.get(balloon);
        tween.to({y: -balloon.height()}, speed).call(resolve);

        createjs.Tween.get(balloon, {loop:true}, true)
            .to({x: balloon.x - 50},500,createjs.Ease.sineOut)
            .to({x: balloon.x + 50},1000,createjs.Ease.sineInOut)
            .to({x: balloon.x },500,createjs.Ease.sineIn);

        return new Chain(func);
    }

    this.runCloud = function(cloud) {

        var speed = 3500;

        var tween = createjs.Tween.get(cloud);

        tween.to({x: -cloud.image.width}, speed).call(resolve);

        return new Chain(func);

    }


}

this.SpriteChain = function() {

    var resolve;
    var reject;

    function func(resolveFunc ,rejectFunc) {
        resolve = resolveFunc;
        reject = rejectFunc;
    }

    var anim;
    var _balloon;

    function addPopAnim() {
        anim.scaleX = anim.scaleY = _balloon.photo.scaleX;
        _balloon.addChild(anim);
    }

    function onAnimationEnd() {
        anim.removeAllEventListeners();
        resolve(_balloon);
    }

    this.popAnim = function(ballon) {

        _balloon = ballon;

        spriteSheet = spriteSheet || new createjs.SpriteSheet({
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

        });

        anim = new createjs.Sprite(spriteSheet);
        anim.addEventListener("animationend", onAnimationEnd);

        addPopAnim();
        anim.gotoAndPlay(0);

        return new Chain(func);
    }
}

    // Streams

    var balloonClickedStream = new Chain();
    balloonClickedStream
        .map(function(event){
            return event.target.parent;
        })
        .then(stopBalloon)
        .then(popBalloon)
        .then(function(balloon){
            bonus.addBurst(balloon);
            eventBus.dispatchPopBalloon();
            return balloon;
        })
        .then(new SpriteChain().popAnim)
        .then(removeTweenedItem)
        .map(function(balloon){
            var vo = balloon.vo;
            if (vo.type == BalloonFactory.FRIEND_BALLOON) {
                eventBus.dispatchPostOnTheWall(vo);
            }
        })


    var balloonStream = new Chain();
    balloonStream
        .then(function() {
            var index = Math.round(Math.random()*(friends.length-1));
            preloadImage(friends[index]);
            return nextFriend;
        })
        .then(initBalloon)
        .map(function(balloon){
            balloon.addEventListener("mousedown", balloonClickedStream.resolve);
            return balloon;
        })
        .map(function(balloon){
            bonus.addBalloon(balloon);
            return balloon;
        })
        .then(new TweenChain().runBalloon)
        .filter(function(tween) {
            return tween;
        })
        .map(function (tween) {
            return tween.target;
        })
        .map(function (balloon) {
            var lifepoints = balloon.vo.lifepoints;
            MissedBalloons.addMissedBallon(lifepoints);

            return balloon;
        })
        .then(removeTweenedItem);


    var cloudStream = new Chain();
    cloudStream
        .filter(Math.random() < cloudIntensity)
        .then(initCloud)
        .then(new TweenChain().runCloud)
        .filter(function(tween) {
            return tween;
        })
        .map(function (tween) {
            return tween.target;
        })
        .then(removeTweenedItem);


    var eventBus = new EventBus();
    var eventBusStream = eventBus.activate().execute();

/////
