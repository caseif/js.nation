// Yes, I realize this script's name is kinda funny. I got nothing better to call it.

let Nodes = new function () {

    const BUFFER_INTERVAL = 1024;

    let initialized = false;

    let context;
    let mediaSource;
    let analyzer;
    let scriptProcessor;
    let gainNode;

    this.setUp = function () {
        if (initialized) {
            throw "Already initialized (call destroyContext() first)";
        }

        context = new AudioContext();

        if (mediaSource == undefined) {
            mediaSource = context.createMediaElementSource(document.getElementsByTagName("audio")[0]);
        }
        mediaSource.connect(context.destination);

        gainNode = context.createGain();
        mediaSource.connect(gainNode);
        gainNode.connect(context.destination);

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
            let msg = "Failed to set fftSize - try updating your browser.";
            alert(msg);
            throw new Error(msg);
        }

        mediaSource.connect(analyzer);

        initialized = true;
    }

    this.playSong = function (song, url) {
        try {
            if (context.state === "suspended") {
                context.resume().then(() => console.log('resumed')).catch(() => console.log('cannot resume'));
            }

            $("#audio").attr("src", song != null ? "./songs/" + song.getFileId() : url);
            let promise = $("#audio")[0].play();
            
            if (url == null) {
                GuiWrapper.setTitle(song.getArtist(), song.getTitle());
            }
            
            GuiWrapper.updatePlayBtn();

            return promise;
        } catch (ex) {
            $("#audio").attr("src", null);
            return Promise.reject(ex);
        }
    }

    let handleAudio = function () {
        let array = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(array);

        let spectrum = Transform.transform(array);
        let multiplier = Math.pow(Transform.multiplier(spectrum), 0.8);
        Callbacks.invokeCallbacks(spectrum, multiplier);
    }

    this.playSongFromUrl = function (url) {
        return this.playSong(null, url);
    }

    this.getVolume = function () {
        return Math.log((gainNode.gain.value + 1) * (Math.E - 1) + 1);
    }

    this.setVolume = function (volume) {
        gainNode.gain.value = (Math.exp(volume) - 1) / (Math.E - 1) - 1;
    }

}
