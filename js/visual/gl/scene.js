let Scene = new function() {

    const FOV = 45;
    let ASPECT;
    const Z_NEAR = 0.1;
    const Z_FAR = 10000;

    this.glScene;
    let glCamera;
    let frustum;

    this.setUp = function() {
        ASPECT = $(document).width() / $(document).height();

        this.glScene = new THREE.Scene();
        glCamera = new THREE.PerspectiveCamera(FOV, ASPECT, Z_NEAR, Z_FAR);
        frustum = new THREE.Frustum();

        glCamera.position.z = Config.cameraZPlane;
        glCamera.updateMatrixWorld();
        frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(glCamera.projectionMatrix, glCamera.matrixWorldInverse));
    }

}
