/**
 * Created by ader on 11/8/14.
 */

function BalloonManager() {

    this.getOrdinaryBalloon = function() {
        return new Balloon(BalloonManager.ORDINARY_BALLOON, 3500, 1);
    }

}
BalloonManager.ORDINARY_BALLOON = "ordinary";

function Balloon(type, speed, points) {

    this.type = type;
    this.asset = getBalloonAsset();
    this.speed = speed;
    this.points = points;
    this.friend;

    function getBalloonAsset() {

        var asset;

        if (type == BalloonManager.ORDINARY_BALLOON) {
            asset = ballonPath+'balloon.png';
        } else {
            asset = ballonPath+'balloon.png';
        }

        return asset;

    }

}
