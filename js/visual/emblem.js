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
        if (!loaded) {
            return;
        }

        let minFrac = 1 / Config.minEmblemSizeRatio;
        let maxFrac = 1 / Config.maxEmblemSizeRatio;
        let scalar = multiplier * (minFrac - maxFrac) + maxFrac

        let windowDim = Math.min($(window).width(), $(window).height());
        let dimension = windowDim * scalar;
        currentRadius = dimension / 2;
        let xOffset = $(window).width() / 2 - currentRadius;
        let yOffset = $(window).height() / 2 - currentRadius;
        Canvas.context.fillStyle = "#000000";
        Canvas.context.save();
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
        Canvas.context.restore();
    }

    this.getRadius = function() {
        return currentRadius;
    }

}
