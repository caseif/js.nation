// Yes, I realize this script's name is kinda funny. I got nothing better to call it.

let Nodes = new function() {

    const BUFFER_INTERVAL = 1024;

    let initialized = false;

    let context;
    let bufferSource;
    let audioBuffer;
    let analyzer;
    let scriptProcessor;

    this.setUp = function() {
        if (initialized) {
            throw "Already initialized (call destroyContext() first)";
        }

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

        initialized = true;
    };

    this.playSong = function(song) {
        if (bufferSource.buffer != undefined) {
            throw "Already playing song (must reinitialize first)";
        }

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

        let spectrum = Transform.transform(array);
        let multiplier = Transform.multiplier(spectrum);
        Callbacks.invokeCallbacks(spectrum, multiplier);
    }

    this.destroyContext = function() {
        if (!initialized) {
            throw "Not yet initialized";
        }

        bufferSource.stop();
        context.close();

        context = null;
        bufferSource = null;
        audioBuffer = null;
        analyzer = null;
        scriptProcessor = null;

        Callbacks.invokeCallbacks([], 0);

        initialized = false;
    }

}
