/**
 *  Created by ader on 11/8/14
 */

function BalloonFactory(gameLevel) {

    var assetManager = new AssetManager();

    var gameLevel = gameLevel;

    var eventDis = new EventDispatcher();
    eventDis.addEventListener("gameLevelChanged", levelChangedListener);

    function levelChangedListener(e) {
        gameLevel = e.data;
        console.log(GameEventType.GAME_LEVEL_CHANGED, gameLevel);
    }


    var koef = 1;

    function getSpeedKoef() {
        return koef + gameLevel*0.2;
    }

    this.getRandomBalloon = function() {
        var rand = Math.random() * 10;

        var balloon;

        if (rand <= 4) {
            balloon = this.getOrdinaryBalloon();
        } else if (rand <= 6) {
            balloon = this.getSpeedBalloon();
        } else if (rand <= 7) {
            balloon = this.getFriendBalloon();
        } else if (rand <= 8) {
            balloon = this.getHazardBalloon();
        } else if (rand <= 9) {
            balloon = this.getSwingBalloon();
        } else if (rand <= 10) {
            balloon = this.getBonusBalloon();
        }

        return balloon;
    }


    this.getOrdinaryBalloon = function() {
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 3500 * getSpeedKoef(), 10, assetManager);
    }

    this.getSpeedBalloon = function() {
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 7000 * getSpeedKoef(), 20, assetManager);
    }

    this.getHazardBalloon = function() {
        return new Balloon(BalloonFactory.HAZARD_BALLOON, 4000 * getSpeedKoef(), -40, assetManager);
    }

    this.getSwingBalloon = function() {
        return new Balloon(BalloonFactory.SWING_BALLOON, 5000 * getSpeedKoef(), 20, assetManager);
    }

    this.getFriendBalloon = function() {
        return new Balloon(BalloonFactory.FRIEND_BALLOON, 4500* getSpeedKoef(), 0, assetManager);
    }

    this.getBonusBalloon = function() {
        return new Balloon(BalloonFactory.BONUS_BALLOON, 4500* getSpeedKoef(), 100, assetManager);
    }

}
BalloonFactory.ORDINARY_BALLOON = "ordinary";
BalloonFactory.HAZARD_BALLOON = "hazard";
BalloonFactory.SWING_BALLOON = "swing";
BalloonFactory.FRIEND_BALLOON = "friend";
BalloonFactory.BONUS_BALLOON = "bonus";

function Balloon(type, speed, points, assetManager) {

    this.type = type;
    this.asset = getBalloonAsset();
    this.speed = speed;
    this.points = points;
    this.friend;

    function getBalloonAsset() {

        var asset;

        var subpath = "cool/"

        if (type == BalloonFactory.ORDINARY_BALLOON) {
            asset = getOrdinaryRandomAsset();
        } else if (type == BalloonFactory.BONUS_BALLOON) {
            asset = ballonPath + subpath + 'heart.png';
        } else {
            asset = assetManager.getBalloonAsset('purple');
        }

        function getOrdinaryRandomAsset() {

//            var assets = [
//                "purple",
//                "darkPurple",
//                "GreenBalloon",
//                "GreenYellow",
//                "orange",
//                "pink",
//                "RedBalloon"
//            ];

            var assets = assetManager.getBalloons();
            var length = assets.length;
            var randIndex =  Math.round(Math.random() / ( 1 / length));

            if (randIndex >= length) {
                randIndex = length-1;
            }

            var balloonId = assets[randIndex].id;

            return assetManager.getBalloonAsset(balloonId);
        }

        return asset;

    }

}
