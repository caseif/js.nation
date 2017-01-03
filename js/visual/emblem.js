var Emblem = new function() {

    this.drawEmblem = function() {
        var ctx = $("#canvas").get()[0].getContext("2d");
        var img = new Image();
        img.onload = () => {
            var windowDim = Math.min($(window).width(), $(window).height());
            var dimension = windowDim / Config.baseEmblemSizeRatio;
            var xOffset = $(window).width() / 2 - dimension / 2;
            var yOffset = $(window).height() / 2 - dimension / 2;
            ctx.drawImage(img, xOffset, yOffset, dimension, dimension);
        }
        img.src = "/img/emblem.png";
    };

}
