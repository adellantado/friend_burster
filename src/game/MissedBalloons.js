/**
 * Created by maxpaint on 08.11.2014.
 */

MissedBalloons = (function(){

    const MAX_COUNT_BALLOONS = 5;

    var eventDis = new EventDispatcher();
    var missedBalloon = 0;
    var missedBalloonView;

/*
    function missedBalloon(event){
        if(event instanceof GameEventType){
            missedBalloon++;

        }
    }*/

    function updateView(){
        var balloons = MAX_COUNT_BALLOONS - missedBalloon;
        if(balloons === 0) {
            eventDis.dispatchEvent(new GameEvent(GameEventType.MISSED_BALLOON));
        }

        createBalloons(balloons);
    }

    function createBalloons(balloons){
        if( missedBalloonView.getNumChildren() > 0){
            missedBalloonView.removeAllChildren ();
        }

        missedBalloonView.width = 17 * balloons + 5 * balloons;

        for (i = 0; i < balloons; i++) {
            var bitmap = new createjs.Bitmap("assets/balloon/small/smallBallon.png");
            bitmap.x = i * 17 + i * 5;
            bitmap.y = 0;
            bitmap.width = 17 + 5;
            bitmap.height = 41;
            missedBalloonView.addChild(bitmap);
        }

        stage.addChild(missedBalloonView);
        stage.update(missedBalloonView);

    }

    function init(){
        missedBalloonView = new createjs.Container();
        missedBalloonView.x = 470;
        missedBalloonView.height = 41;
        createBalloons( MAX_COUNT_BALLOONS );
    }

    init();


    return{
      getMissedBallon : function(){
          return missedBalloon;
      },

      cleanBallon: function( num ){
          missedBalloon = 0;
          updateView();
      },

       addMissedBallon: function( num ){
           missedBalloon += num;
           updateView();
       }

    };
})();
