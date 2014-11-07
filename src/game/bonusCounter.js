/**
 * Created by maxpaint on 08.11.2014.
 */
function BonusCounter() {

    var burstsCount = 0;

    var balloonMap = {};

    this.getBurstCount = function() {
        return burstsCount;
    }

    this.addBurst = function(balloon) {
        burstsCount++;

        var friendUid = balloon.friend.uid;

        if (!balloonMap[friendUid]) {
            balloonMap[friendUid] = 0;
        }

        balloonMap[friendUid]++;

        if (console.table) {
            console.table(balloonMap);
        } else {
            console.log("bursted: ", burstsCount);
        }

    }

    this.saveProgress = function() {
        //save
    }

}
