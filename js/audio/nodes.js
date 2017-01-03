// Yes, I realize this script's name is kinda funny. I got nothing better to call it.

var Nodes = new function() {

    const BUFFER_INTERVAL = 1024;

    var context;
    var bufferSource;
    var audioBuffer;
    var analyzer;
    var scriptProcessor;

    this.setUp = function() {
        context = new AudioContext();
        bufferSource = context.createBufferSource();
        bufferSource.connect(context.destination);

        scriptProcessor = context.createScriptProcessor(BUFFER_INTERVAL, 1, 1);
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
        var request = new XMLHttpRequest();
        request.open("GET", Util.getCurrentUrlPrefix() + "/songs/" + song.getFileId());
        request.responseType = "arraybuffer";
        request.onload = () => context.decodeAudioData(request.response, playBuffer, console.log);
        request.send();
    };
    
    var playBuffer = function(buffer) {
        bufferSource.buffer = buffer;
        bufferSource.start(0);
        console.log("wtf");
    };

}
