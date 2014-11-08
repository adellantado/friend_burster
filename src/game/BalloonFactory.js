/**
 *  Created by ader on 11/8/14
 */

function BalloonFactory() {

    this.getOrdinaryBalloon = function() {
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 3500, 10);
    }

    this.getSpeedBalloon = function() {
        return new Balloon(BalloonFactory.ORDINARY_BALLOON, 7000, 20);
    }

}
BalloonFactory.ORDINARY_BALLOON = "ordinary";

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
