let Emblem = new function() {

    let image;
    let loaded = false;
    let currentRadius;

    this.setUp = function() {
        image = new Image();
        image.onload = () => loaded = true;
        image.src = "./img/emblem.svg";

        Nodes.addCallback(drawCallback);
    }

    let drawCallback = function(_, multiplier) {
        if (!loaded) {
            return;
        }
		
        Canvas.context.shadowBlur = 50;
        Canvas.context.shadowColor = 'rgba(255, 255, 255, 0.25)';

        let minFrac = 1 / Config.minEmblemSizeRatio;
        let maxFrac = 1 / Config.maxEmblemSizeRatio;
        let scalar = multiplier * (minFrac - maxFrac) + maxFrac

        let windowDim = Math.min($(window).width(), $(window).height());
        let dimension = windowDim * scalar;
        currentRadius = dimension / 2;
        let xOffset = $(window).width() / 2 - currentRadius;
        let yOffset = $(window).height() / 2 - currentRadius;
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
    };

    this.getRadius = function() {
        return currentRadius;
    };

}
