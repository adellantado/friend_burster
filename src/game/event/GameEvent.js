/**
 * Created by maxpaint on 08.11.2014.
 */
function GameEvent(typeValue, dataValue){
    this.type = typeValue;
    this.data = dataValue;

    this.init = function(){
        if(!(typeof this.type == "string")){
            console.log("event type must be String");
            throw new Error("event type must be String", 13);
        }
    }
    this.init();

}