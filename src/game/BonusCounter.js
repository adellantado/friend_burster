/**
 * Created by maxpaint on 08.11.2014.
 */
function BonusCounter() {

    var burstsCount = 0;
    var totalPoints = 0;

    var friendBalloonMap = {};

    this.getBurstCount = function() {
        return burstsCount;
    }

    this.getTotalPoints = function() {
        return totalPoints;
    }

    this.addBurst = function(balloon) {
        burstsCount++;

        var friendUid = balloon.vo.friend.uid;
        totalPoints += balloon.vo.points;

        if (!friendBalloonMap[friendUid]) {
            friendBalloonMap[friendUid] = 0;
        }

        friendBalloonMap[friendUid]++;

        if (console.table) {
            console.table(friendBalloonMap);
        } else {
            console.log("bursted: ", burstsCount);
        }

    }

    this.saveProgress = function() {
        //save
    }

}
