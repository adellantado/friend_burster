/** 
 * Created by maxpaint on 08.11.2014.
 */
function SoundManager() {

    var self = this;

    var musicInstance;
    var popInstance;
    var gameOverInstance;
    var pauseInstance;
    var paused = false;

    var callback;

    if (!createjs.Sound.initializeDefaultPlugins()) {
        return;
    }

    var manifest = [
        {src: musicPath+"BalloonPopping.ogg", id: "pop"},
        {src: musicPath+"8_BIT_dubstep.ogg", id: "music"},
        {src: musicPath+"smb_mariodie.ogg", id: "gameOver"},
        {src: musicPath+"smb_pause.ogg", id: "pause"}

    ];

    //createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadMusicHandler, (this)));
    //createjs.Sound.addEventListener("fileload", playSound);
    createjs.Sound.registerManifest(manifest);

    this.playMusic = function() {

        if (!musicInstance) {
            //musicInstance = createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE);
            musicInstance = createjs.Sound.createInstance("music");
        }
        if (paused) {
            musicInstance.resume();
            paused = false;
        } else {
            musicInstance.play(createjs.Sound.INTERRUPT_NONE);
        }

        return self;
    }

    this.stopMusic = function() {
        createjs.Sound.stop();
        musicInstance = null;
        paused = false;
        return self;
    }

    this.pauseMusic = function() {
        if (musicInstance) {
            paused = musicInstance.pause();
        }
        return self;
    }

    this.playPop = function() {
        if (popInstance) {
            popInstance.play(createjs.Sound.INTERRUPT_ANY);
        } else {
            popInstance = createjs.Sound.play('pop', createjs.Sound.INTERRUPT_ANY);
        }
        return self;
    }

    this.playGameOver = function() {
        if (gameOverInstance) {
            gameOverInstance.play(createjs.Sound.INTERRUPT_ANY);
        } else {
            gameOverInstance = createjs.Sound.play('gameOver', createjs.Sound.INTERRUPT_ANY);
        }
        return self;
    }

    this.playPause = function() {
        if (pauseInstance) {
            pauseInstance.play(createjs.Sound.INTERRUPT_ANY);
        } else {
            pauseInstance = createjs.Sound.play('pause', createjs.Sound.INTERRUPT_ANY);
        }
        return self;
    }

    this.setVolume = function(value) {
        if (musicInstance) {
            musicInstance.setVolume(value);
        }
        return self;
    }

    this.mute = function() {
        createjs.Sound.setMute(true);
        return self;
    }

    this.unmute = function() {
        createjs.Sound.setMute(false);
        return self;
    }

}
