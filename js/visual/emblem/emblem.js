let Emblem = new function() {

    let image;
    let loaded = false;
    let currentRadius;

    this.setUp = function() {
        image = new Image();
        image.onload = () => loaded = true;
        image.src = "./img/emblem.svg";

        Callbacks.addCallback(drawCallback);
    }

    let drawCallback = function(_, multiplier) {
        if (!Config.drawEmblem) {
            return;
        }

        if (!loaded) {
            return;
        }

        let minSize = Config.minEmblemSize;
        let maxSize = Config.maxEmblemSize;
        let scalar = multiplier * (maxSize - minSize) + minSize

        let dimension = Util.getResolutionMultiplier() * scalar;
        currentRadius = dimension / 2;
        let xOffset = $(window).width() / 2 - currentRadius;
        let yOffset = $(window).height() / 2 - currentRadius;
        Canvas.context.save();
        Canvas.context.fillStyle = "#000000";
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
        Canvas.context.restore();
    }

    this.getRadius = function() {
        return currentRadius;
    }

}
