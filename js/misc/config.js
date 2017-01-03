let Config = new function() {
    // analyzer config
    this.temporalSmoothing = 0.1;
    this.minDecibels = -40;
    this.maxDecibels = -33;
    this.fftSize = 16384;

    // emblem config
    this.minEmblemSizeRatio = 2;
    this.maxEmblemSizeRatio = 3;
    this.maxShakeIntensity = Math.PI / 2;
    this.maxShakeDisplacement = 20;
    this.minShakeScalar = 0.9;
    this.maxShakeScalar = 1.1;

    // transform config
    this.startBin = 12;
    this.keepBins = 48;

    // spectrum config
    this.smoothingPasses = 1;
    this.smoothingPoints = 3;
    this.spectrumHeightScalar = 0.5;
}
