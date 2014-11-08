/**
 *  Created by ader on 11/8/14
 */

function BalloonFactory(gameLevel) {

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
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 3500 * getSpeedKoef(), 10);
    }

    this.getSpeedBalloon = function() {
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 7000 * getSpeedKoef(), 20);
    }

    this.getHazardBalloon = function() {
        return new Balloon(BalloonFactory.HAZARD_BALLOON, 4000 * getSpeedKoef(), -40);
    }

    this.getSwingBalloon = function() {
        return new Balloon(BalloonFactory.SWING_BALLOON, 5000 * getSpeedKoef(), 20);
    }

    this.getFriendBalloon = function() {
        return new Balloon(BalloonFactory.FRIEND_BALLOON, 4500* getSpeedKoef(), 0);
    }

    this.getBonusBalloon = function() {
        return new Balloon(BalloonFactory.BONUS_BALLOON, 4500* getSpeedKoef(), 100);
    }

}
BalloonFactory.ORDINARY_BALLOON = "ordinary";
BalloonFactory.HAZARD_BALLOON = "hazard";
BalloonFactory.SWING_BALLOON = "swing";
BalloonFactory.FRIEND_BALLOON = "friend";
BalloonFactory.BONUS_BALLOON = "bonus";

function Balloon(type, speed, points) {

    this.type = type;
    this.asset = getBalloonAsset();
    this.speed = speed;
    this.points = points;
    this.friend;

    function getBalloonAsset() {

        var asset;

        if (type == BalloonFactory.ORDINARY_BALLOON) {
            asset = ballonPath+'balloon.png';
        } else {
            asset = ballonPath+'balloon.png';
        }

        return asset;

    }

}
