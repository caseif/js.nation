// Yes, I realize this script's name is kinda funny. I got nothing better to call it.

let Nodes = new function() {

    const BUFFER_INTERVAL = 1024;

    let initialized = false;

    let context;
    let mediaSource;
    let analyzer;
    let scriptProcessor;

    this.setUp = function() {
        if (initialized) {
            throw "Already initialized (call destroyContext() first)";
        }

        context = new AudioContext();

        if (mediaSource == undefined) {
            mediaSource = context.createMediaElementSource(document.getElementsByTagName("audio")[0]);
        }
        mediaSource.connect(context.destination);

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

    this.playSong = function(song, url) {
        if(url == null){
            GuiWrapper.setTitle(song.getArtist(), song.getTitle());
        }
        $("#audio").attr("src", song != null ? "./songs/" + song.getFileId() : url);
        GuiWrapper.updatePlayBtn();
    }

    let handleAudio = function() {
        let array =  new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(array);

        let spectrum = Transform.transform(array);
        let multiplier = Transform.multiplier(spectrum);
        Callbacks.invokeCallbacks(spectrum, multiplier);
    }

    this.playSongFromUrl = function(url) {
        this.playSong(null, url);
    }

    this.playRandomSong = function() {
        Nodes.playSong(SongLoader.randomSong());
    }

}
