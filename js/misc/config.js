let Config = new function() {
    // analyzer config
    this.temporalSmoothing = 0.1;
    this.minDecibels = -40;
    this.maxDecibels = -30;
    this.fftSize = 16384;

    // emblem config
    this.minEmblemSize = 360;
    this.maxEmblemSize = 540;
    this.maxShakeIntensity = Math.PI / 2;
    this.maxShakeDisplacement = 20;
    this.minShakeScalar = 0.9;
    this.maxShakeScalar = 1.2;

    // transform config
    this.startBin = 12;
    this.keepBins = 48;

    // spectrum config
    this.smoothingPasses = 1;
    this.smoothingPoints = 3;
    this.spectrumHeightScalar = 0.5;

    // particle config
    this.baseParticleCount = 600; // particle count at 1080p
    this.particleOpacity = 0.6;
    this.particleSizeMin = 0.3;
    this.particleSizeMax = 2;
    this.cameraZPlane = 100; // the z-plane on which to place the camera
    this.particleDespawnBuffer = 0; // distance from the camera z-plane before despawning particles
    this.particleRadiusMin = 0.3; // the minimum radius of the particle cone at the z-plane intersecting the camera
    this.particleRadiusMax = 2; // the maximum radius of the particle cone at the z-plane intersecting the camera

    // gui config
    this.guiTimeout = 2000;
    this.guiFadeTime = 350;
}
