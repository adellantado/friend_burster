/**
 * Created by ader on 11/29/14.
 */
this.SocketDataExchanger = function() {

    const CLICK_COMMAND = "click";
    const MOVE_COMMAND = "move";
    const PLAY_COMMAND = "play";

    var socketChain = new SocketChain();

    socketChain.connect('localhost', 8080)
        .then(function(){})
        .catch(function(e){});

    var listenChain;
    var sendChain;

    this.getListenChain = function() {

        var moveChain;
        var clickChain;
        var playChain;

        listenChain = listenChain || socketChain.listen()
            .filter(function(data){
                return data;
            })
            .map(JSON.parse)
            .then(function(commandObj){
                if (clickChain && commandObj.hasOwnProperty(CLICK_COMMAND)) {
                    clickChain.resolve(commandObj[CLICK_COMMAND]);
                }
                if (moveChain && commandObj.hasOwnProperty(MOVE_COMMAND)) {
                    moveChain.resolve(commandObj[MOVE_COMMAND]);
                }
                if (playChain && commandObj.hasOwnProperty(PLAY_COMMAND)) {
                    playChain.resolve(commandObj[PLAY_COMMAND]);
                }
            });

        return {
            move: moveChain = moveChain || new Chain(),
            click: clickChain  = clickChain || new Chain(),
            play: playChain = playChain || new Chain()

        };
    }

    this.getSendChain = function(stage) {

        var stage = stage;

        var moveChain;
        var clickChain;
        var playChain;

        stage.addEventListener("tick", function(e){
            if (!createjs.Ticker.getPaused()) {
                sendMove(getPos());
            }
        });
        stage.addEventListener("click", function(e){
            if (!createjs.Ticker.getPaused()) {
                sendClick(getPos());
            }
        });

        function getPos() {
            return {x:stage.mouseX, y:stage.mouseY};
        }

        var sendClick = function(pos) {
            var obj = {};
            obj[CLICK_COMMAND] = pos;
            sendData(obj)
            clickChain.resolve();
        }

        var sendMove = function(pos) {
            var obj = {};
            obj[MOVE_COMMAND] = pos;
            sendData(obj);
            moveChain.resolve();
        }

        var sendData = function(data) {
            socketChain.send(JSON.stringify(data));
        }

        return {
            move: moveChain = moveChain || new Chain(),
            click: clickChain  = clickChain || new Chain(),
            play: playChain = playChain || new Chain()

        };
    }

}