// Yes, I realize this script's name is kinda funny. I got nothing better to call it.

let Nodes = new function() {

    const BUFFER_INTERVAL = 1024;

    let context;
    let bufferSource;
    let audioBuffer;
    let analyzer;
    let scriptProcessor;

    let earlyCallbacks = [];
    let normalCallbacks = [];
    let lateCallbacks = [];

    let spectrum;
    let multiplier;

    this.setUp = function() {
        context = new AudioContext();
        bufferSource = context.createBufferSource();
        bufferSource.connect(context.destination);

        scriptProcessor = context.createScriptProcessor(BUFFER_INTERVAL, 1, 1);
        scriptProcessor.onaudioprocess = handleAudio;
        scriptProcessor.connect(context.destination);

        analyzer = context.createAnalyser();
        analyzer.connect(scriptProcessor);
        analyzer.smoothingTimeConstant = Config.temporalSmoothing;
        analyzer.minDecibels = Config.minDecibels;
        analyzer.maxDecibels = Config.maxDecibels;

        try {
            analyzer.fftSize = Config.fftSize; // ideal bin count
            console.log("Using fftSize of " + analyzer.fftSize + " (woot!)");
        } catch (ex) {
            analyzer.fftSize = 2048; // this will work for most if not all systems
            console.log("Using fftSize of " + analyzer.fftSize);
            alert("Failed to set optimal fftSize! This may look a bit weird...");
        }

        bufferSource.connect(analyzer);
    };

    this.playSong = function(song) {
        let request = new XMLHttpRequest();
        request.open("GET", Util.getCurrentUrlPrefix() + "/songs/" + song.getFileId());
        request.responseType = "arraybuffer";
        request.onload = () => context.decodeAudioData(request.response, playBuffer, console.log);
        request.send();
    };
    
    let playBuffer = function(buffer) {
        bufferSource.buffer = buffer;
        bufferSource.start(0);
    };

    let handleAudio = function() {
        let array =  new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(array);
        spectrum = Transform.transform(array);
        multiplier = Transform.multiplier(spectrum);
        handleCallbacks();
    }

    let handleCallbacks = function() {
        handleCallbackArray(earlyCallbacks);
        handleCallbackArray(normalCallbacks);
        handleCallbackArray(lateCallbacks);
    }

    let handleCallbackArray = function(callbacks) {
        let len = callbacks.length;
        for (let i = 0; i < len; i++) {
            callbacks[i](spectrum, multiplier);
        }
    }

    this.addCallback = function(callback, priority) {
        if (priority == undefined) {
            priority = 1;
        }
        switch (priority) {
            case 0: {
                earlyCallbacks.push(callback);
                break;
            }
            case 1: {
                normalCallbacks.push(callback);
                break;
            }
            case 2: {
                lateCallbacks.push(callback);
                break;
            }
            default: {
                throw "Invalid callback priority";
            }
        }
    }

}
