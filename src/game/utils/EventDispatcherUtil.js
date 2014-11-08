/**
 * Created by maxpaint on 08.11.2014.
 */
EventDispatcherUtils = (function(){

    var typeCallBack = {};
    typeCallBack["type"] = [];

    function addEventListener(type, listener){
        var handlerFunctions;
        if(typeCallBack.hasOwnProperty(type)){
            handlerFunctions = typeCallBack[type];
            handlerFunctions.push(listener);
        }else{
            handlerFunctions = [];
            handlerFunctions.push(listener);
            typeCallBack[type] =  handlerFunctions;
        }
    }

    function removeEventListener(type, listener){
        var handlerFunctions = [];
        if(typeCallBack.hasOwnProperty(type)){
            handlerFunctions = typeCallBack[type];
            var index = handlerFunctions.indexOf(listener);
            handlerFunctions.splice(index, 1);
        }else{
            console.log("event do not register");
        }
    }

    function dispatchEvent(event){
        var type = event.type;
        var handlerFunctions = typeCallBack[type];//return array
        for (var i = 0; i < handlerFunctions.length; i++) {
            var cauurenFunction = handlerFunctions[i];
            cauurenFunction(event);
        }
    }

    return {
        addEventListener: function(type, listener){
            addEventListener(type, listener);
        },

        removeEventListener: function(type, listener){
            removeEventListener(type, listener);
        },

        dispatchEvent: function(event){
            dispatchEvent(event);
        }
    }
})();


function EventDispatcher(){
    this.addEventListener = function(type, listener){
        EventDispatcherUtils.addEventListener(type, listener);
    };

    this.removeEventListener = function(type, listener){
        EventDispatcherUtils.removeEventListener(type, listener);
    }

    this.dispatchEvent = function(event){
        EventDispatcherUtils.dispatchEvent(event);
    }
}
