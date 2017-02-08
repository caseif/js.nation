function ParticleData(trajectory, speed, phaseAmp, phaseSpeed) {
    this.trajectory = trajectory; // the unit vector representing the trajectory of the particle
    this.speed = speed; // the speed multiplier of the particle
    this.phaseAmp = phaseAmp; // the amplitude of the particle's phase
    this.phaseSpeed = phaseSpeed; // the speed of the particle's phase
    this.phase = new THREE.Vector2(); // the current phase of the particle
}

ParticleData.prototype.getTrajectory = function() {
    return this.trajectory;
}

ParticleData.prototype.getSpeed = function() {
    return this.speed;
}

ParticleData.prototype.getPhaseAmplitude = function() {
    return this.phaseAmp;
}

ParticleData.prototype.getPhaseSpeed = function() {
    return this.phaseSpeed;
}

ParticleData.prototype.getPhase = function() {
    return this.phase;
}

ParticleData.prototype.augmentPhase = function(stepX, stepY) {
    this.phase.x = (this.phase.x + stepX) % 1;
    this.phase.y = (this.phase.y + stepY) % 1;
}
