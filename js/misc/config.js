let Config = new function() {
    // analyzer config
    this.temporalSmoothing = 0.1;
    this.minDecibels = -40;
    this.maxDecibels = -30;
    this.fftSize = 16384;

    // emblem config
    this.minEmblemSize = 480;
    this.maxEmblemSize = 600;
    this.maxShakeIntensity = Math.PI / 3;
    this.maxShakeDisplacement = 8;
    this.minShakeScalar = 0.9;
    this.maxShakeScalar = 1.6;

    // transform config
    this.startBin = 8;
    this.keepBins = 40;

    // spectrum config
    this.smoothingPasses = 1;
    this.smoothingPoints = 3;
    this.spectrumHeightScalar = 0.4;
    this.glowRadius = 25;

    this.spectrumCount = 8;
    this.exponents = [1, 1.12, 1.14, 1.30, 1.33, 1.36, 1.50, 1.52];
    this.smoothMargins = [0, 2, 2, 3, 3, 3, 5, 5];
    //              white      yellow      red        pink      indigo    blue        lightblue  green
    this.colors = ["#FFFFFF", "#FFFF00", "#FF0000", "#FF66FF", "#333399", "#0000FF", "#33CCFF", "#00FF00"];
    this.delays = [0, 1, 2, 3, 4, 5, 6, 7];

    // particle config
    this.maxParticleCount = 2400; // particle count at 1080p
    this.particleMaxSpawnRate = 8; // max particles to spawn each frame. this takes effect during particle initlzn.
    this.particleOpacityMin = 0.9;
    this.particleOpacityMax = 1;
    this.particleSizeMin = 8;
    this.particleSizeMax = 13;
    this.cameraZPlane = 200; // the z-plane on which to place the camera
    this.particleDespawnBuffer = 0; // distance from the camera z-plane before despawning particles
    this.particleRadiusMin = 10; // the minimum radius of the particle cone at the z-plane intersecting the camera
    this.particleRadiusMax = 120; // the maximum radius of the particle cone at the z-plane intersecting the camera
    this.particleBaseSpeed = 0.15;
    this.particleSpeedMultMin = 1.1;
    this.particleSpeedMultMax = 1.45;
    // The min/max phase speed a particle may be assigned. This is a property of each particle and does not change.
    this.particlePhaseSpeedMin = 0.1;
    this.particlePhaseSpeedMax = 0.25;
    // The min/max phase amplitude a particle may be assigned. This is a property of each particle and does not change.
    this.particlePhaseAmplitudeMin = 0.05;
    this.particlePhaseAmplitudeMax = 0.4;
    // The min/max to normalize the particle phase speed multiplier to.
    this.particlePhaseSpeedMultMin = 0.025;
    this.particlePhaseSpeedMultMax = 0.4;
    // The min/max to normalize the particle phase amplitude multiplier to.
    this.particlePhaseAmplitudeMultMin = 0.1;
    this.particlePhaseAmplitudeMultMax = 1;

    // gui config
    this.guiTimeout = 2000;
    this.guiFadeTime = 350;

    // background config
    this.backgroundSubreddit = "EarthPorn";

    // debug settings
    this.drawEmblem = true;
    this.drawSpectrum = true;
    this.drawParticles = true;
    this.drawBackground = true;
    this.forceImgurBackground = false;
    this.forceStaticBackground = false;
    this.keepGui = false;
}
