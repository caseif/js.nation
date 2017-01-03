var Transform = new function() {

    this.transform = function(spectrum) {
        return spectrum.slice(0, Config.keepBins);
    }

    this.multiplier = function(spectrum) {
        var sum = 0;
        var len = spectrum.length;
        for (let i = 0; i < len; i++) {
            sum += spectrum[i];
        }
        return sum / Config.keepBins / 256;
    }

}
