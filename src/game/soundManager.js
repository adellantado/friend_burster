/**
 * Created by maxpaint on 08.11.2014.
 */
function SoundManager(manifest) {

    var self = this;

    var manifest = manifest;

    var musicInstance;
    var soundInstance;
    var paused = false;

    if (!createjs.Sound.initializeDefaultPlugins()) {
        return;
    }
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
        if (soundInstance) {
            soundInstance.play(createjs.Sound.INTERRUPT_ANY);
        } else {
            soundInstance = createjs.Sound.play('sound', createjs.Sound.INTERRUPT_ANY);
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