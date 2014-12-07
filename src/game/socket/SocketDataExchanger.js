/**
 * Created by ader on 11/29/14.
 */
this.SocketDataExchanger = function(callback) {

    const CLICK_COMMAND = "click";
    const MOVE_COMMAND = "move";
    const PLAY_COMMAND = "play";
    const TICK_COMMAND = "tick";
    const HOST_COMMAND = "host";
    const POP_COMMAND = "pop";

    var self = this;

    var socketChain = new SocketChain();

    var _host;

    this.isHost = function() {
        return _host;
    }

    socketChain.connect('localhost', 8080)
        .then(initHost)
        .catch(function(e){});

    function initHost() {
        var initListen = self.getListenChain().host.then(callback);
    }


    var listenChain;
    var sendChain;

    var l = {moveChain: null,
             clickChain: null,
             playChain: null,
             tickChain: null,
             hostChain: null,
             popChain: null}

    this.getListenChain = function() {

        listenChain = listenChain || socketChain.listen()
            .filter(function(data){
                return data;
            })
            .map(JSON.parse)
            .then(function(commandObj){
                if (l.clickChain && commandObj.hasOwnProperty(CLICK_COMMAND)) {
                    l.clickChain.resolve(commandObj[CLICK_COMMAND]);
                }
                if (l.moveChain && commandObj.hasOwnProperty(MOVE_COMMAND)) {
                    l.moveChain.resolve(commandObj[MOVE_COMMAND]);
                }
                if (l.playChain && commandObj.hasOwnProperty(PLAY_COMMAND)) {
                    l.playChain.resolve(commandObj[PLAY_COMMAND]);
                }
                if (l.tickChain && commandObj.hasOwnProperty(TICK_COMMAND)) {
                    l.tickChain.resolve(commandObj[TICK_COMMAND]);
                }
                if (l.hostChain && commandObj.hasOwnProperty(HOST_COMMAND)) {
                    l.hostChain.resolve(commandObj[HOST_COMMAND]);
                }
                if (l.popChain && commandObj.hasOwnProperty(POP_COMMAND)) {
                    l.popChain.resolve(commandObj[POP_COMMAND]);
                }
            });

        return {
            move: l.moveChain = l.moveChain || new Chain(),
            click: l.clickChain  = l.clickChain || new Chain(),
            play: l.playChain = l.playChain || new Chain(),
            tick: l.tickChain = l.tickChain || new Chain(),
            host: l.hostChain = l.hostChain || new Chain(),
            pop: l.popChain = l.popChain || new Chain()

        };
    }

    this.getSendChain = function(stage) {

        var stage = stage;

        var moveChain;
        var clickChain;
        var playChain;
        var tickChain;
        var popChain;

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

        var sendTick = function(rand) {
            var obj = {};
            obj[TICK_COMMAND] = rand;
            sendData(obj);
        }

        var sendPop = function(id) {
            var obj = {};
            obj[POP_COMMAND] = id;
            sendData(obj);
        }

        var sendData = function(data) {
            socketChain.send(JSON.stringify(data));
        }

        function getTickChain() {
            tickChain = new Chain();
            tickChain.then(sendTick);
            return tickChain;
        }

        function getPopChain() {
            popChain = new Chain();
            popChain.then(sendPop);
            return popChain;
        }

        return {
            move: moveChain = moveChain || new Chain(),
            click: clickChain  = clickChain || new Chain(),
            play: playChain = playChain || new Chain(),
            tick: tickChain = tickChain || getTickChain(),
            pop: popChain = popChain || getPopChain()

        };
    }

}