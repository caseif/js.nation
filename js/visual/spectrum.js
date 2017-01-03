let Spectrum = new function() {

    this.setUp = function() {
        Nodes.addCallback(drawCallback, 2);
    }

    let drawCallback = function(spectrum) {
        let len = spectrum.length;
        let baseRad = Emblem.getRadius();

        let halfWidth = $(window).width() / 2;
        let halfHeight = $(window).height() / 2;

        let xArr = [];
        let yArr = [];

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
