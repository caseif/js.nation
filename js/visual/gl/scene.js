let Scene = new function() {

    const FOV = 45;
    let ASPECT;
    const Z_NEAR = 0.1;
    const Z_FAR = 10000;

    this.glScene;
    this.glCamera;
    let frustum;

    this.setUp = function() {
        ASPECT = $(document).width() / $(document).height();

        this.glScene = new THREE.Scene();
        this.glCamera = new THREE.PerspectiveCamera(FOV, ASPECT, Z_NEAR, Z_FAR);
        frustum = new THREE.Frustum();

        this.glCamera.position.z = Config.cameraZPlane;
        this.glCamera.updateMatrixWorld();
        frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(
            this.glCamera.projectionMatrix, this.glCamera.matrixWorldInverse
        ));
    }

}
