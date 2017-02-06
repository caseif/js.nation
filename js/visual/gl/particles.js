let Particles = new function() {

    let particleCount;

    let particlesGeom;
    let particleTexture;
    let particleSystem;

    this.setUp = function() {
        particleCount = (($(document).width() * $(document).height()) / (1920 * 1080)) * Config.baseParticleCount;

        particlesGeom = new THREE.Geometry();
        let texLoader = new THREE.TextureLoader();
        particleTexture = texLoader.load("./img/particle.png");
        particleTexture.minFilter = THREE.LinearFilter;

        var pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            opacity: Config.particleOpacity,
            size: 5,
            map: particleTexture,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        particleSystem = new THREE.Points(particlesGeom, pMaterial);
        particleSystem.sortParticles = true;
        particleSystem.geometry.dynamic = true;

        Scene.glScene.add(particleSystem);

        Callbacks.addCallback(this.updateParticles, Priority.NORMAL);
    }

    this.updateParticles = function() {
        //TODO
    }

}
