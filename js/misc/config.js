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
    this.baseParticleCount = 800; // particle count at 1080p
    this.particleOpacity = 0.9;
    this.particleSizeMin = 0.2;
    this.particleSizeMax = 2.5;
    this.cameraZPlane = 200; // the z-plane on which to place the camera
    this.particleDespawnBuffer = 0; // distance from the camera z-plane before despawning particles
    this.particleRadiusMin = 30; // the minimum radius of the particle cone at the z-plane intersecting the camera
    this.particleRadiusMax = 60; // the maximum radius of the particle cone at the z-plane intersecting the camera
    this.particleMaxSpawnRate = 3; // max particles to spawn each frame. this takes effect during particle initlzn.

    // gui config
    this.guiTimeout = 2000;
    this.guiFadeTime = 350;
}
