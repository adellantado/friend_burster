/**
 * Created by maxpaint on 08.11.2014.
 */
function BonusCounter() {

    var eventDis = new EventDispatcher();


    var burstsCount = 0;
    var totalPoints = 0;
    var totalBalloons = 0;

    var gameLevel = 1;

    var friendBalloonMap = {};

    this.getGameLevel = function() {
        return gameLevel;
    }
    function levelInc() {
        eventDis.dispatchEvent(new GameEvent("gameLevelChanged", ++gameLevel));
    }

    this.getBurstCount = function() {
        return burstsCount;
    }

    this.getTotalPoints = function() {
        return totalPoints;
    }

    this.addBalloon = function(balloon) {
        totalBalloons++;

        if (totalBalloons % 40 == 0) {
            levelInc();
        }
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

    this.restoreProgress = function() {
        // restore
    }

}
