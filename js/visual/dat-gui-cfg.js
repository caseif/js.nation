let params = {
    temporalSmoothing: Config.temporalSmoothing,
    minDecibels: Config.minDecibels,
    maxDecibels: Config.maxDecibels,
    
    maxShakeDisplacement: Config.maxShakeDisplacement,
    minShakeScalar: Config.minShakeScalar,
    maxShakeScalar: Config.maxShakeScalar,

    startBin: Config.startBin,
    keepBins: Config.keepBins,
    
    smoothingPasses: Config.smoothingPasses,
    smoothingPoints: Config.smoothingPoints,
    spectrumHeightScalar: Config.spectrumHeightScalar,
    
    maxParticleCount: Config.maxParticleCount,
    particleMaxSpawnRate: Config.particleMaxSpawnRate,
    particleOpacityMin: Config.particleOpacityMin,
    particleOpacityMax: Config.particleOpacityMax,
    particleSizeMin: Config.particleSizeMin,
    particleSizeMax: Config.particleSizeMax,
    cameraZPlane: Config.cameraZPlane,
    particleRadiusMin: Config.particleRadiusMin,
    particleRadiusMax: Config.particleRadiusMax,
    particleBaseSpeed: Config.particleBaseSpeed,
    particleSpeedMultMin: Config.particleSpeedMultMin,
    particleSpeedMultMax: Config.particleSpeedMultMax,
    particlePhaseSpeedMin: Config.particlePhaseSpeedMin,
    particlePhaseSpeedMax: Config.particlePhaseSpeedMax,
    particlePhaseAmplitudeMin: Config.particlePhaseAmplitudeMin,
    particlePhaseAmplitudeMax: Config.particlePhaseAmplitudeMax, 
};
datgui = new dat.GUI();

datgui.add(params, 'temporalSmoothing').min(0.1).max(0.5).step(0.05).onFinishChange(function(e){Config.temporalSmoothing=e;})
datgui.add(params, 'minDecibels').min(-40).max(-20).step(1).onFinishChange(function(e){Config.minDecibels=e;})
datgui.add(params, 'maxDecibels').min(-30).max(-20).step(1).onFinishChange(function(e){Config.maxDecibels=e;})

datgui.add(params, 'maxShakeDisplacement').min(2).max(20).step(2).onFinishChange(function(e){Config.maxShakeDisplacement=e;})
datgui.add(params, 'minShakeScalar').min(0).max(1).step(0.1).onFinishChange(function(e){Config.minShakeScalar=e;})
datgui.add(params, 'maxShakeScalar').min(0).max(2).step(0.1).onFinishChange(function(e){Config.maxShakeScalar=e;})

datgui.add(params, 'startBin').min(0).max(48).step(0.1).onFinishChange(function(e){Config.startBin=e;})
datgui.add(params, 'keepBins').min(0).max(48).step(0.1).onFinishChange(function(e){Config.keepBins=e;})

datgui.add(params, 'smoothingPasses').min(0).max(3).step(1).onFinishChange(function(e){Config.smoothingPasses=e;})
datgui.add(params, 'smoothingPoints').min(0).max(6).step(1).onFinishChange(function(e){Config.smoothingPoints=e;})
datgui.add(params, 'spectrumHeightScalar').min(0).max(1).step(0.1).onFinishChange(function(e){Config.spectrumHeightScalar=e;})

datgui.add(params, 'maxParticleCount').min(1000).max(3000).step(100).onFinishChange(function(e){Config.maxParticleCount=e;})
datgui.add(params, 'particleMaxSpawnRate').min(1).max(10).step(1).onFinishChange(function(e){Config.particleMaxSpawnRate=e;})
datgui.add(params, 'particleOpacityMin').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particleOpacityMin=e;})
datgui.add(params, 'particleOpacityMax').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particleOpacityMax=e;})
datgui.add(params, 'particleSizeMin').min(0).max(20).step(1).onFinishChange(function(e){Config.particleSizeMin=e;})
datgui.add(params, 'particleSizeMax').min(0).max(20).step(1).onFinishChange(function(e){Config.particleSizeMax=e;})
datgui.add(params, 'cameraZPlane').min(100).max(400).step(10).onFinishChange(function(e){Config.cameraZPlane=e;})
datgui.add(params, 'particleRadiusMin').min(0).max(100).step(10).onFinishChange(function(e){Config.particleRadiusMin=e;})
datgui.add(params, 'particleRadiusMax').min(0).max(100).step(10).onFinishChange(function(e){Config.particleRadiusMax=e;})
datgui.add(params, 'particleSpeedMultMin').min(1).max(3).step(0.1).onFinishChange(function(e){Config.particleSpeedMultMin=e;})
datgui.add(params, 'particleSpeedMultMax').min(1).max(3).step(0.1).onFinishChange(function(e){Config.particleSpeedMultMax=e;})
datgui.add(params, 'particlePhaseSpeedMin').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particlePhaseSpeedMin=e;})
datgui.add(params, 'particlePhaseSpeedMax').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particlePhaseSpeedMax=e;})
datgui.add(params, 'particlePhaseAmplitudeMin').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particlePhaseAmplitudeMin=e;})
datgui.add(params, 'particlePhaseAmplitudeMax').min(0).max(1).step(0.1).onFinishChange(function(e){Config.particlePhaseAmplitudeMax=e;})