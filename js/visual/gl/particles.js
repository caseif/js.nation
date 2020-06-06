let Particles = new function() {

    const VERTEX_SIZE = 3;

    this.particlesGeom;
    let particleTexture;
    let particleSystem;

    let particleData = [];
    let baseSizes = [];

    this.setUp = function() {
        this.particlesGeom = new THREE.BufferGeometry();
        let texLoader = new THREE.TextureLoader();
        texLoader.crossOrigin = "";

        let texLoc;
        // Chrome is fussy about CORS in this case, so we have to access a
        // remotely hosted version if we're running from the local filesystem
        if (location.protocol == "file:" && /Chrome/.test(navigator.userAgent)) {
            texLoc = "https://i.imgur.com/Qz4ftah.png";
            console.log("Using Chrome particle hack");
        } else {
            texLoc = "./img/particle.png";
        }

        particleTexture = texLoader.load(texLoc);
        particleTexture.minFilter = THREE.LinearFilter;

        let uniforms = {
            color: { type: "c", value: new THREE.Color(0xFFFFFF)},
            texture: { type: "t", value: particleTexture }
        };

        let pMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: Shaders.vertShader,
            fragmentShader: Shaders.fragShader,
            blending: THREE.NormalBlending,
            transparent: true
        });

        particleSystem = new THREE.Points(this.particlesGeom, pMaterial);
        particleSystem.sortParticles = true;
        particleSystem.geometry.dynamic = true;

        initializeParticles();

        Scene.glScene.add(particleSystem);

        Callbacks.addCallback(this.updateParticles, Priority.NORMAL);
    }

    this.updateParticles = function(spectrum, multiplier) {
        for (let i = 0; i < Config.maxParticleCount / 2; i++) {
           updatePosition(i, multiplier);
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    let updatePosition = function(i, multiplier, ignoreSpeed) {
        let data = particleData[i];

        if (data === undefined) {
            return; // no data set, so particle is "despawned"
        }

        let speed = ignoreSpeed ? 1 : data.getSpeed();
        adjustedSpeed = Math.max(speed * multiplier, Config.particleBaseSpeed);

        let ampMult = (Config.particlePhaseAmplitudeMultMax - Config.particlePhaseAmplitudeMultMin) * multiplier
                + Config.particlePhaseAmplitudeMultMin;
        let phaseX = Math.sin(MathConstants.TWO_PI * data.getPhase().x) * data.getPhaseAmplitude().x * ampMult;
        let phaseY = Math.sin(MathConstants.TWO_PI * data.getPhase().y) * data.getPhaseAmplitude().y * ampMult;

        let baseIndex = VERTEX_SIZE * i;
        let x = Particles.particlesGeom.attributes.position.array[baseIndex + 0]
                + data.getTrajectory().x * adjustedSpeed
                + phaseX;
        let y = Particles.particlesGeom.attributes.position.array[baseIndex + 1]
                + data.getTrajectory().y * adjustedSpeed
                + phaseY;
        let z = Particles.particlesGeom.attributes.position.array[baseIndex + 2] + adjustedSpeed;

        if (z + Config.particleDespawnBuffer > Config.cameraZPlane) {
            despawnParticle(i);
        } else {
            applyPosition(i, x, y, z);
        }

        let speedMult = (Config.particlePhaseSpeedMultMax - Config.particlePhaseSpeedMultMin) * multiplier
                + Config.particlePhaseSpeedMultMin;
        data.augmentPhase(
            data.getPhaseSpeed().x * speedMult,
            data.getPhaseSpeed().y * speedMult
        );
    }

    let initializeParticles = function() {
        let posArr = new Float32Array(Config.maxParticleCount * VERTEX_SIZE);
        let sizeArr = new Float32Array(Config.maxParticleCount);
        let alphaArr = new Float32Array(Config.maxParticleCount);

        particleSystem.geometry.addAttribute("position", new THREE.BufferAttribute(posArr, 3));
        particleSystem.geometry.addAttribute("size", new THREE.BufferAttribute(sizeArr, 1));

        for (let i = 0; i < Config.maxParticleCount / 2; i++) {
            applyPosition(i, 0, 0, 0);
            baseSizes[i] = Util.random(Config.particleSizeMin, Config.particleSizeMax);
            applyMirroredValue(alphaArr, i, Math.random(Config.particleOpacityMin, Config.particleOpacityMax));

            resetVelocity(i);
        }

        Particles.updateSizes();

        particleSystem.geometry.addAttribute("alpha", new THREE.BufferAttribute(alphaArr, 1));

        for (let i = 0; i < Config.maxParticleCount / 2; i++) {
            updatePosition(i, Math.random() * Config.cameraZPlane, true);
        }
    }

    let spawnParticle = function(i) {
        resetVelocity(i); // attach a new speed to the particle, effectively "spawning" it
    }

    let despawnParticle = function(i) {
        // we can't technically despawn a discrete particle since it's part of a
        // particle system, so we just reset the position and pretend
        resetPosition(i);
        particleData[i] = undefined; // clear the data so other functions know this particle is "despawned"
        resetVelocity(i);
    }

    let resetPosition = function(i) {
        applyPosition(i, 0, 0, 0);
    }

    let resetVelocity = function(i) {
        let r = Util.random(Config.particleRadiusMin, Config.particleRadiusMax);
        let theta = Math.PI * Math.random() - Math.PI / 2;
        let trajectory = new THREE.Vector2(
            r * Math.cos(theta) / Config.cameraZPlane,
            r * Math.sin(theta) / Config.cameraZPlane
        );
        
        let speed = Util.random(Config.particleSpeedMultMin, Config.particleSpeedMultMax);

        let phaseAmp = new THREE.Vector2(
            Util.random(Config.particlePhaseAmplitudeMin, Config.particlePhaseAmplitudeMax),
            Util.random(Config.particlePhaseAmplitudeMin, Config.particlePhaseAmplitudeMax)
        );

        let phaseSpeed = new THREE.Vector2(
            Util.random(Config.particlePhaseSpeedMin, Config.particlePhaseSpeedMax),
            Util.random(Config.particlePhaseSpeedMin, Config.particlePhaseSpeedMax)
        );

        particleData[i] = new ParticleData(trajectory, speed, phaseAmp, phaseSpeed);
    }

    this.updateSizes = function() {
        for (let i = 0; i < Config.maxParticleCount / 2; i++) {
            applyMirroredValue(this.particlesGeom.attributes.size.array, i,
                    baseSizes[i] * Util.getResolutionMultiplier());
        }
        this.particlesGeom.attributes.size.needsUpdate = true;
    }

    let applyPosition = function(i, x, y, z) {
        let baseIndex = VERTEX_SIZE * i;
        let shiftedBaseIndex = baseIndex + Config.maxParticleCount / 2;
        applyMirroredValue(Particles.particlesGeom.attributes.position.array, baseIndex + 0, x, VERTEX_SIZE);
        applyMirroredValue(Particles.particlesGeom.attributes.position.array, baseIndex + 1, y, VERTEX_SIZE);
        applyMirroredValue(Particles.particlesGeom.attributes.position.array, baseIndex + 2, z, VERTEX_SIZE);
        Particles.particlesGeom.attributes.position.array[baseIndex + Config.maxParticleCount * (3 / 2)] *= -1;
    }

    let applyMirroredValue = function(array, i, value, step = 1) {
        array[i] = value;
        array[i + step * Config.maxParticleCount / 2] = value;
    }

}
