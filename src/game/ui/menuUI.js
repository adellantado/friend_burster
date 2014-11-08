/**
 * Created by maxpaint on 08.11.2014.
 */
MenuUI = (function(){
    var eventDis = new EventDispatcher();

    function showMessage(event){
        if(event instanceof GameEvent){
            PopupManager.showAlert(AppConst.GAME_OVER, AppConst.GAME_OVER_TITLE);
        }
    }
    eventDis.addEventListener(GameEventType.MISSED_BALLOON, showMessage);
})()
