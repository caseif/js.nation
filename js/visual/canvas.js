let Canvas = new function() {

    this.canvas = $("#canvas").get()[0];
    this.context = canvas.getContext("2d");

    const WAVE_DURATION = Math.PI / 8;
    let waveFrameX = 0;
    let waveFrameY = 0;
    let waveSpeedX = 1;
    let waveSpeedY = 1;
    let waveAmplitudeX = 1;
    let waveAmplitudeY = 1;
    let trigX = Math.round(Math.random());
    let trigY = Math.round(Math.random());

    this.setUp = function() {
        $("#canvas").attr("width", $(window).width());
        $("#canvas").attr("height", $(window).height());

        this.context.fillStyle = "#FFFFFF";

        Nodes.addCallback(clearCallback, Priority.FIRST);
        Nodes.addCallback(shakeCallback, Priority.FIRST);
        Nodes.addCallback(postCallback, Priority.LAST);
    };

    let clearCallback = function() {
        Canvas.context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
    }

    let shakeCallback = function(_, multiplier) {
        Canvas.context.save();

        let step = Config.maxShakeIntensity * multiplier;
        waveFrameX += step * waveSpeedX;
        if (waveFrameX > WAVE_DURATION) {
            waveFrameX = 0;
            waveAmplitudeX = Util.random(Config.minShakeScalar, Config.maxShakeScalar);
            waveSpeedX = Util.random(Config.minShakeScalar, Config.maxShakeScalar) * (Math.random() < 0.5 ? -1 : 1);
            trigX = Math.round(Math.random());
        }
        waveFrameY += step * waveSpeedY;
        if (waveFrameY > WAVE_DURATION) {
            waveFrameY = 0;
            waveAmplitudeY = Util.random(Config.minShakeScalar, Config.maxShakeScalar);
            waveSpeedY = Util.random(Config.minShakeScalar, Config.maxShakeScalar) * (Math.random() < 0.5 ? -1 : 1);
            trigY = Math.round(Math.random());
        }

        let trigFuncX = trigX == 0 ? Math.cos : Math.sin;
        let trigFuncY = trigY == 0 ? Math.cos : Math.sin;

        let dx = trigFuncX(waveFrameX) * Config.maxShakeDisplacement * waveAmplitudeX * multiplier;
        let dy = trigFuncY(waveFrameY) * Config.maxShakeDisplacement * waveAmplitudeY * multiplier;

        Canvas.context.translate(dx, dy);
    };

    let postCallback = function() {
        Canvas.context.restore();
    };

}
