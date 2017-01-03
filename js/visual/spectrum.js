var Spectrum = new function() {

    this.setUp = function() {
        Nodes.addCallback(drawCallback, 2);
    }

    var drawCallback = function(spectrum) {
        var len = spectrum.length;
        var baseRad = Emblem.getRadius();

        var halfWidth = $(window).width() / 2;
        var halfHeight = $(window).height() / 2;

        var xArr = [];
        var yArr = [];

        Canvas.context.beginPath();
        for (let i = 0; i < len; i++) {
            t = Math.PI * (1 - (i / len)) - (Math.PI / 2);
            r = baseRad + spectrum[i] / 4;
            x = r * Math.cos(t);
            xArr.push(x); // push it before we adjust it to the origin
            x += halfWidth;
            y = r * Math.sin(t) + halfHeight;
            yArr.push(y);
            Canvas.context.lineTo(x, y);
        }
        for (let i = len - 1; i >= 0; i--) {
            Canvas.context.lineTo(halfWidth - xArr[i], yArr[i]);
        }
        Canvas.context.fill();
        Canvas.context.closePath();
    }

}
