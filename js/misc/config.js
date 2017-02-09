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
    this.maxParticleCount = 1600; // particle count at 1080p
    this.particleMaxSpawnRate = 8; // max particles to spawn each frame. this takes effect during particle initlzn.
    this.particleOpacityMin = 0.9;
    this.particleOpacityMax = 1;
    this.particleSizeMin = 5;
    this.particleSizeMax = 14;
    this.cameraZPlane = 200; // the z-plane on which to place the camera
    this.particleDespawnBuffer = 0; // distance from the camera z-plane before despawning particles
    this.particleRadiusMin = 30; // the minimum radius of the particle cone at the z-plane intersecting the camera
    this.particleRadiusMax = 60; // the maximum radius of the particle cone at the z-plane intersecting the camera
    this.particleBaseSpeed = 0.3;
    this.particleSpeedMultMin = 2;
    this.particleSpeedMultMax = 3;
    this.particlePhaseSpeedMin = 0.1;
    this.particlePhaseSpeedMax = 0.2;
    this.particlePhaseAmplitudeMin = 0;
    this.particlePhaseAmplitudeMax = 0.75;

    // gui config
    this.guiTimeout = 2000;
    this.guiFadeTime = 350;
}
