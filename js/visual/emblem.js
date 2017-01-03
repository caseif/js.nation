var Emblem = new function() {

    var image;
    var loaded = false;

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

        var windowDim = Math.min($(window).width(), $(window).height());
        var dimension = windowDim / Config.baseEmblemSizeRatio;
        var xOffset = $(window).width() / 2 - dimension / 2;
        var yOffset = $(window).height() / 2 - dimension / 2;
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
        //TODO: make it bigger and shaky and stuff
        
    };

}
