let Renderer = new function() {

    const TARGET_FPS = 60;

    let renderer;

    this.setUp = function() {
        renderer = new THREE.WebGLRenderer({alpha: true})
        renderer.setSize($(document).width(), $(document).height());
        renderer.domElement.id = "canvas-gl";
        $("#content").append(renderer.domElement);
    }

    let startRenderLoop = function() {
        window.requestAnimFrame = () => {
            return window.requestAnimationFrame || (callback => window.setTimeout(callback, 1000 / TARGET_FPS));
        };

        (function animLoop(){
            updateParticles();
            requestAnimFrame(animLoop);
            renderer.render(Scene.glScene, Scene.glCamera);
        })();
    }

}