let Transform = new function() {

    this.transform = function(spectrum) {
        return spectrum.slice(0, Config.keepBins);
    }

    this.multiplier = function(spectrum) {
        let sum = 0;
        let len = spectrum.length;
        for (let i = 0; i < len; i++) {
            sum += spectrum[i];
        }
        return sum / Config.keepBins / 256;
    }

}
