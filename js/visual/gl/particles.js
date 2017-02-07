let Particles = new function() {

    const VERTEX_SIZE = 3;

    let particleCount;
    let spawnedCount = 0;

    this.particlesGeom;
    let particleTexture;
    let particleSystem;

    let velocities;

    this.setUp = function() {
        particleCount = (($(document).width() * $(document).height()) / (1920 * 1080)) * Config.baseParticleCount;

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
            vertexShader: Shader.vertShader,
            fragmentShader: Shader.fragShader,
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

    this.updateParticles = function() {
        if (spawnedCount < particleCount) {
            let toSpawn = Math.random() * Config.particleMaxSpawnRate;
            for (let i = spawnedCount; i < spawnedCount + toSpawn; i++) {
                resetVelocity(i);
                spawnedCount++;
            }
        }

        for (let i = 0; i < Particles.particlesGeom.attributes.position.array.length / VERTEX_SIZE; i++) {
           updatePosition(i);
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    let updatePosition = function(i) {
        if (velocities[i] == undefined) { // no velocity set - don't move
            return;
        }

        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 0] += velocities[i].x * 0.1;
        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 1] += velocities[i].y * 0.1;
        Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 2] += 1;
        if (Particles.particlesGeom.attributes.position.array[VERTEX_SIZE * i + 2] + Config.particleDespawnBuffer > Config.cameraZPlane) {
            respawnParticle(i);
        }
    }

    let initializeParticles = function() {
        let posArr = new Float32Array(particleCount * VERTEX_SIZE);
        let sizeArr = new Float32Array(particleCount);
        let alphaArr = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            let particle = new THREE.Vector3(0, 0, 0);
            resetVelocity(particle);
            posArr[VERTEX_SIZE * i + 0] = particle.x;
            posArr[VERTEX_SIZE * i + 1] = particle.y;
            posArr[VERTEX_SIZE * i + 2] = particle.z;
            sizeArr[i] = Math.random() * (Config.particleSizeMax - Config.particleSizeMin) + Config.particleSizeMin;
            alphaArr[i] = 0.6;

            //resetVelocity(i);
        }
        particleSystem.geometry.addAttribute("position", new THREE.BufferAttribute(posArr, 3));
        particleSystem.geometry.addAttribute("size", new THREE.BufferAttribute(sizeArr, 1));
        particleSystem.geometry.addAttribute("alpha", new THREE.BufferAttribute(alphaArr, 1));
    }

    let respawnParticle = function(i) {
        resetPosition(i);
        resetVelocity(i);
    }

    let resetPosition = function(i) {
        for (let j = 0; j < VERTEX_SIZE; j++) {
            Particles.particlesGeom.attributes.position.array[i * VERTEX_SIZE + j] = 0;
        }
    }

    let resetVelocity = function(i) {
        let r = (Config.particleRadiusMax - Config.particleRadiusMin) * Math.random() + Config.particleRadiusMin;
        let theta = MathConstants.TWO_PI * Math.random();
        velocities[i] = new THREE.Vector2(r * Math.cos(theta), r * Math.sin(theta));
    }

}
