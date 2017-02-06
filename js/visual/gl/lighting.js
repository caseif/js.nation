let Lighting = new function() {

    let pointLight;

    this.setUp = function() {
        pointLight = new THREE.PointLight(0xFFFFFF)

        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        Scene.glScene.add(pointLight);
    }

}
