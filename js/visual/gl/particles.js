let Particles = new function() {

    const VERTEX_SIZE = 3;

    let maxParticleCount;
    let indexStack;

    this.particlesGeom;
    let particleTexture;
    let particleSystem;

    let velocities;

    this.setUp = function() {
        maxParticleCount = (($(document).width() * $(document).height()) / (1920 * 1080)) * Config.baseParticleCount;

        indexStack = [];
        for (let i = maxParticleCount - 1; i >= 0; i--) {
            indexStack.push(i);
        }

        velocities = [];

        this.particlesGeom = new THREE.BufferGeometry();
        let texLoader = new THREE.TextureLoader();
        particleTexture = texLoader.load("./img/particle.png");
        particleTexture.minFilter = THREE.LinearFilter;

        let uniforms = {
            color: { type: "c", value: new THREE.Color(0xFFFFFF)},
            texture: { type: "t", value: particleTexture }
        };

        let pMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: Shaders.vertShader,
            fragmentShader: Shaders.fragShader,
            blending: THREE.AdditiveBlending,
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
        mutliplier = Math.pow(multiplier, 2);

        if (indexStack.length > 0 && multiplier > 0) {
            let toSpawn = Math.min(Math.floor(Math.random() * Config.particleMaxSpawnRate), indexStack.length) * Math.pow(multiplier, 4);
            for (let i = 0; i < toSpawn; i++) {
                spawnParticle();
            }
        }

        for (let i = 0; i < maxParticleCount; i++) {
           updatePosition(i, multiplier);
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    let updatePosition = function(i, multiplier = 1) {
        if (velocities[i] === undefined) { // no velocity set - don't move
            return;
        }

        let speed = Math.random() * (Config.particleSpeedMax - Config.particleSpeedMin) + Config.particleSpeedMin;

        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 0] += velocities[i].x * multiplier * speed;
        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 1] += velocities[i].y * multiplier * speed;
        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 2] += multiplier * speed;
        if (Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 2] + Config.particleDespawnBuffer > Config.cameraZPlane) {
            despawnParticle(i);
        }
    }

    let initializeParticles = function() {
        let posArr = new Float32Array(maxParticleCount * VERTEX_SIZE);
        let sizeArr = new Float32Array(maxParticleCount);
        let alphaArr = new Float32Array(maxParticleCount);
        for (let i = 0; i < maxParticleCount; i++) {
            posArr[VERTEX_SIZE * i + 0] = 0;
            posArr[VERTEX_SIZE * i + 1] = 0;
            posArr[VERTEX_SIZE * i + 2] = 0;
            sizeArr[i] = Math.random() * (Config.particleSizeMax - Config.particleSizeMin) + Config.particleSizeMin;
            alphaArr[i] = Config.particleOpacity;

            resetVelocity(i);
        }
        particleSystem.geometry.addAttribute("position", new THREE.BufferAttribute(posArr, 3));
        particleSystem.geometry.addAttribute("size", new THREE.BufferAttribute(sizeArr, 1));
        particleSystem.geometry.addAttribute("alpha", new THREE.BufferAttribute(alphaArr, 1));
    }

    let spawnParticle = function() {
        let i = indexStack.pop(); // get the next available index
        resetVelocity(i); // attach a new speed to the particle, effectively "spawning" it
    }

    let despawnParticle = function(i) {
        // we can't technically despawn a discrete particle since it's part of a
        // particle system, so we just reset the position and pretend
        resetPosition(i);
        velocities[i] = undefined; // clear the velocity so other functions know this particle is "despawned"
        indexStack.push(i); // push it to the stack to mark the index as free
    }

    let resetPosition = function(i) {
        for (let j = 0; j < VERTEX_SIZE; j++) {
            Particles.particlesGeom.attributes.position.array[i * VERTEX_SIZE + j] = 0;
        }
    }

    let resetVelocity = function(i) {
        let r = (Config.particleRadiusMax - Config.particleRadiusMin) * Math.random() + Config.particleRadiusMin;
        let theta = MathConstants.TWO_PI * Math.random();
        velocities[i] = new THREE.Vector2(
            r * Math.cos(theta) / Config.cameraZPlane,
            r * Math.sin(theta) / Config.cameraZPlane
        );
    }

}
