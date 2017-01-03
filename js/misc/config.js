let Config = new function() {
    // analyzer config
    this.temporalSmoothing = 0.1;
    this.minDecibels = -40;
    this.maxDecibels = -33;
    this.fftSize = 16384;

    // emblem config
    this.minEmblemSizeRatio = 2;
    this.maxEmblemSizeRatio = 3;

    // transform config
    this.startBin = 12;
    this.keepBins = 64;
    this.interpolatationPasses = 2;

    // spectrum config
    this.smoothingPasses = 1;
    this.smoothingPoints = 3;
}
