var Emblem = new function() {

    var image;
    var loaded = false;
    var currentRadius;

    this.setUp = function() {
        Nodes.addCallback(drawCallback);
        image = new Image();
        image.onload = () => loaded = true;
        image.src = "/img/emblem.png";
    }

    var drawCallback = function(_, multiplier) {
        if (!loaded) {
            return;
        }

        var minFrac = 1 / Config.minEmblemSizeRatio;
        var maxFrac = 1 / Config.maxEmblemSizeRatio;
        var scalar = multiplier * (minFrac - maxFrac) + maxFrac

        var windowDim = Math.min($(window).width(), $(window).height());
        var dimension = windowDim * scalar;
        currentRadius = dimension / 2;
        var xOffset = $(window).width() / 2 - currentRadius;
        var yOffset = $(window).height() / 2 - currentRadius;
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
        //TODO: make it bigger and shaky and stuff
    };

    this.getRadius = function() {
        return currentRadius;
    };

}
