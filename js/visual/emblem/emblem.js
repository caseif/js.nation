let Emblem = new function() {

    let image;
    let loaded = false;
    let currentRadius;

    let jqWindow;

    this.setUp = function() {
        jqWindow = $(window);

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

        currentRadius = Emblem.calcRadius(multiplier);
        let xOffset = jqWindow.width() / 2 - currentRadius;
        let yOffset = jqWindow.height() / 2 - currentRadius;
        Canvas.context.save();
        Canvas.context.fillStyle = "#000000";
        let dimension = currentRadius * 2;
        Canvas.context.drawImage(image, xOffset, yOffset, dimension, dimension);
        Canvas.context.restore();
    }

    this.getRadius = function() {
        return currentRadius;
    }

    this.calcRadius = function(multiplier) {
        let minSize = Config.minEmblemSize;
        let maxSize = Config.maxEmblemSize;
        let scalar = multiplier * (maxSize - minSize) + minSize;
        return Util.getResolutionMultiplier() * scalar / 2;
    }

}
